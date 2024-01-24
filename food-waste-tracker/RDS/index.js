//AWS event handler - *CAN BE DELETED IN FUTURE IF NOT USING AWS*
let AWS = require('aws-sdk')
var mysql = require('mysql2/promise');
const s3 = new AWS.S3();

exports.handler = async (event, context) => {
    
    console.log(`event: ${JSON.stringify(event)}`);
    
    let response = {}; //initialize response object
    
    console.log("IAM Auth");

    /*
    Create signer object to generate an authentication token using the IAM credentials necessary for connecting to the RDS instance.
    Overall, the signer variable allows for an authenticated connection to the RDS instance using IAM creds. rather than storing the DB creds. in the code

    Note: process.env[] is a reference to environment variables attached to the lambda function, these can be found in the Lambda funcs. configuration
    */
    var signer = new AWS.RDS.Signer({
        region: process.env['region'],
        hostname: process.env['proxyendpoint'],
        port: parseInt(process.env['port'], 10),
        username: process.env['user']
    });

    //Get Auth Token for database proxy user
    let token = await signer.getAuthToken({
        username: process.env['user']
    });
    
    console.log("IAM Token Obtained");
    
    /*
    Initialize MySQL connection variables for database proxy connection. Uses the token created by the signed object above for password auth.
    This is similar to the credentials you would enter when connecting to a MySQL instance via MySQL workbench or the VSCode quivalent
    */ 
    const connectionConfig = {
        host: process.env["proxyendpoint"],
        user: process.env["user"],
        database: process.env["database"],
        ssl: {rejectUnauthorized: false},
        password: token,
        authPlugins: function({pluginName, pluginData}, callback){
            console.log("Setting new auth handler");
        }
    };
    
    /*
    Setup authentication handler for password authentication using the mysql_clear_password plugin.
    */
    connectionConfig.authPlugins = (data, callback) => {
        if (data.pluginName === 'mysql_clear_password') {
            console.log("pluginName: " + data.pluginName);
            let password = token + '\0';
            let buffer = Buffer.from(password);
            callback(null, password);
        }
    };
    

    let connection; //Declare connection variable
    
    try{//connect to DB using connectionConfig creds.
        connection = await mysql.createConnection(connectionConfig);
        console.log(`Successfully connected to the database as id ${connection.threadId}`);//log if user successfully connects - note if the ID returned is null then there was a problem authenticating the user when connecting
    }
    
    catch(err){
        console.error('error connecting to the database');
        console.error(err);
        response = {
            statusCode: 500,
            body: JSON.stringify({error: err.message})
        };
        return response;
    }
    
    let username;
    let passwordEvent;
    let emailEvent;
    let s3params;
    
    // Swtich statement for http events passed to the function
    switch (event.routeKey) {
        
        // Case where a user is logging in
        case 'GET /UserCredentials':
            
            username = event.queryStringParameters.username;
            passwordEvent = event.queryStringParameters.password;
            
            // param json object for s3 bucket and respective query
            s3params = {
                Bucket: 'wastewatchers3',
                Key: 'test.sql'
            }
            
            try{//get query data from S3 bucket, convert it to string, and query database
                
                const data = await s3.getObject(s3params).promise();//fetch text from s3 file and bucket
                const queryData = data.Body.toString('utf-8');//convert contents to string
                const queryReplace = queryData.replace('UserVar', username);//replace username in query with username passed in event (eventually)
            
                const query = await connection.query(queryReplace);//query using connection
                
                const queriedPwd = query[0][0].password// checks if password matches the associated user
                if (queriedPwd === passwordEvent){
                    return true;
                }
                else{
                    return false;
                }
                
            }
            
            catch(err){
                console.error('error querying the database');
                console.err(err)
                response = {
                    statusCode: 500,
                    body: JSON.stringify({error: err.message})
                };
                return response;
            }
        
        // Case where user is creating an account
        case 'POST /UserCredentials':
            username = event.queryStringParameters.username;
            passwordEvent = event.queryStringParameters.password;
            emailEvent = event.queryStringParameters.email;
            
            s3params = {
                Bucket: 'wastewatchers3',
                Key: 'New_User.sql'
            }
            
            try {
                
                const data = await s3.getObject(s3params).promise();//fetch text from s3 file and bucket
                let queryData = data.Body.toString('utf-8');//convert contents to string
                
                let replaceUsername = queryData.replace('UserVar', username);//replace username in query with username passed in event (eventually)
                let replacePassword = replaceUsername.replace('PassVar', passwordEvent)
                let replaceEmail = replacePassword.replace('EmailVar', emailEvent)
                const query = await connection.query(replaceEmail);
                
                return true;
                
            }
            
            catch(err) {
                console.error('error querying the database');
                console.err(err)
                response = {
                    statusCode: 500,
                    body: JSON.stringify({error: err.message})
                };
                return response;
            }
    
    connection.end();
  }
};

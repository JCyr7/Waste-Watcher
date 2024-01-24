/*Query that changes user password*/
UPDATE UserCredentials 
SET password = new_password
WHERE password = old_password;

--@block
/*Variant Query of the above based on username*/
UPDATE UserCredentials
SET password = new_password
WHERE username = specified_username

--@block
/*Variant Query of the above based on userid*/
UPDATE UserCredentials
SET password = new_password
WHERE userid = unique_userid
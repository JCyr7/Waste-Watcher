--@block
ALTER TABLE WasteInput MODIFY COLUMN waste_category ENUM('Dairy', 'Eggs', 'Produce', 'Meats')

--@block
DESC HouseholdInfo


--@block
DESC WeekFoodWaste
--@block
DESC WasteInput
--@block
DESC UserCredentials


--@block
SELECT * FROM WasteInput;

--@block
INSERT INTO HouseholdInfo(household_name, zipcode, household_size, collect_opt, userid) 
VALUES ('Grant','04469','2',1, '3'),
       ('Poplar','85224','2',1,'4'),
       ('Jefferson','90210','4',1,'1');



--@block
INSERT INTO UserCredentials 
VALUES('','','') 

--@block
INSERT INTO WeekFoodWaste 
VALUES('','','') 

--@block
INSERT INTO MonthFoodWaste 
VALUES(29, ) 


--@block
ALTER TABLE WasteInput 
ADD FOREIGN KEY(userid) 
REFERENCES UserCredentials(userid)


--@block
SELECT zipcode, HouseholdInfo.userid FROM HouseholdInfo
INNER JOIN UserCredentials
ON UserCredentials.userid = HouseholdInfo.userid;

--@block
UPDATE WasteInput SET userid = 1
WHERE waste_id = 5;

--@block
DELETE FROM WasteInput 
WHERE waste_id = 6;

--@block
ALTER TABLE HouseholdInfo 
ADD FOREIGN KEY(userid) 
REFERENCES UserCredentials(userid)

--@block
ALTER TABLE HouseholdInfo MODIFY COLUMN zipcode varchar(255) NULL



--@block
ALTER TABLE WeekFoodWaste
ADD FOREIGN KEY(userid) 
REFERENCES WasteInput(userid)

--@block
ALTER TABLE MonthFoodWaste
ADD FOREIGN KEY(userid) 
REFERENCES WeekFoodWaste(userid)


--@block
SELECT zipcode FROM HouseholdInfo

--@block
SELECT zipcode FROM HouseholdInfo
WHERE HouseholdInfo.userid = 3

--@block
SELECT userid FROM UserCredentials
WHERE email = 'diam.vel.arcu@hotmail.edu'

--@block
SELECT CURRENT_DATE-7;
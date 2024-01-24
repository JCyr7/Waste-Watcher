/*Query structure to enter in Household Info*/
/*If user declines data collection*/
INSERT INTO HouseholdInfo(household_name,zipcode,household_size,collect_opt,userid)
VALUES(NULL,NULL,NULL,NULL,collect_opt,INT userid); 

--@block
/*If user accepts data collection*/
INSERT INTO HouseholdInfo(household_name,zipcode,household_size,collect_opt,userid)
VALUES(varchar(255),varchar(255),int household_size,collect_opt,INT userid); 
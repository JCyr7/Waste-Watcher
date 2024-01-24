--@block
/*Display user zipcode*/
SELECT zipcode FROM HouseholdInfo
WHERE userid = unique_userid;

--@block
/*Can we store this users data?*/
SELECT collect_opt FROM HouseholdInfo
WHERE userid = unique_userid
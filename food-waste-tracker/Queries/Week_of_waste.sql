/*Query structure to enter weeks worth of food waste*/
--@block
SELECT daily_waste,userid FROM WasteInput
WHERE date_of <= CURRENT_DATE AND date_of >= CURRENT_DATE-7 

--@block
INSERT INTO WasteInput()
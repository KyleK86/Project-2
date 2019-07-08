/* useful schema for looking at timers and such
* just substitute the procedure or event as needed.
* 
*/

SHOW EVENTS FROM t2yeq1ofmhxk7eqh;

SHOW PROCEDURE status LIKE 'incrementHungry';
SHOW CREATE PROCEDURE incrementHungry;

SELECT * FROM INFORMATION_SCHEMA.PROCEDURES
WHERE PROCEDURE_NAME = 'incrementHungry';

/* This is the setup for our timed decrementers
* cut and paste everything below into mysql workbench in the jawsDB instance and this will 
* do some timed increments of things resulting in loss of health
*/

USE t2yeq1ofmhxk7eqh;

-- code to kill these procedures / timers before modifying 

DROP PROCEDURE IF EXISTS incrementBored;
DROP PROCEDURE IF EXISTS incrementLazy;
DROP PROCEDURE IF EXISTS incrementHungry;
DROP EVENT IF EXISTS boredTimer;
DROP EVENT IF EXISTS lazyTimer;
DROP EVENT IF EXISTS hungryTimer;

/* procedure setup. 
* the delimiter keyword allows you to use multiple semi-colon ending lines in a procedure
* make sure that the type is a string, otherwise you won't get an error, but it won't work.
*/ 

delimiter //
CREATE PROCEDURE incrementBored()
BEGIN
	UPDATE t2yeq1ofmhxk7eqh.Gotchis SET bored = bored + 3
	WHERE isAlive=1 AND gotchiType='human';
	UPDATE t2yeq1ofmhxk7eqh.Gotchis SET bored = bored + 2
	WHERE isAlive=1 AND gotchiType='alien';
	UPDATE t2yeq1ofmhxk7eqh.Gotchis SET bored = bored + 1
	WHERE isAlive=1 AND gotchiType='robot';
	UPDATE t2yeq1ofmhxk7eqh.Gotchis SET health = health - (bored + lazy + hungry)
	WHERE isAlive=1;
	UPDATE t2yeq1ofmhxk7eqh.Gotchis SET health = 0
	WHERE health < 0;
	UPDATE t2yeq1ofmhxk7eqh.Gotchis SET isAlive = 0
	WHERE health=0;
END
//

delimiter //
CREATE PROCEDURE incrementLazy()
BEGIN
	UPDATE t2yeq1ofmhxk7eqh.Gotchis SET lazy = lazy + 3
	WHERE isAlive=1 AND gotchiType='human';
	UPDATE t2yeq1ofmhxk7eqh.Gotchis SET lazy = lazy + 2
	WHERE isAlive=1 AND gotchiType='alien';
	UPDATE t2yeq1ofmhxk7eqh.Gotchis SET lazy = lazy + 1
	WHERE isAlive=1 AND gotchiType='robot';
	UPDATE t2yeq1ofmhxk7eqh.Gotchis SET health = health - (bored + lazy + hungry)
	WHERE isAlive=1;
	UPDATE t2yeq1ofmhxk7eqh.Gotchis SET health = 0
	WHERE health < 0;
	UPDATE t2yeq1ofmhxk7eqh.Gotchis SET isAlive = 0
	WHERE health=0;
END
//

delimiter //
CREATE PROCEDURE incrementHungry()
BEGIN
	UPDATE t2yeq1ofmhxk7eqh.Gotchis SET hungry = hungry + 3
	WHERE isAlive=1 AND gotchiType='human';
	UPDATE t2yeq1ofmhxk7eqh.Gotchis SET hungry = hungry + 2
	WHERE isAlive=1 AND gotchiType='alien';
	UPDATE t2yeq1ofmhxk7eqh.Gotchis SET hungry = hungry + 1
	WHERE isAlive=1 AND gotchiType='robot';
	UPDATE t2yeq1ofmhxk7eqh.Gotchis SET health = health - (bored + lazy + hungry)
	WHERE isAlive=1;
	UPDATE t2yeq1ofmhxk7eqh.Gotchis SET health = 0
	WHERE health < 0;
	UPDATE t2yeq1ofmhxk7eqh.Gotchis SET isAlive = 0
	WHERE health=0;
END
//

/* setting up timers, or "events" in mysql. each event happens with a particular frequency
* each event calls a saved procedure that is created above!
* it doesn't matter that start time is in the past. really just setting up the hourly start at 
* midnight
*/ 

CREATE
EVENT boredTimer
ON SCHEDULE EVERY 6 HOUR STARTS '2019-07-03 00:00:00'
ON COMPLETION PRESERVE
ENABLE
DO
CALL incrementBored();

CREATE
EVENT lazyTimer
ON SCHEDULE EVERY 12 HOUR STARTS '2019-07-03 00:00:00'
ON COMPLETION PRESERVE
ENABLE
DO
CALL incrementLazy();

CREATE
EVENT hungryTimer
ON SCHEDULE EVERY 8 HOUR STARTS '2019-07-03 00:00:00'
ON COMPLETION PRESERVE
ENABLE
DO
CALL incrementHungry();


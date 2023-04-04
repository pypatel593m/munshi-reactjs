CREATE TABLE user_types
(
    user_type_id SERIAL PRIMARY KEY,
    user_type VARCHAR(20) NOT NULL
);

CREATE TABLE users
(
    user_id SERIAL PRIMARY KEY,
    user_email_address varchar(250) UNIQUE NOT NULL,
    user_password varchar(120) NOT NULL,
    user_fname varchar(255) NOT NULL,
    user_lname varchar(255) NOT NULL,
    user_phone character(12),
    user_address varchar(255),
    user_type_id INTEGER REFERENCES user_types(user_type_id)
);

CREATE TABLE businesses (
   business_id integer UNIQUE,
   business_name VARCHAR(250),
   business_address VARCHAR(500),
   business_phone CHAR(12)
);

CREATE TABLE positions (
  position_id SERIAL PRIMARY KEY,
  user_position VARCHAR(20),
  business_id INTEGER REFERENCES businesses(business_id)
);

CREATE TABLE schedules
(
    schedule_id SERIAL PRIMARY KEY,
    schedule_date date NOT NULL,
    shift_start_time time without time zone NOT NULL,
    shift_end_time time without time zone NOT NULL,
    notes varchar(2000),
    user_id INTEGER REFERENCES users(user_id) NOT NULL,
    position_id INTEGER REFERENCES positions(position_id) NOT NULL,
    business_id INTEGER REFERENCES businesses(business_id) NOT NULL
);

CREATE TABLE shifts
(
    shift_id SERIAL PRIMARY KEY,
    clock_in timestamp without time zone,
    clock_out timestamp without time zone,
    notes VARCHAR(2000),
    schedule_id INTEGER REFERENCES schedules(schedule_id) NOT NULL,
    user_id INTEGER REFERENCES users(user_id) NOT NULL,
    business_id INTEGER REFERENCES businesses(business_id) NOT NULL
);

CREATE TABLE availabilities
(
    availability_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) NOT NULL,
    available_date date NOT NULL,
    available_time_from time without time zone NOT NULL,
    available_time_till time without time zone NOT NULL,
    notes VARCHAR(2000),
    business_id INTEGER REFERENCES businesses(business_id) NOT NULL
);

CREATE TABLE teams (
  team_id SERIAL PRIMARY KEY,
  business_id INTEGER REFERENCES businesses(business_id)
);

CREATE TABLE team_members (
    user_id INTEGER PRIMARY KEY REFERENCES users(user_id),
    team_id INTEGER REFERENCES teams(team_id),
    position_id INTEGER REFERENCES positions(position_id),
    wage DECIMAL(19,4)
);

CREATE TABLE breaks
(
    break_id SERIAL PRIMARY KEY,
    break_length time without time zone NOT NULL,
    is_paid boolean,
    business_id INTEGER REFERENCES businesses(business_id) NOT NULL
);

CREATE TABLE breaks_list
(
    break_list_id SERIAL PRIMARY KEY,
    break_start_time varchar(250),
    break_end_time varchar(120),
    shift_id INTEGER REFERENCES shifts(shift_id),
    break_id INTEGER REFERENCES breaks(break_id)
);

CREATE TABLE chats
(
    chat_id SERIAL PRIMARY KEY,
    senders_id INTEGER REFERENCES users(user_id) NOT NULL,
    receivers_id INTEGER REFERENCES users(user_id) NOT NULL,
    message_body varchar(2000)
);


CREATE OR REPLACE FUNCTION get_team_data(businessid integer)
RETURNS TABLE (user_id integer, team_id integer, user_fname varchar, user_lname varchar, user_position varchar, wage decimal) 
AS $$
BEGIN
	RETURN QUERY
    SELECT
	users.user_id,
	team_members.team_id, 
	users.user_fname, 
	users.user_lname,
	positions.user_position,
	team_members.wage
FROM users
INNER JOIN team_members ON team_members.user_id = users.user_id
INNER JOIN teams ON teams.team_id = team_members.team_id
INNER JOIN positions ON positions.position_id = team_members.position_id
INNER JOIN businesses ON businesses.business_id = teams.business_id
WHERE businesses.business_id = businessid AND teams.business_id = businessid AND positions.business_id = businessid;
END;
$$  LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_team_members(teamid integer,businessid integer)
RETURNS TABLE (user_id integer, user_fname varchar, user_lname varchar, user_position varchar, wage decimal) 
AS $$
BEGIN
	RETURN QUERY
    SELECT
	users.user_id,
	users.user_fname, 
	users.user_lname,
	positions.user_position,
	team_members.wage
FROM users
INNER JOIN team_members ON team_members.user_id = users.user_id
INNER JOIN teams ON teams.team_id = team_members.team_id
INNER JOIN positions ON positions.position_id = team_members.position_id
INNER JOIN businesses ON businesses.business_id = teams.business_id
WHERE businesses.business_id = businessid AND teams.business_id = businessid AND team_members.team_id = teamid;
END;
$$  LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION add_user_to_team(useremail varchar, teamid integer, positionid integer, wage decimal)
RETURNS void AS
$$
DECLARE
    userid INTEGER;
BEGIN
    SELECT user_id INTO userid FROM users WHERE user_email_address = useremail;
    INSERT INTO team_members (user_id, team_id, position_id, wage) VALUES (userid, teamid, positionid, wage);
END;
$$
LANGUAGE plpgsql;




CREATE OR REPLACE FUNCTION get_employer_availabilities(businessid integer)
RETURNS TABLE (availability_id integer, user_id integer, user_fname varchar, user_lname varchar) 
AS $$
BEGIN
	RETURN QUERY
    SELECT
	availabilities.availability_id,
	users.user_id,
	users.user_fname, 
	users.user_lname
FROM availabilities
INNER JOIN users ON users.user_id = availabilities.user_id
INNER JOIN businesses ON businesses.business_id = availabilities.business_id
WHERE businesses.business_id = businessid;
END;
$$  LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION get_employee_availabilities(userid integer, businessid integer)
RETURNS TABLE (availability_id integer, user_id integer, user_fname varchar, user_lname varchar) 
AS $$
BEGIN
	RETURN QUERY
    SELECT
	availabilities.availability_id,
	users.user_id,
	users.user_fname, 
	users.user_lname
FROM availabilities
INNER JOIN users ON users.user_id = availabilities.user_id
INNER JOIN businesses ON businesses.business_id = availabilities.business_id
WHERE businesses.business_id = businessid AND availabilities.user_id = userid;
END;
$$  LANGUAGE plpgsql;




CREATE OR REPLACE FUNCTION get_available_time(userid integer, availabledate date, businessid integer)
RETURNS TABLE (availability_id integer, available_time_from time without time zone, available_time_till time without time zone, user_position varchar) 
AS $$
BEGIN
	RETURN QUERY
    SELECT
	availabilities.availability_id,
	availabilities.available_time_from,
	availabilities.available_time_till, 
	positions.user_position
FROM availabilities
INNER JOIN users ON users.user_id = availabilities.user_id
INNER JOIN businesses ON businesses.business_id = availabilities.business_id
INNER JOIN team_members ON team_members.user_id = availabilities.user_id
INNER JOIN positions ON positions.position_id = team_members.position_id
WHERE businesses.business_id = businessid AND availabilities.user_id = userid AND availabilities.available_date = availabledate;
END;
$$  LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_user_business(businessid integer)
RETURNS TABLE (user_id integer, user_fname varchar, user_lname varchar) 
AS $$
BEGIN
	RETURN QUERY
    SELECT
	users.user_id,
	users.user_fname, 
	users.user_lname
FROM users
INNER JOIN team_members ON team_members.user_id = users.user_id
INNER JOIN teams ON teams.team_id = team_members.team_id
INNER JOIN businesses ON businesses.business_id = teams.business_id
WHERE businesses.business_id = businessid;
END;
$$  LANGUAGE plpgsql;
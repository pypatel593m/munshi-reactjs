CREATE TABLE team_members (
    user_id INTEGER PRIMARY KEY REFERENCES users(user_id),
    team_id INTEGER REFERENCES teams(team_id),
    position_id INTEGER REFERENCES positions(position_id),
    wage DECIMAL(19,4)
);

CREATE TABLE businesses (
   business_id integer UNIQUE,
   business_name VARCHAR(250),
   business_address VARCHAR(500),
   business_phone CHAR(12)
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
WHERE businesses.business_id = businessid AND teams.business_id = businessid;
END;
$$  LANGUAGE plpgsql
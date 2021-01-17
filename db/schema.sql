DROP TABLE IF EXISTS parties;
DROP TABLE IF EXISTS candidates;

CREATE TABLE parties (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT
);

CREATE TABLE candidates (
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL, 
    industry_connected BOOLEAN NOT NULL,
    party_id INTEGER UNSIGNED,
    -- sets the foreign key to the party id, referencing the id of the parties table, and if a party is deleted its value is set to null 
    CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL
);

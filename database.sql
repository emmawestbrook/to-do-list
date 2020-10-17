--copy and paste this dummy code into your program to create the database named "weekend-to-do-app"

CREATE TABLE tasks(
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
    "is_complete" BOOLEAN DEFAULT 'FALSE'
);
INSERT INTO "tasks" ("task", "is_complete") VALUES ('make dinner', 'FALSE');
INSERT INTO "tasks" ("task", "is_complete") VALUES ('walk dog', 'FALSE');
INSERT INTO "tasks" ("task", "is_complete") VALUES ('water plants', 'FALSE');
INSERT INTO "tasks" ("task", "is_complete") VALUES ('take over world', 'FALSE');

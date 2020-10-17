const pg = require('pg');

console.log("whats my db url?", process.env.DATABASE_URL);

let pool;
if (process.env.DATABASE_URL) {
    pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL
    });
}
else {
    const config = {
        database: 'weekend-to-do-app',
        host: 'localhost',
        port: 5432,
        max: 10,
        idleTimeoutMillis: 30000
    };
    pool = new pg.Pool(config);
}

pool.on("connect", () => {
    console.log("connected to postgres");
});

pool.on("error", (err) => {
    console.log("error connecting to postgres", err);
});

module.exports = pool;
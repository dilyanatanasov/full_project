const mysql = require("mysql2");
export class DB {
    conn;

    constructor() {
        this.conn = mysql.createPool({
            host: "localhost",
            database: "example",
            user: "root"
        }).promise();
    }
}
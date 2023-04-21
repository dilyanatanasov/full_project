export class UserModel {
    conn;
    constructor(db: any) {
        this.conn = db.conn;
    }

    async getAllUsers() {
        const [rows] = await this.conn.query("SELECT * FROM users");
        return rows;
    }

    async getSingleUser(id: number) {
        const [rows] = await this.conn.query("SELECT * FROM users WHERE id = ?", [id]);
        return rows[0];
    }

    async createUser(userData: any) {
        await this.conn.query("INSERT INTO users VALUES(NULL, ?, ?, ?)",
            [userData.username, userData.password, userData.date_of_birth])
    }

    async updateUser(id: number, userData: any): Promise<boolean> {
        const updateUserDataArray = Object.entries(userData);
        let setStatement = "";
        let preparedStatementData = [];
        for (let i = 0; i < updateUserDataArray.length; i++) {
            setStatement += `${updateUserDataArray[i][0]} = ?`;
            setStatement += (i + 1 !== updateUserDataArray.length) ? ", " : " ";
            preparedStatementData.push(updateUserDataArray[i][1]);
        }
        preparedStatementData.push(id);
        await this.conn.execute(`UPDATE users SET ${setStatement} WHERE id = ?`, preparedStatementData);
        return true;
    }

    async deleteUser(id: number) {
        await this.conn.query("DELETE FROM users WHERE id = ?",
            [id])
    }
}
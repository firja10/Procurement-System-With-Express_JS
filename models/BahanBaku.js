module.exports = {
    fetchData: (conn, callback) => {
        conn.query("SELECT * FROM bahan_baku", callback);
    },

    getById: (conn, id, callback) => {

        conn.query("SELECT * FROM bahan_baku WHERE id = " + id, callback);

    },

    insertData: (conn, data, callback) => {
        conn.query("INSERT INTO bahan_baku SET ?", data, callback);
    },

    updateData: (conn, data, id, callback) => {

        conn.query("UPDATE bahan_baku SET ? WHERE id = " + id, data, callback);

    },


    deleteData: (conn, id, callback) => {

        conn.query("DELETE FROM bahan_baku WHERE id = " + id, callback);

    }

}
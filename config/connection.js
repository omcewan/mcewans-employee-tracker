const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mountain_DECANT2whitish',
  database: 'my_company',
});

module.exports = connection;
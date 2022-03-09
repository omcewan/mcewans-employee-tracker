const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
  // If connection error occurs change host from 'localhost' to your IP address
  host: 'localhost',
  user: 'root',
  password: 'mountain_DECANT2whitish',
  database: 'my_company',
});

module.exports = connection;

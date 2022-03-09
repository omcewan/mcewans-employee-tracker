const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
  // If connection error occurs change host to your local IP address 
  host: '127.0.0.1',
  user: 'msu',
  password: 'CERVIX2nurse-leal',
  database: 'my_company',
});

module.exports = connection;

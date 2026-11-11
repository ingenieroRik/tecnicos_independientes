module.exports = {
  "development": {
    "username": process.env.USER_BD ,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "port": process.env.PORT,
    "dialect": "mysql",
    "dialectOptions": {
      "ssl": {
        "minVersion": "TLSv1.2",
        "rejectUnauthorized": true
      }
    }
  },
  "test": {
    "username": process.env.USER_BD,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "port": process.env.PORT,
    "dialect": "mysql",
    "dialectOptions": {
      "ssl": {
        "minVersion": "TLSv1.2",
        "rejectUnauthorized": true
      }
    }
  },
  "production": {
    "username": process.env.USER_BD,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "port": process.env.PORT,
    "dialect": "mysql",
    "dialectOptions": {
      "ssl": {
        "minVersion": "TLSv1.2",
        "rejectUnauthorized": true
      }
    }
  }
}
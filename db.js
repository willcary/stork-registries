const Pool = require('pg').Pool
require('dotenv').config()

const devConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
}

const proConfig = {
  connectionString: process.env.DATABASE_URL, //heroku addons
  ssl: {
    rejectUnauthorized: false,
  },
}

const pool = new Pool(
  process.env.NODE_ENV === 'production' ? proConfig : devConfig
)

// const pool =
//   process.env.NODE_ENV === 'production'
//     ? new Pool({
//         connectionString: proConfig,
//         ssl: {
//           rejectUnauthorized: false,
//         },
//       })
//     : new Pool({
//         connectionString: devConfig,
//       })

module.exports = pool

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace('<password>', process.env.DB_PASSWORD);

mongoose.connect(DB, {
}).then(con => {
  console.log('DB connection successful!');
}).catch(err => {
  console.log(err);
})

const port =process.env.PORT;
app.listen(port, () => {
  console.log(`Server runing on port ${port}`);
});
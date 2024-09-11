const mongoose = require("mongoose");
mongoose.set('strictQuery', true)
const DB = process.env.DATABASE;
mongoose.set("strictQuery", true);

// Mongo conn
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`connnection successful`);
  })
  .catch((err) => console.log(`no connection ${err}`));
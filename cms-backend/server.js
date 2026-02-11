const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = require("./src/app");
const connectDB = require("./src/config/db");

connectDB();

const port = Number(process.env.PORT) || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

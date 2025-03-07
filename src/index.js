import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/connect.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8000;

connectDB(process.env.MONGODB_URI, process.env.MONGODB)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

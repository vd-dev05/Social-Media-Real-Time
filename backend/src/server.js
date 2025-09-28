import app from "@/app.js";
import { connectMongo } from "@/config/mongo.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  // Connect to databases
  connectMongo();
 
  
  console.log(`Server is running on port ${PORT}`);
});
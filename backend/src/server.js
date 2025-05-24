import express from "express";
import dotnev from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import router from "./routes/transactionsRoute.js";

dotnev.config();
const app = express();
//middlewate
app.use(rateLimiter);
app.use(express.json());
//our custom simple middleware
// app.use((req, res, next) => {
//   console.log("Hey we hit a req, the method is", req.method);
//   next();
// });
const PORT = process.env.PORT || 5001;

app.use("/api/transactions", router);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is up and running on PORT:", PORT);
  });
});

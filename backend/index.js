const express = require("express");
require("dotenv").config();  
const errorHandler = require("./middleware/errorHandler");
const pool = require("./config/dbConnection");
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5001;
app.use(express.json());
app.use("/",require("./routes/userRoutes"));
app.use("/payment/",require("./routes/paymentRoutes"));
app.use("/dashboard/",require("./routes/dashboardRoutes"));
app.use("/batch",require("./routes/batchRoutes"));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/`);
});

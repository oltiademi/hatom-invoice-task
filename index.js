require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const invoiceRouter = require("./routes/invoiceRoutes");
const clientRouter = require("./routes/clientRoutes");
const serviceRouter = require("./routes/serviceRoutes");
const errorHandler = require("./middleware/errorHandler");
const setupSwagger = require("./config/swagger");
app.use(express.json());

connectDB();

app.use("/api/v1/users", userRouter);
app.use("/api/v1/invoices", invoiceRouter);
app.use("/api/v1/clients", clientRouter);
app.use("/api/v1/services", serviceRouter);

setupSwagger(app);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App is listening in port ${PORT}`);
});

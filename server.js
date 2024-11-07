const express = require("express");
const app = express();
const chalk = require("chalk");
require("dotenv").config();
const bodyparser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(chalk.green("Connected to MongoDB")))
    .catch(err => console.log(chalk.red("Could not connect to MongoDB", err)));

// Import admin-related routes
const ADdoctor = require("./router/ADdoctor.route");
const ADpatient = require("./router/ADpatient.route");
const ADappointment = require("./router/ADappointment.route");
const staff = require("./router/staff.route");
const report = require("./router/report.route");
const userAdmin = require("./router/user.route");
const invoice = require("./router/invoice.route");
const medicine = require("./router/medicine.route");

// Import user-related routes
const appointment = require("./router/appointment.route");
const USpatient = require("./router/USpatient.route");
const user = require("./router/user.route");
const notification = require("./router/notification.route");

app.use("/admin/doctors", ADdoctor);
app.use("/admin/patients", ADpatient);
app.use("/admin/appointments", ADappointment);
app.use("/admin/staff", staff);
app.use("/admin/reports", report);
app.use("/admin/users", userAdmin);
app.use("/admin/invoice", invoice);
app.use("/admin/medicine", medicine);

app.use("/user/appointments", appointment);
app.use("/user/patients", USpatient);
app.use("/user/profile", user);
app.use("/user/notification", notification);

app.listen(port, (err) => {
    if (err) {
        console.log(chalk.red("Error starting server", err));
    } else {
        console.log(chalk.green("Server started on port 8080"));
    }
});
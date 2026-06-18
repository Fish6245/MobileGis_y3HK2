const express = require("express");
const cors = require("cors");

const incidentRoutes = require("./routes/incident.routes");
const reportRoutes = require("./routes/report.routes");
const trafficRoutes = require("./routes/traffic.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/incidents", incidentRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/traffic", trafficRoutes);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

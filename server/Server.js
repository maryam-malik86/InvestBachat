const express = require("express");
const dbconnection = require("./config/database");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const fs = require("fs");
const { MongoClient } = require("mongodb");
const { Readable } = require("stream");
const { promisify } = require('util');
const pdf = require('pdfkit');
app.use(express.json({ limit: "10mb" })); // JSON payload limit
app.use(express.urlencoded({ limit: "10mb", extended: true })); // URL-encoded payload limit
const fileUpload = require("express-fileupload");
// origin: "http://localhost:3000", // replace with your client's origin

app.use(
  fileUpload({
    useTempFiles: true,
    // tempFileDir: '/tmp/'
  })
);
const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000", "http://localhost:80","https://investbachat.com","https://www.investbachat.com"], // Whitelist the domains you want to allow
};

app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(morgan("dev"));

app.use(cookieParser());
require("dotenv").config();
const PORT = process.env.PORT;

const route = require("./routes/route");
app.use("/api", route);



app.listen(PORT, () => {
  console.log(`Server is running successfully on port ${PORT}`);
});

dbconnection();

app.get("/", (req, res) => {
  res.send("<h1>Running</h1>");
});

app.get("/api/admin/download-database-pdf", async (req, res) => {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect("mongodb://localhost:27017/");
    const db = client.db("INVESTBACHAT_LIVE_DB"); // Replace "InvestBachatDB" with your actual database name

    // Fetch a list of all collection names in the database
    const collectionNames = await db.listCollections().toArray();

    // Create a new PDF document
    const doc = new pdf();

    // Set response headers for PDF download
    res.setHeader('Content-disposition', 'attachment; filename=database.pdf');
    res.setHeader('Content-type', 'application/pdf');

    // Stream PDF directly to response
    doc.pipe(res);

    // Fetch data from each collection and write it to the PDF
    for (const { name } of collectionNames) {
      const collectionData = await db.collection(name).find().toArray();
      doc.text(`Collection: ${name}\n`);
      doc.text(JSON.stringify(collectionData, null, 2));
      doc.moveDown();
    }

    // End PDF document
    doc.end();

    console.log("Database download completed successfully");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});
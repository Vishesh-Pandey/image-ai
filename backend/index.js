const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();

require("dotenv").config();

app.use(cors());

const { GoogleAIFileManager } = require("@google/generative-ai/server");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("Hello World! from image-ai");
});

app.post("/upload", upload.single("file"), async (req, res) => {
  // Make sure to include these imports:

  console.log(req.file);

  const fileManager = new GoogleAIFileManager(process.env.GEMINI_API);

  const uploadResult = await fileManager.uploadFile(
    `/tmp/` + req.file.filename,
    {
      mimeType: req.file.mimetype,
      displayName: req.file.originalname,
    }
  );
  // View the response.
  console.log(
    `Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`
  );

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  const result = await model.generateContent([
    "Tell me about this image.",
    {
      fileData: {
        fileUri: uploadResult.file.uri,
        mimeType: uploadResult.file.mimeType,
      },
    },
  ]);
  console.log(result.response.text());
  res.send(result.response.text());
});

module.exports = app;

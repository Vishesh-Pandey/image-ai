const express = require("express");
const app = express();
const port = 3000;

const { GoogleAIFileManager } = require("@google/generative-ai/server");
const { GoogleGenerativeAI } = require("@google/generative-ai");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/upload", async (req, res) => {
  // Make sure to include these imports:

  const fileManager = new GoogleAIFileManager(
    "AIzaSyDCHHKl05lTJWATcDfdaCO0Kfc0IIkTbRs"
  );

  const uploadResult = await fileManager.uploadFile(`./uploads/sample.png`, {
    mimeType: "image/png",
    displayName: "Jetpack drawing",
  });
  // View the response.
  console.log(
    `Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`
  );

  const genAI = new GoogleGenerativeAI(
    "AIzaSyDCHHKl05lTJWATcDfdaCO0Kfc0IIkTbRs"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
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
  res.json({
    msg: result.response.text(),
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

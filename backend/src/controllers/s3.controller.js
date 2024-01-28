import express from "express";
import createPresignedPost from "../utils/s3.js";

const s3Router = express.Router();

s3Router.post("/sign", async (req, res) => {
  try {
    const { key, content_type } = req.body;
    const { signedUrl, fileLink } = await createPresignedPost({
      key: "public/" + key,
      contentType: content_type,
    });
    return res.send({
      data: {
        signedUrl,
        fileLink,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      error: error.message,
    });
  }
});

export default s3Router;

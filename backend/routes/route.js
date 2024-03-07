import express from "express"
import { uploadFile, downloadImage } from "../controller/image-uploader.js";
import upload from "../utils/upload.js";

const Router = express.Router();

Router.post("/upload",upload.single('file'), uploadFile);

Router.get('/file/:fileId', downloadImage);

export default Router;
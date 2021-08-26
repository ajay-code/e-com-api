import express from "express";
let router;
const apiRouter = (router = express.Router());

router.get("/", (req, res) => {
  res.json({ msg: "json api v1" });
});

export default apiRouter;

import express from "express";

const app = express();

app.get("/api/v1/hello", (req, res) => {
  res.status(200).json({
    message: "Hello from pomotrack.io api",
    success: true,
  });
});

export default app;

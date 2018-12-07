import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", routes);
app.all("*", (req, res) =>
  res.status(404).json({ status: 404, error: "Not Found!" })
);
app.use((err, req, res, next) => res.status(err.status).json(err.message));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT || 3000}...`);
});

export default app;

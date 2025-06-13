import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { processNetworkExcel } from "./lib/index.js";
import { fileURLToPath } from "url";
import { Cabinet } from "./interfaces/interfaces.js";
import expressLayouts from "express-ejs-layouts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static(path.join(__dirname, "./public")));

const excelFilePath = path.join(__dirname, "../sheets/network.xlsx");
const jsonFilePath = path.join(__dirname, "../sheets/network.json");
let cabinets: Cabinet[] = [];
let modifiedTime: string | null = null;

try {
  const { mtime } = fs.statSync(excelFilePath);
  let jsonData: { mtime: string; cabinets: Cabinet[] } | null = null;
  modifiedTime = mtime.toISOString();

  if (fs.existsSync(jsonFilePath)) {
    const jsonContent = fs.readFileSync(jsonFilePath, "utf-8");
    jsonData = JSON.parse(jsonContent);

    if (jsonData?.mtime === modifiedTime) {
      cabinets = jsonData.cabinets;
      console.log("Loaded cabinets from JSON file:", cabinets.length);
    } else {
      cabinets = processNetworkExcel(excelFilePath);
      fs.writeFileSync(
        jsonFilePath,
        JSON.stringify({ mtime: modifiedTime, cabinets }, null, 2)
      );
      console.log("Excel file changed. Processed and updated JSON file.");
    }
  } else {
    cabinets = processNetworkExcel(excelFilePath);
    fs.writeFileSync(
      jsonFilePath,
      JSON.stringify({ mtime: modifiedTime, cabinets }, null, 2)
    );
    console.log("JSON file not found. Processed Excel file and created JSON.");
  }
} catch (error) {
  console.error("Error processing Excel file:", error);
  process.exit(1);
}

app.get("/api/cabinets/modified", (req: Request, res: Response) => {
  try {
    res.json({ modifiedTime });
  } catch (error) {
    console.error("Error sharing modified time:", error);
    res.status(500).json({ error: "Failed to share modified timestamp" });
  }
});

app.get("/api/cabinets", (req: Request, res: Response) => {
  try {
    const id = req.query.id;
    if (id) {
      const cabinet = cabinets.find((cab) => cab.cabinetId === id);
      res.json(cabinet);
    } else {
      res.json({ version: modifiedTime, cabinets });
    }
  } catch (error) {
    console.error("Error transforming cabinet data:", error);
    res.status(500).json({ error: "Failed to transform cabinet data" });
  }
});

app.get("/cabinets", (req, res) => {
  if (!cabinets) {
    res
      .status(500)
      .send({ message: "Content is not ready Yet. Please reload the page." });
  } else {
    const id = req.query.id;
    if (id) {
      const cab = cabinets.find((cab) => cab.cabinetId === id);
      const existing = !!cab;
      res.render("connections", {
        title: `Połączenia: ${cab?.name}`,
        existing,
      });
    } else {
      res.render("cabinets");
    }
  }
});

app.get("/loading", (req, res) => {
  res.render("loading-test");
});

app.use((_, res) => res.redirect("/cabinets"));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

import axios from "axios";
import express, { Request, Response } from "express";
import { groupDataByDepartment } from "./utils/helper";

const app = express();
const PORT = process.env.PORT || 3000;

// Routes
app.get("/", async (req: Request, res: Response) => {
    try {
        const { data } = await axios.get("https://dummyjson.com/users");
        const result = groupDataByDepartment(data.users);
        res.setHeader("Content-Type", "application/json");
        res.json(result);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Something went wrong!" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

import express from 'express';
import {publicRouter} from "./router/publicApi.js";
import {api} from "./router/privateApi.js";
import {errorMiddleware} from "./middleware/errorMiddleware.js";
import 'dotenv/config'
import cors from "cors";


const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({message: 'welcome to my API'});
})

app.use(publicRouter);
app.use(api);
app.use(errorMiddleware);
app.get("*", function (req, res) {
    res.status(404).json({
        message: "NOT FOUND",
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

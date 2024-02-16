import express, { json, urlencoded } from 'express';
import cors from 'cors';
import {logger} from "#root/middleware/logger.js"


const app = express();


app.use(cors());

//body parser
app.use(json());
app.use(urlencoded({ extended: false}));

app.use(logger)

//listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on Port ${PORT}`)
})
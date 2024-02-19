const express = require("express")
const cors = require("cors")
const logger = require("./middleware/logger")

const app = express();

app.use(cors());

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(logger)

//Api's
app.use("/api/users", require("./api/users/register"))
app.use("/api/users", require("./api/users/login"))
app.use("/api/users", require("./api/users/logout"))

//listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on Port ${PORT}`)
})
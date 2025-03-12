//import
const express = require("express")
const cors = require("cors")
var morgan = require('morgan')
const { host, port } = require("./src/constant/config.const")

const app = express()

//plugin
app.use(cors({
    origin: `http://${host}:${port}`,
    credentials: true
}))
app.use(express.json())
app.use(morgan(':status || :method :date[clf] || :response-time || :url || :user-agent'))
//route
app.get('/', (req, res) => { res.send("wallet api") })
app.use((req, res, next) => {
    return res.status(404).send({ "message": "page not found" })
})
//listen
app.listen({ host: host, port: port }, () => {
    console.log(`This server is listen on http://${host}:${port}`);
})
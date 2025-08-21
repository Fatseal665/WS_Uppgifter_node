import express from "express"
import "dotenv/config" // oneliner for configuration
import { closeDB, runDB } from "./db/database.js"

const app = express()
const port: number = Number(process.env.PORT) || 3000;

app.get("/", (request, response) => {
response.status(200).send({ message: "Hello world!" })
})

app.listen(port, "0.0.0.0", ()=>{
    console.log("Listen on port" + port)
})

async function startServer() {
try {
 await runDB()
 app.listen(port, () => {
 console.log(`Listening to port ${port}`)
 console.log(`Start the app: http://localhost:${port}`)
 })
 process.on("SIGINT", async () => {
 console.log("Cleaning up...")
 await closeDB()
 process.exit(0)
 })
 } catch (error) {
 console.log(error)
 }
}
startServer()
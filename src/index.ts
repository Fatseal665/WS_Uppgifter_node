import express, {type Request, type Response} from "express"
import "dotenv/config" // oneliner for configuration
import { closeDB, getDB, runDB } from "./db/database.js"
import type { User } from "./types/User.js";

const app = express()
const port: number = Number(process.env.PORT) || 3000;

app.use(express.json())

app.get("/", (request, response) => {
response.status(200).send({ message: "Hello world!" })
})

app.post("/user", async(req: Request, res: Response) => {
    const {name, email} = req.body

    try {
    const db = getDB() // the endpoint "/user" calls getDB() to establish the db connection
    const result = await db.collection("users").insertOne({ name, email }) // inserts a new doc (row in table) into the users collection
 
    const newUser: User = {
      id: result.insertedId.toString(), // converts generated MongoDB id from ObjectId to string
      name,
      email,
    }
    res.status(201).send(newUser) // returns the new user with generated 'id' from MongoDB
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: "Failed to create user" })
  }
});

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
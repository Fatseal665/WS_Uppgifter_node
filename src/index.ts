import express from "express"

const app = express()
const port: number = Number(process.env.PORT) || 3000;

app.get("/", (request, response) => {
response.send("Hello world!")
})

app.listen(port, "0.0.0.0", ()=>{
    console.log("Listen on port" + port)
})


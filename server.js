const express = require("express")
const {exec} = require("node:child_process")

const http = require("http")
const path = require("path")



const app = express()
const server = http.createServer(app)


const {database,DatabaseRouter} = require("./database")
const {TokenRouter} = require("./Token")


const PORT = 3000

app.use(express.json())
app.use(express.static(path.join(__dirname,"myapp/dist")))


app.use(DatabaseRouter)
app.use(TokenRouter)



app.get("/{*path}",(req,res)=> {
    res.sendFile(path.join(__dirname,"myapp/dist","index.html"))
})


exec("cd myapp && npm run build",(err)=> {
    if (err) {
        throw err
    }

    console.log("REACT CONNECTED!")
})



server.listen(PORT,()=> console.log("CONNECTED TO LOCALHOST!"),exec(`start http://localhost:${PORT}`))
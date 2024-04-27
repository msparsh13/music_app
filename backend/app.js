const express = require("express")
const { get_audio, uploadaudio, search, alpha } = require("./functions")


const app = express()
app.use(express.json())
app.listen(3000 , ()=>{
    console.log("one with server")
})
app.get('/' , (req , res)=>{res.json({'mes' : "hello"})} )

app.get('/abc/get_audio/:trackID' , get_audio )
app.post('/abc' , uploadaudio)
app.get('/abc/search' , search )
app.get("/abc/al" , alpha)
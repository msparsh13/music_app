const { Readable } = require('stream');
const bucket = require('./bucket')
const multer = require('multer');
const { default: mongoose, mongo } = require('mongoose');



exports.get_audio = async(req , res )=>{
   
    
    try {
        var trackID =  new mongoose.mongo.ObjectId(req.params.trackID)
        
        
      } catch(err) {
        return res.status(400).json({ message: "Invalid trackID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters" }); 
      }
      res.set('content-type', 'audio/mp3');
      res.set('accept-ranges', 'bytes');


      const cursor = bucket.find({_id : trackID});
      for await (const doc of cursor) {
          console.log(doc);
        }

let downloadStream = bucket.openDownloadStream(trackID);
downloadStream.on('data' , (chunk)=>{
    res.write(chunk)
})
downloadStream.on('error', () => {
    res.sendStatus(404);
  });

  downloadStream.on('end', () => {
    res.end();
  });
}



exports.uploadaudio = (req , res) =>{
    const storage = multer.memoryStorage()
    const upload = multer({storage: storage})
    
    upload.single('track')(req , res , (err)=>{
        console.log(req.file.buffer)
    console.log(req.body)
        if (err) {
            return res.status(400).json({ message: "Upload Request Validation Failed" });
          } else if(!req.body.name) {
            return res.status(400).json({ message: "No track name in request body" });
          }
    
    let trackname = req.body.name 
    const rtrackstream = new Readable()
    rtrackstream.push(req.file.buffer) /*erre*/
    rtrackstream.push(null)
    let uploadstream = bucket.openUploadStream(trackname , {
      metadata : {
        Artist : req.artist ,
        Title : req.Title ,
        lyrics : req.lyrics ,
        Genre : req.genre 
      }
    })
  
    id = uploadstream.id
    console.log(id)
    rtrackstream.pipe(uploadstream)

    uploadstream.on('error' , ()=>{
        res.status(500).json({'message' : 'error'})

    })
    uploadstream.on('finish', () => {
        return res.status(201).json({ message: "File uploaded successfully, stored under Mongo ObjectID: " + id });
      });
    })
  }
 
  
exports.search= async(req , res)=>{
  try{
  let cursor = bucket.find({filename:  req.body.filename});
      for await (const doc of cursor) {
          console.log(doc);
        }
        console.log(req.body.filename)
        res.send(req.filename)
  }
catch(err){
  res.send(err)
}
}

exports.alpha= async(req , res)=>{
  try{
    console.log(req.body)
    res.send("hi")
  }
catch(err){
  res.send(err)
}
}


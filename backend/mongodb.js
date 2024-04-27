const mongoose = require('mongoose')
const Grid = require('gridfs-stream');
const fs = require('fs');




const client = new mongoose.mongo.MongoClient('mongodb+srv://sparshmahajan169:sparsh13@cluster0.vcl8zr0.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
const db = client.db('audio')


/* audio ke liye uplaoding ke liye basic */

const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'myCustomBucket' });
const readStream = fs.createReadStream('./Yugioh 5Ds - Hyper Drive.mp3').pipe(bucket.openUploadStream('abc'))
async function bac(){
const cursor = bucket.find({filename : 'abc'})
for await (const doc of cursor) {
  console.log(doc);
} 
}
bac()


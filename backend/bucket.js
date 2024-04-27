const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");
mongoose.connect("mongodb+srv://sparshmahajan169:sparsh13@cluster0.vcl8zr0.mongodb.net/")
const bucket = new GridFSBucket(mongoose.connection); // autouse default connection

module.exports = bucket;
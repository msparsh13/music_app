const { default: mongoose } = require('mongoose')
const mongo = require('mongoose')

const playlist_schema=new mongoose.Schema({
    title:{
        type: String,
        require : true ,

} , 
User:{
    type : String ,
    require : true ,

} ,
List : {
    type : [String] ,
    require : true ,
}
}
)

const User = new mongoose.Schema({
    name:{
        type: String ,
        require : true ,
    } ,
    aboutme:{
        type : String ,
        require : false ,
    } ,
     
    Playlist:{
        type : [String] ,
        require : false ,

    } 
     
   
})
const artist = new mongoose.Schema({
        name:{
            type: String ,
            require : true ,
        } ,
        aboutme:{
            type : String ,
            require : false ,
        } ,
         
        Albums:{
            type : [String] ,
            require : false ,
    
        } ,
        Works :{
            type : [String] ,
            require : false ,
        }
         
})

const Album_Schema = new mongoose.Schema({
    name:{
        type: String ,
        require : true ,
    } , 
    songs :{
        type : [String] ,
        require : true  ,
    } ,
    artist :{
        type : String ,
        require : true  ,
    }
})


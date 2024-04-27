const { Router } = require('express');
const bucket = require('./bucket');
const { get_audio, uploadaudio, search } = require('./functions');

Router.get('/get_audio/:trackid' , get_audio )

Router.post('/' , uploadaudio)

Router.get('/search' , search)
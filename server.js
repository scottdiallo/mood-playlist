var unirest = require("unirest");
var express = require('express');
var events = require('events');

var app = express();

//making api call to spotify
var getFromApi = function(endpoint, args){
    var emitter = new events.EventEmitter();
    unirest.get('https://api.spotify.com/v1/' + endpoint)
    .qs(args)
    .end(function(response){
        if(response.ok){
            emitter.emit('end', response.body)
        }
        else {
            emitter.emit('error', response.code);
        }
    });
    return emitter;
};

app.get('/search/:name', function(req, res){
    var searchReq = getFromApi('search',{
        q: req.params.name,
        limit:10,
        type:'artist'
    });
})

app.use(express.static('public'));
app.listen(process.env.PORT || 8080);
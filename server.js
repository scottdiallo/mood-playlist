var unirest = require('unirest');
var express = require('express');
var events = require('events');
var app = express();
app.use(express.static('public'));

//first API call to get the artist ID by name search
var getFromApi = function(endpoint, args) {
    var emitter = new events.EventEmitter();
    unirest.get('https://api.spotify.com/v1/' + endpoint)
        .qs(args)
        .end(function(response) {
            console.log('hello');
            if (response.ok) {
                emitter.emit('end', response.body);
            }
            else {
                emitter.emit('error', response.code);
            }
        });
    return emitter;
};

app.get('/artists/:name', function(req, res){
    var searchReq = getFromApi('search',{
        q: req.params.name,
        limit:10,
        type:'artist'
    });
})

$(document).ready(function(){
    $('.generateButton').click(function(){
        var resultElement = $('#resultDiv');
        var userSelection = $('formGroup').val();
        $.ajax({
            url: 'https://api.spotify.com/v1/users/{user_id}/playlists',
            method: 'get',
            data: { q: userSelection },
            dataType: 'json',
            success: function(data){
                console.log(data);
            }
        })
    })
})

app.use(express.static('public'));
app.listen(process.env.PORT || 8080);

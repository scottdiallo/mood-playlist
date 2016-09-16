// var answerChoices= {
// firstQuestion:["Happy", "Excited", "Sad", "In Love", "So-So", "Partying"],
// secondQuestion: ["Rainy", "Sunny", "Cold", "Chilly", "Simply Amazing"],
// thirdQuestin: ["Dancing", "Relaxing", "Sleeping", "Doing Nothing"]
// };


Spotify.prototype.onSearchSubmitted = function(event) {
    event.preventDefault();
    this.searchButton.trigger('click');
};
Spotify.prototype.search = function(name) {
    var ajax = $.ajax('/search/' + name, {
        type: 'GET',
        dataType: 'json'
    });
    ajax.done(this.onSearchDone.bind(this));
};
Spotify.prototype.onSearchDone = function(artist) {
    var result = $(this.artistTemplate(artist));
    this.result.empty().append(result);
    this.result.toggleClass('transparent');
};
$(document).ready(function() {
    var app = new Spotify();
});

//Ray mentor suggest not to use jquery for this.....?
// $(document).ready(function(){
//     $('.generateButton').click(function(){
//         var resultElement = $('#resultDiv');
//         var userSelection = $('formGroup').val();
//         $.ajax({
//             url: 'https://api.spotify.com/v1/users/{user_id}/playlists',
//             method: 'get',
//             data: { q: userSelection },
//             dataType: 'json',
//             success: function(data){
//                 console.log(data);
//             }
//         })
//     })
// })

// app.use(express.static('public'));
// app.listen(process.env.PORT || 8080);
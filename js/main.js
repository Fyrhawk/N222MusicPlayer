var albums;

$(document).ready(function() {
    $.getJSON( "data/music.json", function ( data ) {

        //store album data
        albums = data.albums;

        for(var i = 0; i < data.albums.length; i++) {
            $("#artist_music").append("<li data-index='"+i+"'>" + data.albums[i].artist + "</li>");
        }


    });
});
var albums;

//template variables
var artistLinkTemplate

$(document).ready(function() {

    //get references to DOM elements
    var contentDiv = $("#content");
    var artistDiv = $("#artist_page");
    var infoDiv = $("#artistTab");


    $.when (
        $.ajax("components/components.html"),
        $.getJSON( "data/music.json")
    ).done(function( templateData, data) {

        var templates = $(templateData[0]);

        //compile templates
        artistLinkTemplate = Handlebars.compile( templates.find("#artistLinks").html() );

        //store album data
        albums = data.albums;

        //append starting state
        artistDiv.html( artistLinkTemplate( data[0].artist ));
    });

        $("#content").on("click", ".artistLink", function() {
            //text name of artist
            var artistToFind = $(this).html();
            //an object to hold out results
            var results = {};

            results.albums = _.where(albums, { artist: artistToFind});

           infoDiv.html( artistLinkTemplate( results) );
        });

        //search field
        $("#btnSearch").click(function() {
            var searchTerm = $("#txtSearch").val();

            var results = {};

            //will only search exact titles
            results.albums = _.filter(title, function(item) {
                return (item.title.toUpperCase().indexOf(searchTerm.toUpperCase() != -1));
            })

            artistDiv.html( artistLinkTemplate( results));
        })

});
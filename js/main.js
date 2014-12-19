var books;

//template variables
var genreLinkTemplate, bookLinkTemplate, bookInfoTemplate;

$(document).ready(function() {

    //get references to dom elements
    var contentDiv = $("#content");
    var bookInfoDiv = $("#info");
    var browseDiv = $("#browse");
    var genreDiv = $("#genres");

    //
    //waits for all the functions in the argument list to finish before doing the ;done' half
    $.when(
            $.ajax("components/components.html"), //load in component data
            $.getJSON('data/books.json') //load in 'data' data
    ).done(function( templateData, data) {

                //wrap the template content in the jquery object
                var templates = $(templateData[0]);

                //compile templates
                genreLinkTemplate = Handlebars.compile( templates.find("#genreLinks").html() );
                bookLinkTemplate = Handlebars.compile( templates.find("#bookHomeLinks").html() );
                bookInfoTemplate = Handlebars.compile( templates.find("#bookInfo").html() );

                //store data
                books = data[0].books;

            //append starting state
            genreDiv.html( genreLinkTemplate( data[0].genres ));
            browseDiv.html( bookLinkTemplate( data[0] ) );
        });


    //whenever a .bookLink is clicked inside of the content div
    $("#content").on("click", ".bookLink", function() {
        //'this' is the thing clicked
        //we can get anything with data- on the element by using "data" and then the name after the dash
        var bookId = $(this).data('id');
        //get the book object using underscore to find the right result
        var bookInfo = _.findWhere(books, { id: bookId });

        console.log( bookInfo);
        //using the template add into the book info div
        bookInfoDiv.html(bookInfoTemplate(bookInfo) );
    });

    //whenever a genre link is clicked
    $("#content").on("click", ".genreLink", function() {
        //textual name of genre we're looking for
        var genreToFind = $(this).html();
        //an object to hold out results
        var results = {};
        //put the results onto a books property of an object
        results.books = _.where(books, { genre: genreToFind });

        //use the home template to show our results
        browseDiv.html( bookLinkTemplate( results) );
    });

    //search field
    $("#btnSearch").click(function() {
        var searchTerm = $("#txtSearch").val();

        var results = {};

        //will only search titles
        //will only search exact names
        results.books = _.filter(books, function(item) {
            return (item.title.toUpperCase().indexOf(searchTerm.toUpperCase()) != -1);
        })

        browseDiv.html( bookLinkTemplate( results));
    })


});
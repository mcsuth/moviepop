// 1. AFTER DOM LOADS
$(document).ready(function() {

  // 2. EVENT HANDLER TO LOOK FOR CLICK EVENT TO SEE USER'S FAVORITES
    $('#see_favorites').on('click', function(){

      // 3. CLEAR OUT THE DIV WITH THE EXISTING LIST OF FAVORITE MOVIES
      $('#movies_results').empty();

      // 4. getJSON/AJAX REQUEST TO GRAB USER'S FAVORITES IN OUR DATABASE, NOT QUERYING THE API
        $.getJSON("/favorite").done(function(favs){
          if (favs.length > 0) {
            $('#see_favorites').hide().css({"background": "#CCC"}).html("View All Your Favorites").fadeIn('slow');
            for (var i = 0; i < favs.length; i++) {
            $("<div id='" + favs[i]['id'] + "' class='favorites' >"
                        + "<br><div data-index='"+i+"' data-method='zed' data-id='" + favs[i]['imdbID'] + "' class='what'><img src='" + favs[i]["poster"] + "'></div>"
                        + "<div id='del_button' data-id='" + favs[i]['id'] + "'>"
                        + "<button class='remove_fave' data-method='delete'>Unfavorite</button>"
                        + "</div>"
                        + "</div>"
                       ).hide().appendTo('#movies_results').fadeIn(1000); // end of append template
            } // end of loop
          } else {
            $('#see_favorites').hide().css({"background": "orange"}).html("No Movies In Your Favorites!").fadeIn('slow');
          } // end of if/else conditional
        }) //end of getJSON to grab movie info

      // 5. DELETE EVENT HANDLER TO LOOK FOR CLICK EVENT TO DELETE A MOVIE
      $('#movies_results').on('click', '#del_button', function(){
        var id = $(this).attr("data-id");
        // 6. AJAX REQUEST TO DELETE USER'S FAVORITES
        $.ajax({
          url: "/movies/"+id,
          method: "DELETE",
          success: function(){
            var item_id = "#" + id;
            $("*[id=" + id + "]").fadeOut(500, function(){
              $(this).remove();
            });
          } // end of success in ajax
        }) // end of ajax request to delete
      }); // end of onclick event to delete a movie

    // 7. EVENT HANDLER TO LOOK FOR CLICK EVENT TO SEE MORE INFO
    // WHEN THE USER CLICKS ON A MOVIE IN THEIR FAVORITES
    $('#movies_results').on('click', 'div[data-method="zed"]', function(){
      var movieIndex = $(this).data('index');
      $.getJSON("/favorite").done(function(favs){
          // console.log("Index: "+movieIndex);
          // console.log(favs[movieIndex]["title"]);
          // console.log("Corresponding Hash:");
          // console.log(favs[movieIndex]);
          $('#movies_results').empty();
          $("<div class='poster'>"
              + "<img data-method='img' src=" + favs[movieIndex]["poster"] + ">"
              + "</div>"
              + "<div class='plot'>"
              + "<span class='searchedTitle'>" + favs[movieIndex]["title"] + "</span>"
              + "<p>" + favs[movieIndex]["year"] + "&nbsp;&nbsp;|&nbsp;&nbsp;"
              + "Rated: " + favs[movieIndex]["rated"] + "&nbsp;&nbsp;|&nbsp;&nbsp;"
              + favs[movieIndex]["genre"] + "</p>"
              + "<p>Director: " + favs[movieIndex]["director"] + "</p>"
              + "<p>Starring: " + favs[movieIndex]["actors"] + "</p>"
              + "<p>IMDB Rating: " + favs[movieIndex]["imdbRating"] + "</p>"
              + "<p>" + favs[movieIndex]["plot"] + "</p>"
              + "</div>"
          ).hide().appendTo('#movies_results').fadeIn(1000); // end of append template
      }) //end of getJSON
    }) // end of movies_results onclick event
  }) // end of see_favorite onclick event
}); // end of document.ready
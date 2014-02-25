// 1. AFTER DOM LOADS
$(document).ready(function() {

  // 2. EVENT HANDLER TO LOOK FOR CLICK EVENT FOR SEARCH
  $('#ackbarsearches').on('click', function(event) {

    // 3. PREVENT DEFAULT OF FULL PAGE REFRESH
    event.preventDefault();

    // 4. AJAX REQUEST TO SEARCH FOR LIST OF MOVIES
    // GRAB THE VALUE IN THE SEARCH BOX FOR THE DATA
    $.ajax({
      url: "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=nr9twk2r8vfgq5hkm6je8vmh",
      data: { q: $('#search_movies').val() },
      content: 'application/jsonp',
      dataType: "jsonp",
      type: "GET",
      // 5. AFTER A SUCCESSFUL AJAX REQUEST, APPEND THE INFO
      success: function(data) {
        $('#ackbarsearches').hide().fadeIn('slow');
        $('#see_favorites').css({"background": "lightblue"}).html("View All Your Favorites");
        // 6. PARSE THRU THE JSON
        // debugger
        for (var i in data.movies) {
          console.log(data.movies[i].title)
          $("#movies_results").append("<li id="+data.movies[i].title+" class='movie'>"+data.movies[i].title+" ("+data.movies[i].year+")</li>").hide().fadeIn('fast').css('cursor', 'pointer');
        } // end of loop
        // var item = data['movies'];
        // for (var i = 0; i < item.length ; i++) {
        //   var idNumber = "tt"+ item[i]['alternate_ids']['imdb'];
        //   var idNumber = item[i]['alternate_ids']['imdb'];
        //   var title = item[i]['title'];
        //   var year = item[i]["year"];
        //   $("#movies_results").append("<li id="+title+" class='movie'>"+title+" ("+year+")</li>").hide().fadeIn('fast').css('cursor', 'pointer');
        // } // end of for loop
      }, // end of success
      error: function() {
        alert("Error");
      }
    }) // end of ajax request

    // 7. CLEAR OUT THE SEARCH BOX
    $('#search_movies').val("");

    // 8. CLEAR OUT THE LIST OF PREVIOUSLY SEARCHED MOVIES
    $('#movies_results').empty();
  }); // end of ackbarsearches onclick/search event handler
}); //  end of document.ready


/**
 * @author: Murtadha Marzouq
 * @description: a simple client side interface with the JSON-Server running in the backend to perform GET, POST, and DELETE requests
 *
 */

//-----------------------------//
/* ** LISTEN ON THE DOM USER ACTIONS ** */
//---------------------------//
$(document).ready(function () {
  //-----------------------//
  /* ** GET REQUEST ** */
  //-----------------------//
  //Get all posts
  axios
    .get("http://45.55.32.24:3002/posts")
    .then(function (response) {
      for (var i = 0; i < response.data.length; i++) {
        // Add A List Item
        $(".posts ul").append(
          "<li id=" +
            `"${response.data[i].id}"` +
            'class="list-group-item "> <span class="author">' +
            response.data[i].title +
            '</span> <span class="author">' +
            response.data[i].author +
            '</span><button   type="button" class="btn btn-danger">Delete</button>  </li>'
        );
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  //-------------------------//
  /* ** POST REQUEST ** */
  //------------------------//
  $("button").click(function () {
    var title = $("#title").val();
    var author = $("#author").val();
    var id = $(this).parent().attr("id");
    // If the content is empty, don't add the post
    if (title == "" || author == "") {
      alert("Please fill in the form");
      return;
    }
    $(".posts ul").append(
      "<li id=" +
        `"${id}"` +
        'class="list-group-item "> <span class="author">' +
        title +
        '</span> <span class="author">' +
        author +
        '</span><button   type="button" class="btn btn-danger">Delete</button>  </li>'
    );
    $.ajax({
      url: "http://45.55.32.24:3002/posts",
      type: "POST",
      data: {
        title: title,
        author: author,
      },
    });
  });
  //-------------------------//
  /* ** DELETE REQUEST ** */
  //------------------------//
  //Delete post
  $(".posts ul").on("click", "button", function () {
    // Get the id of the post
    let id = $(this).parent().attr("id");
    // Make a delete request with axios
    axios
      .delete("http://45.55.32.24:3002/posts/" + id)
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
    // Remove the post from the DOM
    $(this).parent().remove();
  });
});

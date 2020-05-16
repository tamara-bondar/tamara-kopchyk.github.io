// Fetch all the details element.
const details = document.querySelectorAll("details");

// Add the onclick listeners.
details.forEach((targetDetail) => {
  targetDetail.addEventListener("click", () => {
    // Close all the details that are not targetDetail.
    details.forEach((detail) => {
      if (detail !== targetDetail) {
        detail.removeAttribute("open");
        if (detail.hasAttribute("id")) {
            $(".categories").remove();

        }

        // console.log('detail = ' + detail);
        // console.log(' HAS ID ' + detail.hasAttribute("id"));
        // if (detail.is('[id]'))
        // {
        //   console.log("detail[id] = " + detail[id]);
        //   $(".categories").remove();
        // }
      }
    });
  });
});


$(".heartDiv").click(function() {
  $(this).toggleClass("heartChoose");
  console.log("HEART");
});


$('.heartDiv').click(function() {
  // $(this).css('backgroundImage', 'url(path/to/img/newimage.png)');
  console.log("HEART");

});



$(document).ready(function(){
  $('input[type=radio]').click(function(){
      if (this.id == "category")
              getCategories();
  });
});


$('.categoryDiv').on('click','.categories',function () {
  $('.categories').removeClass('selected');
  $(this).addClass('selected')
});


function randomFact() {
    // We call the Web Service via AJAX
    var xmlhttp = new XMLHttpRequest();
    var url = "https://api.chucknorris.io/jokes/random";
    xmlhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        var json = JSON.parse(this.responseText);
        // We parse the JSON response
        // console.log("jsonRand - ", json);


        createNew(json);
        // parseJson(json);
      }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }


function getCategories() {
  var xhr = new XMLHttpRequest();
  // xhr.withCredentials = true;
  var url = "https://api.chucknorris.io/jokes/categories";
  xhr.addEventListener("readystatechange", function () {
    if(this.readyState == 4 && this.status == 200) {
        // console.log(this.responseText);
        var json1 = JSON.parse(this.responseText);
        // console.log(json1.length);
        for (let i = 0; i < json1.length; i++)
        {
          // console.log (i, json1[i]);
          $( ".categoryDiv" ).append( "<span class='categories' id='"+ json1[i] +"'>" + json1[i] + "</span>" );
        }
    }
  });
  
  xhr.open("GET", url); 
  xhr.send();
 
}

  function categoryFact() {
    // We call the Web Service via AJAX
    var xmlhttp = new XMLHttpRequest();
    var category = $('.selected').attr('id');
    var url = "https://api.chucknorris.io/jokes/random?category=" + category;
    xmlhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        var json = JSON.parse(this.responseText);
        // We parse the JSON response
        // console.log("jsonCat - ", json);

        createNew(json);
        // parseJson(json);
      }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    // console.log(url);
  }

  function queryFact() {
    // We call the Web Service via AJAX
    var xmlhttp = new XMLHttpRequest();
    var str = $("#fname").val();
    var url = "https://api.chucknorris.io/jokes/search?query=" + str;
    xmlhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        var json = JSON.parse(this.responseText);
        // We parse the JSON response
        parseSearchJson(json);
      }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    // console.log(url);
  }

  
function parseSearchJson(json) {
  // console.log("json - ", json);
  var total = json["total"];
  if ((total).constructor === Number && Number(total) > 0) {
    var results = json["result"];
    // parseJson(value);
    results.forEach(createNew);
    // var partHeight =  $(".left-part").height();
    // $(".right-part").height(partHeight);

  }
}


function createNew(joke, index) {


  $( ".left-part").append( `
    <div class="joke">
      <div class="heartDiv">
      </div>
      <div class="commentDiv">
      </div>
      <div class="mainJoke">
          <a href=" ` + joke["url"] + ` " id="jokeA">ID: <span id="jokeId"> ` + joke["id"] + `</span></a>
          <div id="data"> <b>` + joke["value"]+ ` </b></div>    
      </div>

      <div id="lastTime"> Last update: ` + joke["updated_at"]+ ` </div>
      ` + ((joke["categories"].length > 0) ? ('<div id="categoryName">' + joke["categories"] + '</div>') : "") + `
    </div>
  
  ` );

// resizeRightPart();
  
}


// function resizeRightPart() {
//   var leftPartHeight =  $(".left-part").height();
//   var rightPartHeight = $(".right-part").height();
//   var windowHeight = $(window).height();
//   var documentHeight = $(document).height();
//   // console.log("part = " + partHeight);
//   // console.log("window = " + $(window).height());
//   // if(leftPartHeight > rightPartHeight) 
//   //   {
//       $(".right-part").height(leftPartHeight);
//       console.log("first");
//     // } 
//     // else {
//     //   console.log("second");
//     //   // $(".right-part").height("100%");
//     // }   

//     console.log("left = " + leftPartHeight);
//     console.log("right = " + rightPartHeight);
//     console.log("window = " + windowHeight);
//     console.log("document = " + documentHeight);
// }

  // function parseJson(json) {
  //   console.log("json = " + json);
    // var fact = "<b>" + json["value"] + "</b>";
    // var jokeId = json["id"];
    // var idLink = json["url"];
    // var jokeTime = json["updated_at"];
    // var jokeCategory =  $('.selected').attr('id');
    // var jokeCategory = json["categories"];
    // document.getElementById("data").innerHTML = fact;
    // document.getElementById("jokeId").innerHTML = jokeId;
    // document.getElementById("categoryName").innerHTML = jokeCategory;
    // console.log("joke category = " + jokeCategory + " "+ typeof(jokeCategory));
    // if(typeof(jokeCategory) == "undefined") {
    // if(jokeCategory.length > 0) {
    //   $( "#categoryName" ).show();
    // }
    // else {
    //   $( "#categoryName" ).hide();
    // }



    // $("#jokeA").attr("href", idLink);
    // var today = new Date();
    // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // var dateTime = date+' '+time;
    // document.getElementById("lastTime").innerHTML = "Last update: " + jokeTime;
  // }

  // Finally we add a click event listener on the logo of Chuck Norris
  // to load a new random fact when the user will click on it



function deleteJokes() {
  var checkJokes = document.getElementsByClassName("joke");
  // console.log("checkJokes here " + checkJokes );
  // console.log("checkJokes  " + checkJokes.length );
  if(checkJokes.length > 0) {
    $(".joke").remove();

  }
}




  document.getElementById("getBtn").addEventListener("click", function() {
  
    if($("#random").prop("checked")) {

        deleteJokes();
          console.log("Random joke");
        randomFact();
        // resizeRightPart();

      }
     else if($("#category").prop("checked")) {
      // resizeRightPart();
       deleteJokes();
        console.log("Category joke!");
        categoryFact();
      }
      else {
        // resizeRightPart();
        deleteJokes();
        console.log("Query joke!");
        queryFact();
      }

  });



  randomFact();
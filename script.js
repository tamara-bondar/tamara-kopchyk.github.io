window.onresize = windowResize;
window.onload = windowResize;

function windowResize () {
  console.log("window " + $(window).width());
  console.log("document " + $(document).width());
  console.log("document height " + $(document).height());

  console.log("window screen " + window.screen.height);

  if ($(document).width() < 850) {
    $("#overlay").addClass("right-part-tablet overlay");
    $("#overlay").removeClass("right-part");
  }
  else {
    $("#overlay").addClass("right-part");
    $("#overlay").removeClass("right-part-tablet overlay");
  }
  resizeRightPart();
}


$('#toggle').click(function() {
  $(this).toggleClass('active');
  $('#overlay').toggleClass('open');
  $('#navFull').toggleClass('navFull');
  if (document.getElementById("overlay").getAttribute("class").includes("open")) {
    document.getElementsByTagName('html')[0].style.overflow = "hidden";
  }
  else  
  document.getElementsByTagName('html')[0].style.overflow = "";
});

var lastScrollTop = 0;

$(document.getElementById("overlay")).scroll(function() {

    var scrollTop = $(this).scrollTop();
    if (scrollTop > lastScrollTop && scrollTop < 75) {
      document.getElementById("button_container_main").style.top = 40 - scrollTop + "px";
    } else if (scrollTop > lastScrollTop || (scrollTop < lastScrollTop && scrollTop >= 75)) {
      document.getElementById("button_container_main").style.top = "-40px";
    } else {
      document.getElementById("button_container_main").style.top = 40-scrollTop + "px";
    }
    
    lastScrollTop = scrollTop;
});


const details = document.querySelectorAll("details");
details.forEach((targetDetail) => {
  targetDetail.addEventListener("click", () => {
    details.forEach((detail) => {
      if (detail !== targetDetail) {
        detail.removeAttribute("open");
        if (detail.hasAttribute("id")) {
          $(".categories").remove();
        }
      }
    });
    resizeRightPart();
  });
});

function jsonFromJoke(joke) {
  var mainJoke = joke.getElementsByClassName("mainJoke")[0];
  var url = mainJoke.getElementsByClassName("jokeA")[0].getAttribute("href");
  var jokeValue = $(mainJoke.getElementsByClassName("data")[0].getElementsByTagName("b")[0]).text();
  var categories = joke.getElementsByClassName("categoryName");
  
  var update_at_text = localStorage.getItem("update_dates");
  var jokes_updates = JSON.parse(update_at_text);
  var updated_at = "";
  for (const joke_update of jokes_updates) {
    if (joke_update["id"] == joke.id) {
      updated_at = joke_update["updated_at"];
    }
  }
  var jokeJSON = {"id": joke.id, "url": url, "categories": [categories.length > 0 ? categories[0].innerText : "" ], "updated_at": updated_at, "value": jokeValue};
  console.log("jokeJSON", jokeJSON);
  return jokeJSON;
}

function removeJokeFromFavorite(jokeId) {
  var favorite_jokes = getFavoriteJokes();
  favorite_jokes = favorite_jokes.filter(function(joke, idx) {
    return joke["id"] != jokeId;
  });
  localStorage.setItem("favorite_jokes", JSON.stringify(favorite_jokes));
}

function addJokeToFavorite(joke) {
  var favorite_jokes = getFavoriteJokes();
  favorite_jokes.unshift(joke);
  localStorage.setItem("favorite_jokes", JSON.stringify(favorite_jokes));
}

function getFavoriteJokes() {
  var favoriteJokes = localStorage.getItem("favorite_jokes");
  if (favoriteJokes != null) {
    var favoriteJokesJSON = JSON.parse(favoriteJokes);
    return favoriteJokesJSON;
  } else {
    return [];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  var favorite_jokes = getFavoriteJokes();
  console.log("fav", favorite_jokes);
  for (const joke of favorite_jokes) {
  
    var jokeUpdateTime = new Date(joke["updated_at"]);
    var currentTime = new Date();
    var days = Math.round((currentTime.getTime() - jokeUpdateTime.getTime()) / (1000 * 3600));
    $(".rightJokes").append(
      `<div class="jokeFav" id="favorite-joke-` + joke["id"] +`">
      <div class="heartChoose">
        </div>
        <div class="comJoke">  

        <div class="commentDiv">
        </div>
        <div class="mainJoke">
            <a href=" ` + joke["url"] + ` " class="jokeA">ID: <span class="jokeId"> ` + joke["id"] + `</span> <img src="img/link.png" class="linkImg" alt=""> </a>
            <div class="data"> <b>` + joke["value"]+ ` </b></div>    
        </div>
        </div>
        <div class="lastTimeCat">
        <div class="lastTime"> Last update: ` + days + ` hours ago </div>
        ` + ((joke["categories"].length > 0) ? ('<div class="categoryName">' + joke["categories"] + '</div>') : "") + `
      </div> </div>`);
  }
});

function isJokeWasAdded(jokeId) {
  var favorite_jokes = getFavoriteJokes();
  if (favorite_jokes.length > 0) {
    for (const favJoke of favorite_jokes) {
      if (favJoke["id"] == jokeId) {
        return true;
      }
    }
  }
  return false;
}

$(document).ready ( function () {
  $(document).on ("click", ".heartDiv", function () {
      $(this).addClass("heartChoose");
      $(this).removeClass("heartDiv");
      var joke = $(this.parentElement).clone()[0];
      var json = jsonFromJoke(this.parentElement);
      joke.id = "favorite-joke-" + joke.id;
      $(joke).addClass("jokeFav");
      $(joke).removeClass("joke");
      console.log(json);
      if (!isJokeWasAdded(json["id"])) {
        
        $(joke).prependTo(".rightJokes");
        addJokeToFavorite(json);
      }
      resizeRightPart();
    });
});

$(document).ready ( function () {
  $(document).on ("click", ".heartChoose", function () {
      var joke = this.parentElement;
      if (joke.getAttribute('class') == "jokeFav") {
        var jokeId = joke.id.substring(14);
        var mainJokeFavorite = document.getElementById(jokeId);
        if (mainJokeFavorite != null) {
          mainJokeFavorite = mainJokeFavorite.getElementsByClassName("heartChoose")[0];
          $(mainJokeFavorite).addClass("heartDiv");
          $(mainJokeFavorite).removeClass("heartChoose");
        }
        joke.remove();
        removeJokeFromFavorite(jokeId);
      }
      else
      {
        var mainJokeFavorite = joke.getElementsByClassName("heartChoose")[0];
        $(mainJokeFavorite).addClass("heartDiv");
        $(mainJokeFavorite).removeClass("heartChoose");
        
        var favJoke = document.getElementById("favorite-joke-" + joke.id);
        favJoke.remove();
        removeJokeFromFavorite(joke.id);
      }
      resizeRightPart();
    });
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
  var xmlhttp = new XMLHttpRequest();
  var url = "https://api.chucknorris.io/jokes/random";
  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      localStorage.removeItem("update_dates");
      createNew(json);
      resizeRightPart();
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}


function getCategories() {
  var xhr = new XMLHttpRequest();
  var url = "https://api.chucknorris.io/jokes/categories";
  xhr.addEventListener("readystatechange", function () {
    if(this.readyState == 4 && this.status == 200) {
        var json1 = JSON.parse(this.responseText);
        for (let i = 0; i < json1.length; i++)
        {
          $( ".categoryDiv" ).append( "<span class='categories' id='"+ json1[i] +"'>" + json1[i] + "</span>" );
        }
    }
  });
  xhr.open("GET", url); 
  xhr.send();
  resizeRightPart();
}

function categoryFact() {
  var xmlhttp = new XMLHttpRequest();
  var category = $('.selected').attr('id');
  var url = "https://api.chucknorris.io/jokes/random?category=" + category;
  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      localStorage.removeItem("update_dates");
      createNew(json);
      resizeRightPart();
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function queryFact() {
  var xmlhttp = new XMLHttpRequest();
  var str = $("#fname").val();
  var url = "https://api.chucknorris.io/jokes/search?query=" + str;
  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      parseSearchJson(json);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

  
function parseSearchJson(json) {
  var total = json["total"];
  if ((total).constructor === Number && Number(total) > 0) {
    var results = json["result"];
    localStorage.removeItem("update_dates");
    results.forEach(createNew);
    resizeRightPart();
  }
}
`1`

function createNew(joke, index, ) {
  var jokeUpdateTime = new Date(joke["updated_at"]);
  var currentTime = new Date();
  var days = Math.round((currentTime.getTime() - jokeUpdateTime.getTime()) / (1000 * 3600));
  var update_at_text = localStorage.getItem("update_dates");
  if (update_at_text != null) {
    var jokes_updates = JSON.parse(update_at_text);
    jokes_updates.push({"id": joke["id"], "updated_at": joke["updated_at"]});
    localStorage.setItem("update_dates", JSON.stringify(jokes_updates));
  } else {
    update_at_text = `[ { "id": "` + joke["id"] +`", "updated_at": "` + joke["updated_at"] + `"} ]`;
    localStorage.setItem("update_dates", update_at_text);
  }
  $(".left-part").append(
    `<div class="joke" id="` + joke["id"] +`">
      <div class="`+ (isJokeWasAdded(joke["id"]) ? "heartChoose" : "heartDiv") + `">
      </div>
      <div class="comJoke">  

      <div class="commentDiv">
      </div>
      <div class="mainJoke">
          <a href=" ` + joke["url"] + ` " class="jokeA">ID: <span class="jokeId"> ` + joke["id"] + `</span> <img src="img/link.png" class="linkImg" alt=""> </a>
          <div class="data"> <b>` + joke["value"]+ ` </b></div>    
      </div>
      </div>
      <div class="lastTimeCat">
      <div class="lastTime"> Last update: ` + days + ` hours ago </div>
      ` + ((joke["categories"].length > 0) ? ('<div class="categoryName">' + joke["categories"] + '</div>') : "") + `
    </div></div>`);
}


function deleteJokes() {
  var checkJokes = document.getElementsByClassName("joke");
  if(checkJokes.length > 0) {
    $(".joke").remove();

  }
}


function resizeRightPart() {
  
  var body = document.body;
  var html = document.documentElement;

    console.log("========================");
    console.log("body scroll", body.scrollHeight);
    console.log("body offset", body.offsetHeight);
    // console.log("body client", body.clientHeight);
    // console.log("html client", html.clientHeight);
    // console.log("html scroll", html.scrollHeight);
    // console.log("html offset", html.offsetHeight);
    console.log("height", $(document).height());

  // if((body.scrollHeight >= body.offsetHeight) && ($(document).width() >= 850)) {
  //   console.log("overlay offset", document.getElementById("overlay").offsetHeight)
  //   document.getElementById("overlay").style.height = body.scrollHeight + "px";
    // if(document.getElementById("overlay").offsetHeight < body.offsetHeight) {
    //   document.getElementById("overlay").style.height = "100%";
    // }
  // }
  // else {
  //   console.log("HERE 2");
  //   document.getElementById("overlay").style.height = "100%";
  // }
}


  document.getElementById("getBtn").addEventListener("click", function() {
  
    if($("#random").prop("checked")) {

        deleteJokes();
          console.log("Random joke");
        randomFact();
      }
     else if($("#category").prop("checked")) {
       deleteJokes();
        console.log("Category joke!");
        categoryFact();
      }
      else {
        deleteJokes();
        console.log("Query joke!");
        queryFact();
      }

  });

  randomFact();



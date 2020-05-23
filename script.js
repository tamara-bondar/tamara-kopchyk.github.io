window.onresize = windowResize;
window.onload = windowResize;

function windowResize () {
  if ($(document).width() <= 850) {

    $("#overlay").addClass("right-part-tablet overlay");
    $("#overlay").removeClass("right-part");

  }
  else {
    $("#overlay").addClass("right-part");
    $("#overlay").removeClass("right-part-tablet overlay");
  }
}

$('#toggle').click(function() {
  $(this).toggleClass('active');
  $('#overlay').toggleClass('open');
  $('#navFull').toggleClass('navFull');
 });



var lastScrollTop = 0;

$(document.getElementById("overlay")).scroll(function() {

    var scrollTop = $(this).scrollTop();
    console.log("test", scrollTop);
    if (scrollTop > lastScrollTop && scrollTop < 75) {
      document.getElementById("button_container_main").style.top = 40-scrollTop + "px";
    } else if (scrollTop > lastScrollTop || (scrollTop < lastScrollTop && scrollTop > 75)) {
      document.getElementById("button_container_main").style.top = "-4%";
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
  });
});

function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie(cookiename) {
  var user=getCookie(cookiename);
  if (user != "") {
    alert("Welcome again " + user);
  } else {
     user = prompt("Please enter your name:","");
     if (user != "" && user != null) {
       setCookie("username", user, 30);
     }
  }
}






function jsonFromJoke(joke) {
  var mainJoke = joke.getElementsByClassName("mainJoke")[0];
  var url = mainJoke.getElementsByClassName("jokeA")[0].getAttribute("href");
  var jokeValue = $(mainJoke.getElementsByClassName("data")[0].getElementsByTagName("b")[0]).text();
  var categories = joke.getElementsByClassName("categoryName");
  var jokeJSON = `{"id": "` + joke.id + `", "url": "` + url + `", "value": "` + jokeValue + `", "categories": [` + ((categories.length > 0) ? categories[0] : "" ) + `]}`;
  
  return JSON.parse(jokeJSON);
}

$(document).ready ( function () {
  $(document).on ("click", ".heartDiv", function () {
      $(this).addClass("heartChoose");
      $(this).removeClass("heartDiv");
      var joke = $(this.parentElement).clone()[0];
      var json = jsonFromJoke(this.parentElement);
      console.log(json);
      joke.id = "favorite-joke-" + joke.id;
      $(joke).addClass("jokeFav");
      $(joke).removeClass("joke");

      // check if not in cookies already
      $(joke).prependTo(".rightJokes");
      // Add to cookies
    });
});

$(document).ready ( function () {
  $(document).on ("click", ".heartChoose", function () {
      var joke = this.parentElement;
      if (joke.getAttribute('class') == "jokeFav") {
        var jokeId = joke.id.substring(14);
        var mainJokeFavorite = document.getElementById(jokeId).getElementsByClassName("heartChoose")[0];
        $(mainJokeFavorite).addClass("heartDiv");
        $(mainJokeFavorite).removeClass("heartChoose");
        joke.remove();
        // if (joke.parentElement.parentElement.getAttribute("class").includes("right-part-tablet")) {

        // } else if (joke.parentElement.parentElement.getAttribute("class").includes("right-part")) {
          
        // }
        
        // TODO: REMOVE from cookies joke
      }
      else
      {
        var mainJokeFavorite = joke.getElementsByClassName("heartChoose")[0];
        $(mainJokeFavorite).addClass("heartDiv");
        $(mainJokeFavorite).removeClass("heartChoose");
        
        var favJoke = document.getElementById("favorite-joke-" + joke.id);
        favJoke.remove();
        // TODO: REMOVE from cookies 
      }
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
        localStorage.clear();
        createNew(json);
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
}

  function categoryFact() {
    var xmlhttp = new XMLHttpRequest();
    var category = $('.selected').attr('id');
    var url = "https://api.chucknorris.io/jokes/random?category=" + category;
    xmlhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        var json = JSON.parse(this.responseText);
        localStorage.clear();
        createNew(json);
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
    localStorage.clear();
    results.forEach(createNew);
  }
}


function createNew(joke, index) {
  var jokeUpdateTime = new Date(joke["updated_at"]);
  var currentTime = new Date();
  var days = Math.round((currentTime.getTime() - jokeUpdateTime.getTime()) / (1000 * 3600));
  var update_at_text = localStorage.getItem("update_dates");
  if (update_at_text != null) {
    console.log(update_at_text);
    var jokes_updates = JSON.parse(update_at_text);
    update_at_text = `[ { "id": "` + joke["id"] +`", "updated_at": "` + joke["updated_at"] + `"} ]`;
    jokes_updates.push({"id": joke["id"], "updated_at": joke["updated_at"]});
    localStorage.setItem("update_dates", jokes_updates.toString());
  } else {
    update_at_text = `[ { "id": "` + joke["id"] +`", "updated_at": "` + joke["updated_at"] + `"} ]`;
    localStorage.setItem("update_dates", update_at_text);
  }
  $( ".left-part").append( `
    <div class="joke" id="` + joke["id"] +`">
      <div class="heartDiv">
      </div>
      <div class="commentDiv">
      </div>
      <div class="mainJoke">
          <a href=" ` + joke["url"] + ` " class="jokeA">ID: <span class="jokeId"> ` + joke["id"] + `</span> <img src="img/link.png" class="linkImg" alt=""> </a>
          <div class="data"> <b>` + joke["value"]+ ` </b></div>    
      </div>
      <div class="lastTime"> Last update: ` + days + ` hours ago </div>
      ` + ((joke["categories"].length > 0) ? ('<div class="categoryName">' + joke["categories"] + '</div>') : "") + `
    </div>
  
  ` );
}


function deleteJokes() {
  var checkJokes = document.getElementsByClassName("joke");
  if(checkJokes.length > 0) {
    $(".joke").remove();

  }
}


  document.getElementById("getBtn").addEventListener("click", function() {
  
    if($("#random").prop("checked")) {

        deleteJokes();
          console.log("Random joke");
        randomFact();

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



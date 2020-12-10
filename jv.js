var bdd =
[
  {
    word: "Start",
    text: "Candace"
  },
  {
    word:   "Candace",
    text:   "💖💖💖💖💖Happy Birthday💖💖💖💖💖<br>\
            I love you! And Everything about you ^^<br>\
            You're a baby sometimes but still you so caring :)<br>\
            You're true, you're honest, you're genuine :)<br>\
            Your PRESENCE is a PRESENT to me :)"
  },
  {
    word: "baby",
    text: "You cry a lot,<br>\
           And I still care a lot. :3<br>\
           You might be a tough southerner on the outside,<br>\
           But you, as the name suggests, are the sweetest candy on the inside ^^."
  },
  {
    word: "honest",
    text: "You might not sugarcoat everything,<br>\
           But you being honest is far better.<br>\
           You say what's on your mind (even if you think it's gonna make me mad),<br>\
           That's why I trust you a lot!"
  },
  {
    word: "PRESENT",
    text: "I can't buy you presents,<br>\
           So here's a webpage instead :p<br>\
           Hope you liked it and smiled atleast! ^^<br>\
           Happy Birthday again and always keep loving me."
  }
];

/** ----- GLOBAL VARIABLES ----- **/
var poem = document.getElementById("poem");
var next = document.getElementById("next");
var back = document.getElementById("back");
var POEM_TO_SET_AFTER_TRANSITION = "";
var CURRENT_POEM = "";
var POEM_HISTORY = [];

//Auto set texts on center of the screen
function resize() {
  poem.style.left = Math.floor(window.innerWidth/2 - poem.offsetWidth/2) + "px";
  poem.style.top = Math.floor(window.innerHeight/2 - poem.offsetHeight/2) + "px";
  next.style.left = Math.floor(window.innerWidth/2 - next.offsetWidth/2) + "px";
  next.style.top = Math.floor(window.innerHeight/2 - next.offsetHeight/2) + "px";
  back.style.transform = "translateY(" + window.innerHeight*3/4 + "px)";
}

window.onresize = () => resize();

//Get text of a word in db (WARNING : can return null)
function getPoemFromWord(word){
  var ret = null;
  bdd.forEach((elem) =>{
    if(elem.word.toUpperCase() == word.toUpperCase()){
      ret = elem.text;
    }
  });
  return ret;
}

//Replace a word by a link to the goToPoem function
function replaceWordByLink(text, word){
  var reg = new RegExp(word, 'gi');
  var link = "<span class='link' onclick={goToPoem('" +
      word + "')}>" + word + "</span>";
  
  return text.replace(reg, link);
}

function setPoem(word){
  //init poem div
  poem.innerHTML = "";
  poem.classList.remove("hide");
  
  //Get poem text
  var poemText = getPoemFromWord(word);
  
  //Replace all words
  bdd.forEach(elem => {
    if(elem.word.toUpperCase() != word.toUpperCase()){
      poemText = replaceWordByLink(poemText, elem.word);
    }
  });
  
  //Set new text
  var text = document.createElement("h2");
  text.innerHTML = poemText;
  poem.appendChild(text);
  
  //Show back button
  console.log(POEM_HISTORY)
  if(POEM_HISTORY.length > 0){
    back.style.display = "block";
  }
  else{
    back.style.display = "none";
  }
  back.onclick = (e) => {
    if(POEM_TO_SET_AFTER_TRANSITION == ""){
      let poem = POEM_HISTORY.pop();
      goToPoem(poem, true);
    }
  }
  
  CURRENT_POEM = word;
}

function goToPoem(word, backward=false){
  if(POEM_TO_SET_AFTER_TRANSITION == ""){
    back.style.display = "none";
    
    //Set new text
    var text = document.createElement("h2");
    var newPoem = getPoemFromWord(word);
    bdd.forEach(elem => {
      if(elem.word.toUpperCase() != word.toUpperCase()){
        newPoem = replaceWordByLink(newPoem, elem.word);
      }
    });
    text.innerHTML = newPoem;
    next.appendChild(text);

    resize();

    poem.classList.add("hide");
    next.classList.add("show");
    
    POEM_TO_SET_AFTER_TRANSITION = word;
    
    if(!backward){
      POEM_HISTORY.push(CURRENT_POEM);
    }
  }
}

//Function called when transition is done to set 
//the next poem as the current poem
function onTransitionEnd(){
  setPoem(POEM_TO_SET_AFTER_TRANSITION);
  next.innerHTML = "";
  next.classList.remove("show");
  poem.classList.remove("hide");

  resize();

  POEM_TO_SET_AFTER_TRANSITION = "";
}
next.addEventListener("transitionend", onTransitionEnd);

setPoem("start");
resize();
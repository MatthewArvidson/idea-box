var submit = document.querySelector(".save-button");
var sectionBottom = $(".section-bottom");
var search = $(".search-engine")


// submit.addEventListener("click", function(){
//   event.preventDefault();
//   var title = document.querySelector(".input-title").value;
//   var body = document.querySelector(".input-body").value;
//   console.log(body)
//   var theIdea = new Card(title, body);
//   idea(theIdea);
// })

submit.addEventListener("click", createIdea)

$(document).ready(loadPage)

//

search.on("keydown", filterIdeas)


function filterIdeas(){
  sectionBottom.html("")
  var searchVal= $(this).val();
  var ideas = getFromLocal();
  // console.log(searchVal);
// console.log($(this).val())
  var filterIdeas = ideas.filter(function(idea, index){
  // console.log(idea);
  // console.log(index);
  return searchVal === idea.title || searchVal === idea.body
  })
 filterIdeas.forEach(function(idea){
   appendIdea(idea);
 })
}


// function createCard(){
//   event.preventDefault();

//   var newCard = new Card(title.input, body.value);
//   addCardToList(newCard);
// }

function Card(title, body){
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = "swill";
}

function appendIdea(theIdea){
$('.section-bottom').prepend(`
  <article class="container" id=${theIdea.id}>
    <h2 contenteditable=true class="idea-title">${theIdea.title}</h2>
    <button class="delete"></button>
    <p contenteditable=true class="description">${theIdea.body}</p>
    <button class="up"></button>
    <button class="down"></button>
    <p class="quality">quality: </p><p class="level">${theIdea.quality}</p>
    <hr class="line">
  </article>
`)}

sectionBottom.on("click", ".delete", function(){
$(this).parent().remove()
});

//sectionBottom.on("click", ".delete", function(event){
//$(event.target).parent().remove()

sectionBottom.on("click", ".up", function(){
  var level = $(this).parent().find(".level").text();
  if(level === "swill"){
    $(this).parent().find(".level").text("plausible")
  }
  else if(level === "plausible"){
    $(this).parent().find(".level").text("genius")
  }
  });

sectionBottom.on("click", ".down", function(){
  var level = $(this).parent().find(".level").text();
  if(level === "genius"){
    $(this).parent().find(".level").text("plausible")
  }
  else if(level === "plausible"){
    $(this).parent().find(".level").text("swill")
  }
});

// function addCardToPage(cardCreate){
//   var newArticle = document.createElement("li");
//
//   newArticle.innerHTML =  "<article class=\"container\">" +
//                           "<h2 class=\"idea-title\">" + addToPage.title + "</h2>" +
//                           "<hr class=\"line\">" +
//                           "</article>";
//   sectionBottom.appendChild(newArticle);
// }
function loadPage(){
  for (var i = 0; i < localStorage.length; i++) {
  appendIdea(JSON.parse(localStorage.getItem(localStorage.key(i))))
  }
}


function saveToLocal(idea){
  localStorage.setItem(idea.id, JSON.stringify(idea))
}
 function getFromLocal(){
 var ideas = [];
 for (var i = 0; i < localStorage.length; i++) {
 ideas.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
 }
 return ideas
}

function createIdea(event){
  event.preventDefault();
  var title = $(".input-title").val();
  var body = $(".input-body").val();
  var theIdea = new Card(title, body);
  appendIdea(theIdea);
  saveToLocal(theIdea);
  //reset input fields
}

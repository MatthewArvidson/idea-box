
var submit = document.querySelector(".save-button");
var sectionBottom = $(".section-bottom");
var search = $(".search-engine")

submit.addEventListener("click", createIdea)

$(document).ready(loadPage)

search.on("keydown", filterIdeas)


function filterIdeas(){
  console.log("filterIdeas");
  sectionBottom.html("")
  console.log(".html");
  var searchVal= $(this).val().toUpperCase();
  console.log("searchVal");
  var ideas = getFromLocal();
  console.log("getFromLocal");
  var filterIdeas = ideas.filter(function(idea, index){
    console.log("filterIdeas");
  return searchVal === idea.title || searchVal === idea.body
  console.log("searchVal");
  })
 filterIdeas.forEach(function(idea){
   console.log("filterIdeas");
   appendIdea(idea);
   console.log("appendIdea");
 })
}

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

$(".section-bottom").on("click", ".delete", function(){
  var id = $(this).closest('article').prop('id');
  localStorage.removeItem(id);
  $(this).parent("article").remove();
  });

sectionBottom.on("click", ".up", function(){
  var id = $(this).closest('article').prop('id');
  // console.log(id)
  var ideaCard = getFromLocal(id);
  // console.log(ideaCard)
  if(ideaCard.quality === "swill"){
    $(this).siblings('.level').text("plausible")
    ideaCard.quality = "plausible";
  }
  else if(ideaCard.quality === "plausible"){
    $(this).siblings('.level').text("genius")
    ideaCard.quality = "genius";
  }
  saveToLocal(ideaCard);
  });

sectionBottom.on("click", ".down", function(){
  var id = $(this).closest('article').prop('id');
  console.log(id)
  var ideaCard = getFromLocal(id);
  console.log(ideaCard)
  if(ideaCard.quality === "genius"){
    $(this).siblings('.level').text("plausible")
    ideaCard.quality = "plausible";
  }
  else if(ideaCard.quality === "plausible"){
    $(this).siblings('.level').text("swill")
    ideaCard.quality = "swill";
  }
  saveToLocal(ideaCard);
});

function loadPage(){
  for (var i = 0; i < localStorage.length; i++) {
  appendIdea(JSON.parse(localStorage.getItem(localStorage.key(i))))
  }
}

function getFromLocal(id) {
  var ideaCardGot = JSON.parse(localStorage.getItem(id));
  return ideaCardGot
}

function saveToLocal(idea){
  localStorage.setItem(idea.id, JSON.stringify(idea))
}

function createIdea(event){
  event.preventDefault();
  var title = $(".input-title").val();
  var body = $(".input-body").val();
  var theIdea = new Card(title, body);
  appendIdea(theIdea);
  saveToLocal(theIdea);
}

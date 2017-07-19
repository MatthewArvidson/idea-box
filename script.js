var submit = document.querySelector(".save-button");

var sectionBottom = document.querySelector(".section-bottom")

submit.addEventListener("click", function(){
  event.preventDefault();
  var title = document.querySelector(".input-title").value;
  var body = document.querySelector(".input-body").value;
  console.log(body)
  var theIdea = new Card(title, body);

  idea(theIdea)
})

// function createCard(){
//   event.preventDefault();

//   var newCard = new Card(title.input, body.value);
//   addCardToList(newCard);
// }

function Card(title, body){
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = "swell";
}

function idea(theIdea){
$('.section-bottom').append(`
  <article id= ${theIdea.id}>
    <h2 class="idea-title">${theIdea.title}</h2>
    <img class="delete" src="Imagery/delete.svg">
    <p class="description">${theIdea.body}</p>
    <img class="up" src="Imagery/upvote.svg">
    <img class="down" src="Imagery/downvote.svg">
    <p class="quality">quality: </p><p class="swell">${theIdea.quality}</p>
  <hr class="line">
</article>
`)}



// function addCardToPage(cardCreate){
//   var newArticle = document.createElement("li");
//
//   newArticle.innerHTML =  "<article class=\"container\">" +
//                           "<h2 class=\"idea-title\">" + addToPage.title + "</h2>" +
//                           "<hr class=\"line\">" +
//                           "</article>";
//   sectionBottom.appendChild(newArticle);
// }

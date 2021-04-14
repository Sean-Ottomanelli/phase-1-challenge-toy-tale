let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

//Set the page

  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(allToyObjArray => {
    console.log('Success:', allToyObjArray);
    allToyObjArray.forEach(toyCardMaker)
  })

//Create new card

let addToyButtonForm = document.querySelector(".add-toy-form")

function addToy(evt) {
  console.log("clicked new toy");
  evt.preventDefault();
  fetch("http://localhost:3000/toys"
  ,{
    method: "POST", 
    headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
      "name": "Jessie",
      "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
      "likes": 0
    })
  })
  .then(res => res.json())
  .then(toyCardMaker)
  
}

addToyButtonForm.addEventListener("submit",addToy)

//Like existing card

});

//Helper function
function toyCardMaker (toyObj) {
  let toyCollection = document.querySelector("div#toy-collection")
  let toyCard = document.createElement("div")
  toyCard.className = "card"
  toyCollection.append(toyCard)
  let toyName = toyObj.name
  let toyImage = toyObj.image
  let toySpan = toyObj.likes
  let toyId = toyObj.id
  let toyCardName = document.createElement("h2")
  toyCardName.innerText = toyName
  toyCard.append(toyCardName)
  let toyCardImage = document.createElement("img")
  toyCardImage.src = toyImage
  toyCardImage.className = "toy-avatar"
  toyCard.append(toyCardImage)
  let toyCardLikes = document.createElement("p")
  toyCardLikes.innerText = toySpan + " Likes"
  toyCard.append(toyCardLikes)
  let toyCardBtn = document.createElement("button")
  toyCardBtn.id = toyName
  toyCardBtn.className = "like-btn"
  toyCardBtn.innerText = "Like"
  toyCard.append(toyCardBtn)
  toyCardBtn.addEventListener("click",likeToy)

  function likeToy(evt){
    console.log(`I like ${toyName}`)
    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify({
        likes: toySpan + 1
      })
    })
    .then(res => res.json())
    .then((res) => {
      console.log(res.likes)
      toySpan = res.likes
      toyCardLikes.innerText = `${res.likes} Likes`
    })
  }

}


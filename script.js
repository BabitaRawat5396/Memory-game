const main_content = document.querySelector('#main-container');
const change_images = document.querySelector('#change-images');
const three_stack_button = document.querySelector("#three-stack");

let timeoutId = null;
let count=0;
var cross_button;
var divElement;
let matchedCount = 0;
let selectedItems = [];
let last_two_items = [];

const anime = [
  {
    'name':"naruto",
    'url':"https://cdn.pixabay.com/photo/2018/10/19/05/12/naruto-3757871_1280.jpg"
  },
  {
    'name':"obito",
    'url':"https://cdn.pixabay.com/photo/2018/10/20/03/26/young-3760179_1280.jpg"
  },
  {
    'name':"itachi",
    'url':"https://cdn.pixabay.com/photo/2018/10/21/13/01/toy-3762868_1280.jpg"
  },
  {
    'name':"gaara",
    'url':"https://cdn.pixabay.com/photo/2018/10/20/00/26/ninja-3760010_1280.jpg"
  },
  {
    'name':"hinata",
    'url':"https://cdn.pixabay.com/photo/2018/12/23/09/47/young-3890799_1280.jpg"
  },
  {
    'name':"minato",
    'url':"https://cdn.pixabay.com/photo/2021/03/10/02/18/anime-6083347_1280.jpg"
  },
];

const animals = [
  {
    'name':"wolf",
    'url':"https://cdn.pixabay.com/photo/2017/01/14/12/59/iceland-1979445_1280.jpg"
  },
  {
    'name':"butterflies",
    'url':"https://cdn.pixabay.com/photo/2017/02/08/17/24/fantasy-2049567_1280.jpg"
  },
  {
    'name':"cat",
    'url':"https://cdn.pixabay.com/photo/2015/11/16/14/43/cat-1045782_1280.jpg"
  },
  {
    'name':"tiger",
    'url':"https://cdn.pixabay.com/photo/2018/07/31/22/08/lion-3576045_1280.jpg"
  },
  {
    'name':"swan",
    'url':"https://cdn.pixabay.com/photo/2017/02/28/23/00/swan-2107052_1280.jpg"
  },
  {
    'name':"bird",
    'url':"https://cdn.pixabay.com/photo/2023/09/15/11/08/eastern-yellow-robin-8254586_1280.jpg"
  },
];

const harry_potter = [
  {
    'name':"Draco",
    'url':"https://i.pinimg.com/564x/9f/58/f9/9f58f9aabfddcdfd9dda63eb5c388d72.jpg"
  },
  {
    'name':"Harry",
    'url':"https://i.pinimg.com/474x/5a/43/12/5a431268bf22b8210a4d87130838f28b.jpg"
  },
  {
    'name':"Snape",
    'url':"https://i.pinimg.com/474x/0a/8e/d9/0a8ed91e02b1d20e76d72e19b4422e1e.jpg"
  },
  {
    'name':"Harmione",
    'url':"https://i.pinimg.com/474x/c6/7d/cc/c67dccc3be6e56c30621c424867088c0.jpg"
  },
  {
    'name':"Ronald",
    'url':"https://i.pinimg.com/474x/a2/26/44/a2264413f7cf20f4148ebaf46571b83c.jpg"
  },
  {
    'name':"Dumbledore",
    'url':"https://i.pinimg.com/474x/65/05/f7/6505f71c8ba125e23da0cd30bc07b080.jpg"
  },
];

let image_list = anime;

// Function to restart the game
function restartGame() {
  // Clear the main content
  main_content.innerHTML = '';

  // Reset game variables
  timeoutId = null;
  count = 0;
  matchedCount = 0;
  selectedItems = [];
  last_two_items = [];
  image_list = anime;

  // Start a new game
  startGame();
}

// Step-4) Adding event listener to each card
main_content.addEventListener('click',(event)=>{
  const clickedCard = event.target.closest('.card');
  
  if(clickedCard){
    if(clickedCard.id === 'main-container'){return false}

    clickedCard.classList.add('card-selected');

    // Check if the id is not already in matchItems
    if (!selectedItems.some(item => item.id === clickedCard.id)) {
      // Push the name into matchItems

      selectedItems.push({ id:clickedCard.id, name: clickedCard.dataset.name });

      // checking for last two items of the selectedItems to see if they match or not
      const last_two_items = selectedItems.slice(-2);
      const firstCard = document.getElementById(`${last_two_items[0].id}`);
      if(last_two_items[1]){
        var secondCard = document.getElementById(`${last_two_items[1].id}`);

      }
      if(last_two_items.length > 1 && last_two_items[0].name === last_two_items[1].name){
        matchedCount++;
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      }else{
        timeoutId = setTimeout(() => {
          if(firstCard.id !== clickedCard.id && secondCard && secondCard.id !== clickedCard.id){
            clickedCard.classList.add('rotate');
          }
          // after 3s remove the current item from the selectedItems array
          selectedItems = selectedItems.filter(item => item.id !== clickedCard.id);
          clickedCard.classList.remove('card-selected'); 
          clickedCard.classList.remove('rotate');
        },1500);
      }
    }
  }

  // Confetti After matching all
  if(matchedCount === 6){
    const canvas = document.getElementById('confetti');
    const jsConfetti = new JSConfetti({ canvas });
    jsConfetti.addConfetti({
      confettiRadius: 4,
    }).then(() => jsConfetti.addConfetti({
      confettiRadius: 4,
    }))
    setTimeout(() => {
      restartGame();
    },4000)
   }
})

// Function to set new images
const updategrids = () => {
  const duplicatedArray = image_list.concat(image_list);

  // Randomize the images
  const shuffledArray = Array.from(duplicatedArray).sort(() => 0.5 - Math.random());

  for(let i=0; i<shuffledArray.length; i++){
    const card = document.getElementById(`${i}`);
    card.dataset.name = shuffledArray[i].name;
    const backCard = card.querySelector('.backCard');
    backCard.style.backgroundImage = `url(${shuffledArray[i].url})`;
  }
}

const imageChanger = () => {
  count++;
  
  if(count>1){
    divElement.style.display='flex';
  }

  const three_stack = document.getElementById('three-stack');
  three_stack.style.display='none';

  if(count<2){
    divElement = document.createElement('div');
    divElement.setAttribute('id','slider');
    
    cross_button = document.createElement('button');
    cross_button.innerText='✕';

    divElement.appendChild(cross_button);
  

    const unordered_list = document.createElement('div');

    const list1 = document.createElement('p');
    const list2 = document.createElement('p');
    const list3 = document.createElement('p');

    divElement.appendChild(unordered_list);
    unordered_list.appendChild(list1);
    unordered_list.appendChild(list2);
    unordered_list.appendChild(list3);

    list1.innerText='Anime';
    list2.innerText='Animals';
    list3.innerText='Harry Potter';


    list1.addEventListener('click',() => {
      image_list = anime;
      three_stack.style.display='block';
      divElement.style.display='none';
      updategrids();
    })

    list2.addEventListener('click',() => {
      image_list = animals;
      three_stack.style.display='block';
      divElement.style.display='none';
      updategrids();
    })

    list3.addEventListener('click',() => {
      image_list = harry_potter;
      three_stack.style.display='block';
      divElement.style.display='none';
      updategrids();
    })
    change_images.appendChild(divElement);
  }
  
  cross_button.addEventListener('click',() => {
    three_stack.style.display='block';
    divElement.style.display ='none';
  })
  
}

three_stack_button.addEventListener('click',imageChanger)


// Step-3) Make the grid for all these images
const startGame = () => {

  // Step-1) Duplicate the array to match
  const duplicatedArray = image_list.concat(image_list);

  // Step-2) randomize the images
  const shuffledArray = Array.from(duplicatedArray).sort(() => 0.5 - Math.random());

  const tempDiv = document.createDocumentFragment();

  for(let i=0; i< shuffledArray.length; i++){
    const divElement = document.createElement('div');

    // Step-4) prepare to flip the card
    const frontCard = document.createElement('div');
    const backCard = document.createElement('div');
    frontCard.classList.add('frontCard');
    backCard.classList.add('backCard');
    divElement.appendChild(frontCard);
    divElement.appendChild(backCard);

    backCard.style.backgroundImage = `url(${shuffledArray[i].url})`;
    divElement.classList.add('card');
    divElement.setAttribute('id',`${i}`);

    divElement.dataset.name = shuffledArray[i].name;
    tempDiv.appendChild(divElement);
  }

  main_content.appendChild(tempDiv);
}

startGame();


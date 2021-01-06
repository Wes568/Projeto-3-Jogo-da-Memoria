const cardBoard = document.getElementById("classboard");
const images = ['1.png',
'2.png',
'3.png',
'4.png',
'5.png',
'6.png'];

var cardHTML = '';

images.forEach(img=> {
    cardHTML += `
        <div  style="height:210px;" class="memorycard" data-card="${img}">
            <img class="frontface"src="img/${img}">
            <img class="backface" src="img/vice.png">
        </div>
    `
});

cardBoard.innerHTML=cardHTML + cardHTML;

//REN END

const cards = document.querySelectorAll(".memorycard");

function flipCard(){

    if(lockCard) return false;
    this.classList.add('flip');

    if(!firstCard){
    firstCard = this;
    return false;
    }

    secondCard = this;

    checkForMatch();
}
var count=0;

function checkForMatch(){



    var isMatch = firstCard.dataset.card === secondCard.dataset.card;

    if(isMatch==true){
        count++;
        console.log(count);
        gameOver();
        }       



    !isMatch ? disableCards(): resetCards(isMatch);


}

function gameOver(){
    if(count==6){
        setTimeout(() => { 
            alert('Você venceu!');
        }, 1000)
    }  
}



function disableCards(){
    lockCard = true;

    setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    
    resetCards();

    }, 1000);
}

(function random(){
    cards.forEach(card => {
        var rand = Math.floor(Math.random()*12);
        card.style.order = rand;
    })
})()

function resetCards(isMatch = false){
        if(isMatch){
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
        }

        [firstCard, secondCard, lockCard] = [null, null, false]

    }

cards.forEach(card => card.addEventListener('click', flipCard));

var firstCard, secondCard;
var lockCard = false;

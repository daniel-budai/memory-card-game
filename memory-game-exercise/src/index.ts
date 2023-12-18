let flippedCards: HTMLElement[] = []; //En array för att lagra vända kort under spelet.
let matchedPairs: number = 0; // En räknare för att hålla reda på antalet matchade kortpar.

//DOM-manipulation 
const memoryCards = document.querySelectorAll<HTMLElement>('.memory-card');
memoryCards.forEach(card => card.addEventListener('click', flipCard));
const victoryOverlay = document.querySelector<HTMLDivElement>('.overlay');
const closeOverlay = document.querySelector<HTMLDivElement>('.close');

//Fisher-Yates method
function shuffleCards(): void { 
    for (let i = memoryCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        memoryCards[i].style.order = j.toString();
        memoryCards[j].style.order = i.toString(); 
    } 
}
  
function flipCard(): void {
    if (flippedCards.length < 2) { //Kollar om längden på arrayen,Om det är färre än 2, tillåts användaren att vända ett till kort.
        this.classList.toggle('flip'); //effekt
        flippedCards.push(this); //lägg till
        setTimeout(checkMatch, 1000); //tiden flippa tillbaka 
    }
} /* Man säga att 'this' fångar det specifika memorycard som är valt, togglar flip effekten, 
    pushar sedan in det kortet som är valt med .push(this) i flippedCards arrayen. this är ett keyword */ 

function checkMatch(): void {
    const [firstCard, secondCard] = flippedCards; //deconstructing. 
    if (firstCard.textContent === secondCard.textContent) {
        flippedCards = [];
        matchedPairs++;
        if (matchedPairs === memoryCards.length / 2) {
            victoryOverlay?.classList.add('show');
        }
    } else {
        setTimeout(() => { //delay på kortvändningen
            flippedCards.forEach(card => card.classList.remove('flip'));
            flippedCards = [];
        }, 1000);
    }
}
 /* Använder mig av deconstructing assignment av arrayen flippedCards, man kan säga att man
  plockar isär arrayen och tilldelar de variabler. Kontrollerar att de har samma texcontent, 
  När ett korten matchar, nollställer vi arrayen, och öka matchedPairs++; När alla de 16 har fått par
  alltså 8 kort visas arrayen. memoryCards.length som är 16 / 2.
  Om inte korten matchar kör jag en forEach på arrayen Efter att klassen 'flip' har tagits bort från 
  varje kort, återställs flippedCards-arrayen till en tom array.
  */ 

closeOverlay.addEventListener('click', () => {
    victoryOverlay.classList.remove('show');
    location.reload(); 
});
shuffleCards();

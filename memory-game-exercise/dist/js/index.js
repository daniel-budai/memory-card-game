let flippedCards = []; //En array för att lagra vända kort under spelet.
let matchedPairs = 0; // En räknare för att hålla reda på antalet matchade kortpar.
//DOM-manipulation
const memoryCards = document.querySelectorAll(".memory-card");
memoryCards.forEach((card) => card.addEventListener("click", flipCard));
const victoryOverlay = document.querySelector(".overlay");
const closeOverlay = document.querySelector(".close");
//Fisher-Yates method
function shuffleCards() {
  for (let i = memoryCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    memoryCards[i].style.order = j.toString();
    memoryCards[j].style.order = i.toString();
  }
}
function flipCard() {
  if (flippedCards.length < 2 && !flippedCards.includes(this)) {
    // Check if the card is already flipped and matched
    this.classList.toggle("flip"); // Add flip effect
    flippedCards.push(this); // Add the flipped card to the array
    setTimeout(checkMatch, 1000); // Flip back after a delay
  }
} /* Man säga att 'this' fångar det specifika memorycard som är valt, togglar flip effekten,
    pushar sedan in det kortet som är valt med .push(this) i flippedCards arrayen. this är ett keyword */
function checkMatch() {
  const [firstCard, secondCard] = flippedCards; //deconstructing.
  if (firstCard.textContent === secondCard.textContent) {
    flippedCards = [];
    matchedPairs++;
    if (matchedPairs === memoryCards.length / 2) {
      victoryOverlay === null || victoryOverlay === void 0
        ? void 0
        : victoryOverlay.classList.add("show");
    }
  } else {
    setTimeout(() => {
      flippedCards.forEach((card) => card.classList.remove("flip"));
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
closeOverlay.addEventListener("click", () => {
  victoryOverlay.classList.remove("show");
  location.reload();
});
shuffleCards();

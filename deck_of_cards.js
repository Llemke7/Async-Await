async function drawCardFromShuffledDeck() {
    const apiUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';

    try {
        // Shuffle a new deck
        const response = await fetch(apiUrl);
        const deckData = await response.json();

        
        const deckId = deckData.deck_id;

        // Draw a single card from the shuffled deck
        const drawUrl = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
        const drawResponse = await fetch(drawUrl);
        const cardData = await drawResponse.json();

        if (!cardData.success) {
            throw new Error(cardData.error || 'Failed to draw a card from the deck.');
        }

        // Get the card value and suit
        const card = cardData.cards[0];
        const value = card.value;
        const suit = card.suit;

        // Log the suit of the card
        console.log(`${value} of ${suit}`);
    } catch (error) {
        console.error('Error:', error.message || error);
    }
}

drawCardFromShuffledDeck();


async function drawCards() {
    try {
        // Shuffle a new deck and get the deck ID
        const shuffleResponse = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        const shuffleData = await shuffleResponse.json();
        const deckId = shuffleData.deck_id;

        // Draw a card
        const drawResponse1 = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        const cardData1 = await drawResponse1.json();

        if (!cardData1.success) {
            throw new Error(cardData1.error || 'Failed to draw the first card from the deck.');
        }

        // Log the first card
        console.log('First card drawn:', cardData1.cards[0].value, 'of', cardData1.cards[0].suit);

        // Draw second card
        const drawResponse2 = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        const cardData2 = await drawResponse2.json();

        if (!cardData2.success) {
            throw new Error(cardData2.error || 'Failed to draw the second card from the deck.');
        }

        // Log the second card
        console.log('Second card drawn:', cardData2.cards[0].value, 'of', cardData2.cards[0].suit);
    } catch (error) {
        console.error('Error:', error.message || error);
    }
}
drawCards();


let deckId = null;
let remainingCards = 0;

async function createDeck() {
    try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/');
        const data = await response.json();
        deckId = data.deck_id;
        remainingCards = data.remaining;
        console.log('Deck created with ID:', deckId);
        console.log('Remaining cards in deck:', remainingCards);
    } catch (error) {
        console.error('Error creating deck:', error);
    }
}

async function drawCard() {
    if (remainingCards === 0) {
        console.log('No cards left in the deck.');
        return;
    }

    try {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        const data = await response.json();

        if (data.success) {
            const card = data.cards[0];
            console.log('Card drawn:', card.value, 'of', card.suit);
            remainingCards = data.remaining;
            displayCard(card.image, `${card.value} of ${card.suit}`);
        } else {
            console.error('Failed to draw card:', data.error);
        }
    } catch (error) {
        console.error('Error drawing card:', error);
    }
}

function displayCard(imageUrl, cardInfo) {
    const cardContainer = document.getElementById('card-container');
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.innerHTML = `<img src="${imageUrl}" alt="${cardInfo}" /><p>${cardInfo}</p>`;
    cardContainer.appendChild(cardElement);
}

document.getElementById('draw-button').addEventListener('click', drawCard);

window.addEventListener('load', createDeck);

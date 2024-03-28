async function getFavoriteNumberFact() {
  const favoriteNumber = 7;
  const apiUrl = `http://numbersapi.com/${favoriteNumber}?json`;

  try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data.text;
  } catch (error) {
      console.error('Error fetching data:', error);
      return null;
  }
}

async function getNumberFacts(numbers, type = 'trivia') {
  const apiUrl = `http://numbersapi.com/${numbers.join(',')}?json&type=${type}`;

  try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching data:', error);
      return null;
  }
}

// Display favorite number fact
(async () => {
  const favoriteFact = await getFavoriteNumberFact();
  const favoriteFactContainer = document.getElementById('favorite-fact');
  favoriteFactContainer.textContent = favoriteFact;
})();

// Display multiple number facts
(async () => {
  const numbers = [3, 5, 7, 9]; 
  const factsData = await getNumberFacts(numbers);

  const multipleFactsContainer = document.getElementById('multiple-facts');
  for (const number of numbers) {
      const factInfo = factsData[number];
      const factElement = document.createElement('p');
      if (factInfo && factInfo.found) {
          factElement.textContent = `Fact about number ${number}: ${factInfo.text}`;
          console.log(factElement.textContent)
      } else {
          factElement.textContent = `Fact about number ${number}: Fact not found`;
      }
      multipleFactsContainer.appendChild(factElement);
  }
})();



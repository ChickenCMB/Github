function navigateWithLoading(url) {
  const loadingScreen = document.getElementById('loading-screen');
  loadingScreen.style.display = 'flex';

  setTimeout(() => {
    window.location.href = url;
  }, 300);
}

function performSearch(query) {
  const resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = '';

  if (query.trim() === '') {
    resultsContainer.style.display = 'none';
    return;
  }

  const lowerQuery = query.toLowerCase();
  const mapCards = document.querySelectorAll('.map-card');

  let hasResults = false;

  mapCards.forEach(card => {
    const title = card.querySelector('.map-title').textContent.toLowerCase();
    const desc = card.querySelector('.map-desc').textContent.toLowerCase();
    const img = card.querySelector('img').src;
    const url = card.dataset.link || '#';

    if (title.includes(lowerQuery) || desc.includes(lowerQuery)) {
      hasResults = true;

      const resultButton = document.createElement('button');
      resultButton.className = 'search-result-button';
      resultButton.innerHTML = `
        <img src="${img}" alt="${title}">
        <div class="search-result-info">
          <h4>${card.querySelector('.map-title').textContent}</h4>
          <p>${card.querySelector('.map-desc').textContent} • ${card.querySelector('.tag').textContent}</p>
        </div>
      `;

      resultButton.addEventListener('click', () => {
        if (url !== '#') {
          navigateWithLoading(url);
        }
      });

      resultsContainer.appendChild(resultButton);
    }
  });

  if (!hasResults) {
    const noResults = document.createElement('div');
    noResults.className = 'no-results';
    noResults.textContent = 'No maps found';
    resultsContainer.appendChild(noResults);
  }

  resultsContainer.style.display = 'block';
}
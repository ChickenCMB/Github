document.getElementById("currentYear").textContent = new Date().getFullYear();

const searchData = [
    {
        title: "Maps",
        description: "Search for a maps",
        url: "maps.html",
        type: "Map",
    },
    {
        title: "Add-Ons",
        description: "Collection of useful add-ons for AC",
        url: "addons.html",
        type: "Add-On",
    },
    {
        title: "Skins Pack",
        description: "Custom skins for AC community",
        url: "skin.html",
        type: "Skin",
    },
    {
        title: "About AC Community",
        description: "Learn about the AC Community creators",
        url: "#",
        type: "About",
        action: "toggleAboutModal();"
    }
];

function performSearch(query) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    if (query.trim() === '') {
        resultsContainer.style.display = 'none';
        return;
    }

    const lowerQuery = query.toLowerCase();
    const filteredResults = searchData.filter(item =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery)
    );

    if (filteredResults.length > 0) {
        filteredResults.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                <h4>${result.title}</h4>
                <p>${result.description} • ${result.type}</p>
            `;

            resultItem.addEventListener('click', () => {
                if (result.action) {
                    eval(result.action);
                } else {
                    window.location.href = result.url;
                }
                resultsContainer.style.display = 'none';
                document.getElementById('searchInput').value = '';
            });

            resultsContainer.appendChild(resultItem);
        });
    } else {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.textContent = 'No results found';
        resultsContainer.appendChild(noResults);
    }

    resultsContainer.style.display = 'block';
}

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', (e) => {
    performSearch(e.target.value);
});

searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim() !== '') {
        performSearch(searchInput.value);
    }
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
        searchResults.style.display = 'none';
    }
});

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        const firstResult = searchResults.querySelector('.search-result-item');
        if (firstResult) firstResult.focus();
    }
});
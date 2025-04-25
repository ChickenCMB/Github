document.getElementById("currentYear").textContent = new Date().getFullYear();

const searchInput = document.querySelector('.search-input');
const searchResults = document.querySelector('.search-results');

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

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  searchResults.innerHTML = '';

  if (query.length === 0) {
    searchResults.style.display = 'none';
    return;
  }

  const filtered = searchData.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query) ||
    item.type.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    searchResults.innerHTML = `<div class="no-results">No results found</div>`;
  } else {
    filtered.forEach(item => {
      const button = document.createElement('button');
      button.className = 'search-result-button';
      button.innerHTML = `
        <div class="search-result-info">
          <h4>${item.title}</h4>
          <p>${item.description}</p>
        </div>
      `;

      if (item.action) {
        button.setAttribute('onclick', item.action);
      } else {
        button.onclick = () => window.location.href = item.url;
      }

      searchResults.appendChild(button);
    });
  }

  searchResults.style.display = 'block';
});

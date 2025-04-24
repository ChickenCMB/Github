document.addEventListener("DOMContentLoaded", () => { 
  // Modal and Image Modal Logic
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const overlay = document.getElementById("modalOverlay");
  const closeBtn = document.getElementById("closeModal");

  document.querySelectorAll(".custom-button").forEach(button => {
    const action = button.dataset.action;
    button.addEventListener("click", () => {
      if (action === "modal") {
        const bgImage = getComputedStyle(button).backgroundImage;
        const match = bgImage.match(/^url\("?(.+?)"?\)$/);
        const imgUrl = match ? match[1] : null;

        if (imgUrl) {
          modalImg.src = imgUrl;
          modal.style.display = "flex";
          setTimeout(() => {
            modal.classList.add("show");
          }, 10);
        }
      } else if (action === "link") {
        const url = button.dataset.link;
        if (url) {
          window.open(url, "_blank");
        }
      }
    });
  });

  // Close Modal Logic
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay || e.target === closeBtn) {
      modal.classList.remove("show");
      setTimeout(() => {
        modal.style.display = "none";
        modalImg.src = "";
      }, 300);
    }
  });

  // Handling Reload and URL Parameters (v, i)
  const alreadyReloaded = sessionStorage.getItem("alreadyReloaded");

  if (!alreadyReloaded) {
    sessionStorage.setItem("alreadyReloaded", "true");

    const url = new URL(window.location.href);
    if (!url.searchParams.has("v")) {
      url.searchParams.set("v", Date.now());
      window.location.replace(url.toString());
    }
  } else {
    const url = new URL(window.location.href);

    // Clean up URL by removing parameters (v, i)
    if (url.searchParams.has("v")) {
      url.searchParams.delete("v");
      window.history.replaceState({}, document.title, url.toString());
    }

    if (url.searchParams.has("i")) {
      url.searchParams.delete("i");
      window.history.replaceState({}, document.title, url.toString());
    }
  }
});

function toggleMode() {
  const body = document.body;
  const icon = document.getElementById("modeIcon");
  const text = document.getElementById("modeText");
  const isDark = body.classList.contains("dark");
  body.classList.toggle("dark", !isDark);
  body.classList.toggle("light", isDark);
  localStorage.setItem("theme", isDark ? "light" : "dark");
  icon.textContent = isDark ? "☀️" : "🌙";
  text.textContent = isDark ? "Light Mode" : "Dark Mode";
}

// Apply saved theme or default to dark
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.body.classList.add(savedTheme);
  document.getElementById("modeIcon").textContent = savedTheme === "dark" ? "🌙" : "☀️";
  document.getElementById("modeText").textContent = savedTheme === "dark" ? "Dark Mode" : "Light Mode";
  
  // Set up search input
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  
  searchInput.addEventListener('input', (e) => {
    performSearch(e.target.value);
  });
  
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch(e.target.value);
    }
  });
  
  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim() !== '') {
      performSearch(searchInput.value);
    }
  });
  
  // Close search results when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
      searchResults.style.display = 'none';
    }
  });
});

// Close sidebar when clicking outside
document.addEventListener('click', function(event) {
  const sidebar = document.getElementById('sidebar');
  const hamburger = document.querySelector('.hamburger');
  if (sidebar.classList.contains('open') && 
      !sidebar.contains(event.target) && 
      event.target !== hamburger) {
    sidebar.classList.remove('open');
  }
});

// Sidebar
function setupSidebar() {
  const sidebar = document.getElementById('sidebar');
  const hamburger = document.querySelector('.hamburger');
  
  function toggleSidebar() {
    sidebar.classList.toggle("open");
  }
  
  hamburger.addEventListener('click', toggleSidebar);
  
  // Close when clicking outside
  document.addEventListener('click', (event) => {
    if (sidebar.classList.contains('open') && 
        !sidebar.contains(event.target) && 
        event.target !== hamburger) {
      sidebar.classList.remove('open');
    }
  });
}
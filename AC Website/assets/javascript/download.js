document.getElementById("currentYear").textContent = new Date().getFullYear();

const mediaItems = document.querySelectorAll('.media-item');
let currentMediaIndex = 0;

function initMediaIndicators() {
  const indicatorsContainer = document.getElementById('mediaIndicators');
  indicatorsContainer.innerHTML = '';
  
  mediaItems.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.className = `nav-indicator ${index === currentMediaIndex ? 'active' : ''}`;
    indicator.onclick = () => showMedia(index);
    indicatorsContainer.appendChild(indicator);
  });
}

function showMedia(index) {
  if (index < 0) index = mediaItems.length - 1;
  if (index >= mediaItems.length) index = 0;
  
  mediaItems[currentMediaIndex].classList.remove('active');
  mediaItems[currentMediaIndex].classList.add('hidden');
  
  currentMediaIndex = index;
  
  mediaItems[currentMediaIndex].classList.remove('hidden');
  setTimeout(() => {
    mediaItems[currentMediaIndex].classList.add('active');
  }, 10);
  
  updateIndicators();
}

function updateIndicators() {
  const indicators = document.querySelectorAll('.nav-indicator');
  indicators.forEach((indicator, index) => {
    if (index === currentMediaIndex) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
  });
}

function nextMedia() {
  showMedia(currentMediaIndex + 1);
}

function prevMedia() {
  showMedia(currentMediaIndex - 1);
}

window.onload = function() {
  initMediaIndicators();
};

function openModal(src) {
  const modal = document.getElementById("imageMedia");
  const modalImg = document.getElementById("mediaImage");
  
  modalImg.src = src;
  modal.style.display = "block";
  
  setTimeout(() => {
    modal.classList.add("show");
  }, 10);
}

function closeModal() {
  const modal = document.getElementById("imageMedia");
  modal.classList.remove("show");
  
  setTimeout(() => {
    modal.style.display = "none";
    document.getElementById("mediaImage").src = "";
  }, 300);
}

window.onclick = function(event) {
  const modal = document.getElementById("imageMedia");
  if (event.target == modal) {
    closeModal();
  }
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowRight') {
    nextMedia();
  } else if (event.key === 'ArrowLeft') {
    prevMedia();
  } else if (event.key === 'Escape') {
    closeModal();
  }
});
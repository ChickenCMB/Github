const preloader = `
  <div id="loading-screen" class="minecraft-3d-loading">
    <div class="loading-container">
      <div class="minecraft-block">
        <div class="block-face front" style="background-image: url('https://cdn.jsdelivr.net/gh/ChickenCMB/Github@main/AC%20Website/assets/loading/1.png')"></div>
        <div class="block-face back" style="background-image: url('https://cdn.jsdelivr.net/gh/ChickenCMB/Github@main/AC%20Website/assets/loading/2.png')"></div>
        <div class="block-face right" style="background-image: url('https://cdn.jsdelivr.net/gh/ChickenCMB/Github@main/AC%20Website/assets/loading/3.png')"></div>
        <div class="block-face left" style="background-image: url('https://cdn.jsdelivr.net/gh/ChickenCMB/Github@main/AC%20Website/assets/loading/4.png')"></div>
        <div class="block-face top" style="background-image: url('https://cdn.jsdelivr.net/gh/ChickenCMB/Github@main/AC%20Website/assets/loading/5.png')"></div>
        <div class="block-face bottom" style="background-image: url('https://cdn.jsdelivr.net/gh/ChickenCMB/Github@main/AC%20Website/assets/loading/6.png')"></div>
      </div>
      <div class="loading-text">
        <span>L</span><span>o</span><span>a</span><span>d</span><span>i</span><span>n</span><span>g</span>
        <span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
      </div>
    </div>
  </div>
`;

document.addEventListener('DOMContentLoaded', function () {
  document.body.insertAdjacentHTML('afterbegin', preloader);
  const loadingScreen = document.getElementById('loading-screen');

  loadingScreen.style.display = 'none';

  const navLinks = document.querySelectorAll('a[data-href]:not([target="_blank"]), a[href]:not([target="_blank"])');
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const destination = this.getAttribute('data-href') || this.getAttribute('href');
      if (!destination || window.location.href.includes(destination)) return;

      e.preventDefault();
      sessionStorage.setItem('fromLink', 'true');
      loadingScreen.style.display = 'flex';

      setTimeout(() => {
        window.location.href = destination;
      }, 600);
    });
  });

  window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
      loadingScreen.style.display = 'flex';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 600);
    }
  });

  window.addEventListener('load', function () {
    const fromLink = sessionStorage.getItem('fromLink');
    if (fromLink) {
      sessionStorage.removeItem('fromLink');
      return;
    }

    loadingScreen.style.display = 'flex';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 600);
  });
});

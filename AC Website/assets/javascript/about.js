document.getElementById("currentYear").textContent = new Date().getFullYear();

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("open");
}

function toggleAboutModal() {
  document.getElementById("aboutModal").classList.toggle("show");
}
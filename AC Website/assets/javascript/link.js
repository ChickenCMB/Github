document.addEventListener('DOMContentLoaded', function () {
  const mapCards = document.querySelectorAll('.map-card');

  mapCards.forEach(card => {
    card.addEventListener('click', function (e) {

      const link = card.getAttribute('data-link');
      if (link) {
        window.location.href = link;
      }
    });

    card.style.cursor = 'pointer';
    card.style.transition = 'transform 0.2s ease';

    card.addEventListener('mouseenter', function () {
      card.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = 'translateY(0)';
    });
  });
});
(() => {
  const slides = [...document.querySelectorAll('.slide')];
  const previous = document.getElementById('previous');
  const next = document.getElementById('next');
  const status = document.getElementById('status');
  const progress = document.getElementById('progress');
  let current = 0;

  function showSlide() {
    const index = slides.findIndex(slide => '#' + slide.id === location.hash);
    current = index < 0 ? 0 : index;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    previous.disabled = current === 0;
    next.disabled = current === slides.length - 1;
    status.textContent = `Slide ${current + 1} of ${slides.length}: ${slides[current].querySelector('h1, h2').textContent}`;
    progress.style.width = `${(current + 1) / slides.length * 100}%`;
    window.scrollTo(0, 0);
  }

  function navigate(index) {
    const target = Math.max(0, Math.min(slides.length - 1, index));
    if (target !== current) location.hash = slides[target].id;
  }

  previous.addEventListener('click', () => navigate(current - 1));
  next.addEventListener('click', () => navigate(current + 1));
  window.addEventListener('hashchange', showSlide);
  window.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey ||
        /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName) || event.target.isContentEditable) return;
    if (event.key === 'ArrowRight' || event.key === 'PageDown') { event.preventDefault(); navigate(current + 1); }
    if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); navigate(current - 1); }
    if (event.key === 'Home') { event.preventDefault(); navigate(0); }
    if (event.key === 'End') { event.preventDefault(); navigate(slides.length - 1); }
  });
  showSlide();
  document.querySelector('.controls').hidden = false;
})();

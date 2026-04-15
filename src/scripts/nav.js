(function () {
  function initSideNav() {
    const toggle = document.getElementById('nav-toggle');
    const overlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.side-nav-link');

    if (!toggle || !overlay) {
      return;
    }

    function setNavState(open) {
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      overlay.setAttribute('aria-hidden', open ? 'false' : 'true');
    }

    toggle.addEventListener('click', () => {
      setNavState(!document.body.classList.contains('nav-open'));
    });

    overlay.addEventListener('click', () => setNavState(false));
    navLinks.forEach((link) => link.addEventListener('click', () => setNavState(false)));

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        setNavState(false);
      }
    });
  }

  window.initSideNav = initSideNav;
  initSideNav();
})();

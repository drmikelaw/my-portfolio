/* ============================================================
   Dr. Mike Law Portfolio — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  // ---------- Navigation scroll effect ----------
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Mobile menu toggle ----------
  const toggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.toggle('open');
      navLinks.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target)) {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
      }
    });
  }


  // ---------- Netlify contact form ----------
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('[type="submit"]');
      const successEl = document.getElementById('form-success');
      const originalText = btn.textContent;

      btn.disabled = true;
      btn.textContent = 'Sending…';

      try {
        const data = new FormData(contactForm);
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(data).toString(),
        });

        if (response.ok) {
          contactForm.reset();
          if (successEl) {
            successEl.style.display = 'block';
            successEl.focus();
          }
        } else {
          throw new Error('Network response was not ok');
        }
      } catch {
        alert('There was an error submitting the form. Please try emailing directly at mlaw@gsu.edu.');
      } finally {
        btn.disabled = false;
        btn.textContent = originalText;
      }
    });
  }

  // ---------- Fade-in on scroll ----------
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

})();

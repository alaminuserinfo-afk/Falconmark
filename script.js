/* ============================================
   FALCONMARK — Interactive Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // -------- Navbar Scroll Effect --------
  const navbar = document.getElementById('navbar');

  const handleNavScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll);

  // -------- Mobile Hamburger --------
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // -------- About Modal --------
  const aboutModal = document.getElementById('aboutModal');
  const aboutClose = document.getElementById('aboutClose');

  const openAbout = () => {
    aboutModal.classList.add('active');
    document.body.classList.add('modal-open');
  };

  const closeAbout = () => {
    aboutModal.classList.remove('active');
    document.body.classList.remove('modal-open');
  };

  // Open modal when any "About" link is clicked
  document.querySelectorAll('a[href="#about"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openAbout();
    });
  });

  // Close button
  aboutClose.addEventListener('click', closeAbout);

  // Click outside modal to close
  aboutModal.addEventListener('click', (e) => {
    if (e.target === aboutModal) {
      closeAbout();
    }
  });

  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && aboutModal.classList.contains('active')) {
      closeAbout();
    }
  });

  // -------- Scroll Reveal Animation --------
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // -------- Counter Animation --------
  const counters = document.querySelectorAll('.counter');
  const counterAnimated = new Set();

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const startTime = performance.now();

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      el.textContent = Math.floor(easedProgress * target);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    };

    requestAnimationFrame(update);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counterAnimated.has(entry.target)) {
        counterAnimated.add(entry.target);
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // -------- Smooth Scroll for Nav Links --------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#' || targetId === '#about') return;

      e.preventDefault();
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        const offset = navbar.offsetHeight + 16;
        const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top,
          behavior: 'smooth'
        });
      }
    });
  });

  // -------- Active Nav Link Highlighting --------
  const sections = document.querySelectorAll('section[id]');

  const highlightNav = () => {
    const scrollPos = window.scrollY + navbar.offsetHeight + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);

      if (link && !link.classList.contains('nav-cta')) {
        if (scrollPos >= top && scrollPos < top + height) {
          link.style.color = 'var(--white)';
        } else {
          link.style.color = '';
        }
      }
    });
  };

  window.addEventListener('scroll', highlightNav);

  // -------- Contact Form Handling (Google Sheets Integration) --------
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  // Endpoints saved:
  // Option A: SheetMonkey (Active)
  const SHEETMONKEY_URL = 'https://api.sheetmonkey.io/form/wdTwaMpPXuqxvTUzJv1gfz';

  // Option B: Google Apps Script (Active — 100% free forever & unlimited)
  // Deployment ID: AKfycbyWOAfd1FxZ-OZhbBTc4MgMP9rUKIAwc5iLDGWzjcQMHZMy0vGm88-LDa1U89UgEvTyQA
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyWOAfd1FxZ-OZhbBTc4MgMP9rUKIAwc5iLDGWzjcQMHZMy0vGm88-LDa1U89UgEvTyQA/exec';

  // Active endpoint in use:
  const FORM_ENDPOINT = GOOGLE_SCRIPT_URL;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Visual feedback - Loading state
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>
      Sending...
    `;
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    try {
      const formData = new FormData(form);

      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: formData,
        mode: FORM_ENDPOINT === GOOGLE_SCRIPT_URL ? 'no-cors' : 'cors'
      });

      if (response.ok || response.type === 'opaque' || response.status === 200 || response.status === 201) {
        // Success feedback
        submitBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Message Sent!
        `;
        submitBtn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
        submitBtn.style.opacity = '1';
        form.reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      submitBtn.innerHTML = `⚠️ Failed. Try again`;
      submitBtn.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
      submitBtn.style.opacity = '1';
    } finally {
      // Restore button after 4 seconds
      setTimeout(() => {
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        submitBtn.style.opacity = '';
      }, 4000);
    }
  });

  // -------- Parallax on hero (subtle) --------
  const heroBg = document.querySelector('.hero-bg img');

  window.addEventListener('scroll', () => {
    if (heroBg && window.scrollY < window.innerHeight) {
      const offset = window.scrollY * 0.3;
      heroBg.style.transform = `translateY(${offset}px) scale(1.05)`;
    }
  });

  // -------- Add spin keyframe dynamically --------
  const style = document.createElement('style');
  style.textContent = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
  document.head.appendChild(style);

});

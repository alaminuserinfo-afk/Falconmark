document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('navbar');
  const burger = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');

  // Header turns solid after scrolling
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40 || nav.dataset.solid === '1');
  nav.dataset.solid = nav.classList.contains('scrolled') ? '1' : '0';
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  const setMenu = (open) => {
    links.classList.toggle('open', open);
    nav.classList.toggle('nav-open', open);
    burger.setAttribute('aria-expanded', String(open));
  };
  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    setMenu(!links.classList.contains('open'));
  });
  links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('click', (e) => {
    if (links.classList.contains('open') && !links.contains(e.target) && !burger.contains(e.target)) {
      setMenu(false);
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && links.classList.contains('open')) {
      setMenu(false);
    }
  });

  // 3D Hero Parallax Interaction (Desktop only, event-driven to preserve mobile performance)
  const heroScene = document.getElementById('hero3DScene');
  const stage = document.getElementById('stage3D');
  const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (heroScene && stage && hasMouse) {
    let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0;
    let isInteracting = false;
    let rafId = null;

    const render = () => {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      stage.style.transform = `rotateX(${currentY + 6}deg) rotateY(${currentX}deg)`;

      const isSettled = !isInteracting && Math.abs(mouseX - currentX) < 0.05 && Math.abs(mouseY - currentY) < 0.05;
      if (!isSettled) {
        rafId = requestAnimationFrame(render);
      } else {
        stage.style.animationPlayState = 'running';
        stage.style.transform = '';
        rafId = null;
      }
    };

    const startAnimation = () => {
      stage.style.animationPlayState = 'paused';
      if (!rafId) rafId = requestAnimationFrame(render);
    };

    heroScene.addEventListener('mousemove', (e) => {
      isInteracting = true;
      const rect = heroScene.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = Math.max(-20, Math.min(20, x * 26));
      mouseY = Math.max(-16, Math.min(16, -y * 20));
      startAnimation();
    });

    heroScene.addEventListener('mouseleave', () => {
      isInteracting = false;
      mouseX = 0;
      mouseY = 0;
      startAnimation();
    });
  }

  // Audit form (audit.html): posts to the existing Google Apps Script endpoint
  const ENDPOINT = 'https://script.google.com/macros/s/AKfycbyWOAfd1FxZ-OZhbBTc4MgMP9rUKIAwc5iLDGWzjcQMHZMy0vGm88-LDa1U89UgEvTyQA/exec';
  const form = document.getElementById('auditForm');
  if (!form) return;
  const btn = document.getElementById('submitBtn');
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (form.company.value) return; // honeypot: bots fill this hidden field
    const label = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending...';
    status.textContent = '';
    status.className = '';
    // The sheet script reads name, email, phone, service and message, so the extra answers go into message.
    const d = new FormData(form);
    const out = new FormData();
    ['Created', 'name', 'email', 'phone', 'service'].forEach((k) => out.append(k, d.get(k) || ''));
    out.append('message', ['Website: ' + d.get('website'), 'Monthly ad budget: ' + d.get('budget'), 'Goal: ' + d.get('goal')].join('\n'));
    try {
      await fetch(ENDPOINT, { method: 'POST', body: out, mode: 'no-cors' });
      window.location.href = 'thank-you.html';
    } catch (err) {
      status.textContent = 'Could not send. Please email me directly instead.';
      status.className = 'err';
      btn.disabled = false;
      btn.textContent = label;
    }
  });
});

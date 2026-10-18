// ============================================
// UI ANIMATIONS & INTERACTIONS ONLY
// (Semua data produk murni ada di file HTML)
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  initScrollAnimations();
  initCardTiltAnimations();
  initCategoryFilterAnimation();
  initHeaderScroll();
  initCartAnimations();
  initCartDrawer();
  initMobileMenu();
  initContactForm();
});

// ── 1. Toast Notification Animation ──
function showToast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  // Trigger entrance animation
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  // Auto-remove with exit animation
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 2200);
}

// ── 2. Scroll Reveal Animations (Intersection Observer) ──
function initScrollAnimations() {
  const animElements = document.querySelectorAll(
    ".product-card, .pillar-card, .about-visual-card, .badge-item, .info-card"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  animElements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(32px)";
    el.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${(index % 3) * 0.1
      }s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${(index % 3) * 0.1}s`;
    observer.observe(el);
  });
}

// ── 3. Interactive 3D Card Hover / Tilt Animation ──
function initCardTiltAnimations() {
  const cards = document.querySelectorAll(".product-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(
        2
      )}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
      card.style.transition = "transform 0.4s ease";
    });

    card.addEventListener("mouseenter", () => {
      card.style.transition = "transform 0.1s ease-out";
    });
  });
}

// ── 4. Cart UI Feedback & Counter Pulse Animation ──
function initCartAnimations() {
  // If cart.js is loaded, it manages badge and storage
  if (typeof updateCartUI === "function") {
    updateCartUI();
  }
}

// ── 5. Cart Drawer Open / Close Animation ──
function initCartDrawer() {
  const openBtn = document.getElementById("cartBtn");
  const closeBtn = document.getElementById("closeCart");
  const overlay = document.getElementById("cartOverlay");

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      if (typeof openCartDrawer === "function") {
        openCartDrawer();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      if (typeof closeCartDrawer === "function") {
        closeCartDrawer();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener("click", () => {
      if (typeof closeCartDrawer === "function") {
        closeCartDrawer();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && typeof closeCartDrawer === "function") {
      closeCartDrawer();
    }
  });
}

// ── 6. Header Scroll & Nav Active Highlight Animation ──
function initHeaderScroll() {
  const header = document.getElementById("siteHeader");
  const sections = ["hero", "shop", "about", "contact"];

  function handleScroll() {
    if (window.scrollY > 40) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }

    const scrollPos = window.scrollY + 140;
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el && el.offsetTop <= scrollPos) {
        document.querySelectorAll(".nav-link").forEach((link) => {
          const href = link.getAttribute("href");
          const isMatch =
            (sections[i] === "hero" && href === "#") || href === `#${sections[i]}`;
          link.classList.toggle("active", isMatch);
        });
        break;
      }
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
}

// ── 7. Mobile Menu Toggle Animation ──
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobileToggle");
  const nav = document.getElementById("navMenu");

  if (toggleBtn && nav) {
    toggleBtn.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      nav?.classList.remove("open");
    });
  });
}

// ── 9. Category Filter UI Animation ──
function initCategoryFilterAnimation() {
  const filterBtns = document.querySelectorAll(".category-btn");
  const cards = document.querySelectorAll(".product-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("active")) return;

      // Update active state
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Button click micro-bounce
      btn.style.transform = "scale(0.93)";
      setTimeout(() => (btn.style.transform = ""), 150);

      const targetFilter = btn.dataset.filter;
      let visibleIdx = 0;

      cards.forEach((card) => {
        const category = card.dataset.category;
        const matches = targetFilter === "all" || category === targetFilter;

        if (matches) {
          card.classList.remove("hidden");
          card.classList.remove("filter-anim-out");

          // Reset initial frame for smooth staggered entrance
          card.style.opacity = "0";
          card.style.transform = "translateY(24px) scale(0.96)";

          setTimeout(() => {
            const delay = visibleIdx * 0.05;
            card.style.transition = `opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`;
            card.style.opacity = "1";
            card.style.transform = "translateY(0) scale(1)";
            visibleIdx++;
          }, 20);
        } else {
          card.classList.add("filter-anim-out");
          card.style.opacity = "0";
          card.style.transform = "translateY(16px) scale(0.92)";

          setTimeout(() => {
            card.classList.add("hidden");
            card.classList.remove("filter-anim-out");
          }, 220);
        }
      });
    });
  });
}

// ── 10. Contact Form Submit Feedback Animation ──
function initContactForm() {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitContact");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (submitBtn) {
        submitBtn.style.transform = "scale(0.96)";
        setTimeout(() => (submitBtn.style.transform = "scale(1)"), 150);
      }

      showToast("✓ Message sent! We'll get back to you soon.");
      form.reset();
    });
  }
}

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const header = document.querySelector(".site-header");
const navList = document.querySelector(".nav-list");

if (navToggle && header) {
  navToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when a link is clicked (mobile)
  navList?.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLAnchorElement) {
      header.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Smooth scroll for custom buttons
document.querySelectorAll("[data-scroll-target]").forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const targetSelector = btn.getAttribute("data-scroll-target");
    if (!targetSelector) return;
    const target = document.querySelector(targetSelector);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Reveal on scroll + active nav link
const revealElements = document.querySelectorAll(
  ".section-heading, .card, .menu-card, .location-card, .gallery-card, .split-text, .split-highlight, .reserve-copy, .reserve-form"
);
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-list a[href^='#']");

if ("IntersectionObserver" in window) {
  // Content reveal
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-reveal", "visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealElements.forEach((el) => {
    el.setAttribute("data-reveal", "");
    revealObserver.observe(el);
  });

  // Nav active state by section in view
  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("id");
          if (!id) return;

          navLinks.forEach((link) => {
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("nav-link-active");
            } else {
              link.classList.remove("nav-link-active");
            }
          });
        });
      },
      {
        threshold: 0.5,
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }
}

// Simple fake submission handler for the reservation form
const form = document.querySelector(".reserve-form");

if (form instanceof HTMLFormElement) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitButton = form.querySelector("button[type='submit']");
    if (!(submitButton instanceof HTMLButtonElement)) return;

    const originalText = submitButton.textContent || "";
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    setTimeout(() => {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
      form.reset();
      alert(
        "Thank you for your reservation request. Our team will contact you shortly to confirm your booking."
      );
    }, 900);
  });
}


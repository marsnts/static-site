const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav-link")];
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach((section) => observer.observe(section));
}

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((item) => item.classList.toggle("active", item === button));
    document.querySelectorAll(".project-card").forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = String(form.get("name")).trim();
  const email = String(form.get("email")).trim();
  const message = String(form.get("message")).trim();
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`Hi Mar,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`);
  window.location.href = `mailto:YOUR_EMAIL@example.com?subject=${subject}&body=${body}`;
  document.querySelector("#form-note").textContent = "Your email app should open with a prepared draft. Replace YOUR_EMAIL@example.com with your real email address before publishing.";
});
(function () {
    const root = document.documentElement;
    const button = document.getElementById("theme-toggle");

    if (!button) {
        console.warn("Theme toggle button not found.");
        return;
    }

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    let savedTheme = null;

    try {
        savedTheme = localStorage.getItem("theme");
    } catch (error) {
        console.warn("localStorage unavailable.");
    }

    const hasUserPreference =
        savedTheme === "light" || savedTheme === "dark";

    function applyTheme(theme) {
        const isDark = theme === "dark";

        root.dataset.theme = theme;
        button.setAttribute("aria-pressed", String(isDark));
        button.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );
        button.title = isDark
            ? "Switch to light mode"
            : "Switch to dark mode";
    }

    applyTheme(
        hasUserPreference
            ? savedTheme
            : systemTheme.matches
                ? "dark"
                : "light"
    );

    button.addEventListener("click", function () {
        const nextTheme =
            root.dataset.theme === "dark" ? "light" : "dark";

        applyTheme(nextTheme);

        try {
            localStorage.setItem("theme", nextTheme);
        } catch (error) {
            console.warn("Could not save theme preference.");
        }
    });

    systemTheme.addEventListener("change", function (event) {
        if (!hasUserPreference) {
            applyTheme(event.matches ? "dark" : "light");
        }
    });
})();
/**
 * This file contains custom JavaScript for featrures such as
 * smooth scrolling when item is clicked in the nav bar, mobile navbar button toggling and scrollspy.
 */
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for internal links
  document
    .querySelectorAll('a.js-scroll-trigger[href^="#"]')
    .forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href").substring(1);
        const target =
          document.getElementById(targetId) ||
          document.getElementsByName(targetId)[0];

        if (target) {
          e.preventDefault();
          window.scrollTo({
            top: target.offsetTop - 60, // adjust for fixed navbar
            behavior: "smooth",
          });
        }

        // Close mobile nav after clicking a link
        const navCollapse = document.getElementById("navbarResponsive");
        if (navCollapse && navCollapse.classList.contains("show")) {
          navCollapse.classList.remove("show");
        }

        // Also update aria-expanded on the toggler
        const toggler = document.querySelector(".navbar-toggler");
        if (toggler) {
          toggler.classList.add("collapsed");
          toggler.setAttribute("aria-expanded", "false");
        }
      });
    });

  // Mobile navbar toggler (open/close)
  const toggler = document.querySelector(".navbar-toggler");
  const navCollapse = document.getElementById("navbarResponsive");

  if (toggler && navCollapse) {
    toggler.addEventListener("click", () => {
      const isShown = navCollapse.classList.toggle("show");
      toggler.classList.toggle("collapsed", !isShown);
      toggler.setAttribute("aria-expanded", isShown ? "true" : "false");
    });
  }

  // Simple scrollspy for active nav link
  // highlights the correct navbar link as you scroll past each section.
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('#mainNav a.nav-link[href^="#"]');

  window.addEventListener("scroll", () => {
    const scrollPos =
      document.documentElement.scrollTop || document.body.scrollTop;

    sections.forEach((section) => {
      if (
        scrollPos >= section.offsetTop - 60 &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        const id = section.id;
        navLinks.forEach((link) => link.classList.remove("active"));
        const activeLink = document.querySelector(
          `#mainNav a.nav-link[href="#${id}"]`
        );
        if (activeLink) activeLink.classList.add("active");
      }
    });
  });
});

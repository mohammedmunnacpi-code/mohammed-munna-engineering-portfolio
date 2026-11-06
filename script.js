(() => {
  const languageButton = document.getElementById("language-toggle");
  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const photoUpload = document.getElementById("photo-upload");
  const photoPreview = document.getElementById("profile-preview");
  let currentLanguage = "en";

  function setLanguage(language) {
    currentLanguage = language;
    document.documentElement.lang = language;
    document.querySelectorAll("[data-en][data-bn]").forEach((element) => {
      element.textContent = element.dataset[language];
    });
    languageButton.textContent = language === "en" ? "বাংলা" : "English";
    languageButton.setAttribute("aria-label", language === "en" ? "Switch to Bengali" : "Switch to English");
  }

  languageButton.addEventListener("click", () => setLanguage(currentLanguage === "en" ? "bn" : "en"));
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navLinks.classList.toggle("is-open", !isOpen);
  });
  navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }));

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  photoUpload.addEventListener("change", (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      photoPreview.style.backgroundImage = `url("${reader.result}")`;
      const initials = photoPreview.querySelector(".avatar-initials");
      if (initials) initials.hidden = true;
    });
    reader.readAsDataURL(file);
  });
  document.getElementById("year").textContent = new Date().getFullYear();
})();

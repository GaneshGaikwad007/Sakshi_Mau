(function () {
  const config = window.SAKSHI_SITE || {};
  const memoryStore = {};
  const storage = {
    getItem(key) {
      try { return window.sessionStorage.getItem(key); }
      catch (error) { return memoryStore[key] || null; }
    },
    setItem(key, value) {
      try { window.sessionStorage.setItem(key, value); }
      catch (error) { memoryStore[key] = value; }
    },
    removeItem(key) {
      try { window.sessionStorage.removeItem(key); }
      catch (error) { delete memoryStore[key]; }
    }
  };
  const unlocked = storage.getItem(config.sessionKey) === "true";
  const isGate = document.body.dataset.page === "gate";

  if (!isGate && !unlocked) {
    window.location.href = "../index.html";
    return;
  }

  window.addEventListener("load", () => {
    document.body.classList.add("page-ready");
    setTimeout(() => document.querySelector(".loader")?.classList.add("hidden"), 650);
  });

  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      event.preventDefault();
      document.body.classList.remove("page-ready");
      setTimeout(() => { window.location.href = href; }, 260);
    });
  });

  const gateForm = document.querySelector("[data-gate-form]");
  if (gateForm) {
    const input = gateForm.querySelector("input");
    const error = gateForm.querySelector("[data-error]");
    const unlock = () => {
      const password = config.password || "1506";
      if (input.value.trim() === password) {
        storage.setItem(config.sessionKey, "true");
        gateForm.classList.add("unlocking");
        setTimeout(() => { window.location.assign("pages/home.html"); }, 700);
      } else {
        error.textContent = "Not this one. Try the date that matters most.";
        gateForm.classList.remove("shake");
        void gateForm.offsetWidth;
        gateForm.classList.add("shake");
      }
    };
    gateForm.addEventListener("submit", (event) => {
      event.preventDefault();
      unlock();
    });
    gateForm.querySelector("button")?.addEventListener("click", (event) => {
      event.preventDefault();
      unlock();
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        unlock();
      }
    });
  }

  document.querySelectorAll("[data-logout]").forEach((button) => {
    button.addEventListener("click", () => {
      storage.removeItem(config.sessionKey);
      window.location.href = "../index.html";
    });
  });

  const glow = document.querySelector(".cursor-glow");
  window.addEventListener("pointermove", (event) => {
    if (!glow) return;
    glow.style.setProperty("--x", `${event.clientX}px`);
    glow.style.setProperty("--y", `${event.clientY}px`);
  });

  const revealed = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.16 });
  revealed.forEach((item) => revealObserver.observe(item));

  const themeSections = document.querySelectorAll("[data-theme]");
  const themeObserver = new IntersectionObserver((entries) => {
    const active = entries.find((entry) => entry.isIntersecting);
    if (active) document.body.dataset.theme = active.target.dataset.theme;
  }, { rootMargin: "-35% 0px -35% 0px" });
  themeSections.forEach((section) => themeObserver.observe(section));

  const typing = document.querySelector("[data-type]");
  if (typing) {
    const text = typing.dataset.type;
    let index = 0;
    const write = () => {
      typing.textContent = text.slice(0, index);
      index += 1;
      if (index <= text.length) setTimeout(write, 55);
    };
    setTimeout(write, 700);
  }
})();

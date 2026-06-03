(function () {
  const config = window.SAKSHI_SITE || {};
  const rail = document.querySelector("[data-gallery]");
  const player = document.querySelector("[data-song-player]");
  const songTitle = document.querySelector("[data-song-title]");
  const songCredit = document.querySelector("[data-song-credit]");
  const creditLink = document.querySelector("[data-credit-link]");
  const muteToggle = document.querySelector("[data-mute-toggle]");
  if (!rail || !player) return;

  let muted = false;
  let currentIndex = -1;

  rail.innerHTML = config.gallery.map((item, index) => `
    <article class="photo-story reveal" data-photo-index="${index}" data-theme="${index % 2 ? "violet" : "rose"}">
      <div class="photo-frame">
        <img src="${item.image}" alt="Sakshi portrait ${index + 1}" loading="${index < 2 ? "eager" : "lazy"}">
        <div class="photo-overlay">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <h2>${item.title}</h2>
          <p>${item.compliment}</p>
        </div>
      </div>
    </article>
  `).join("");

  const cards = rail.querySelectorAll(".photo-story");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.16 });
  cards.forEach((card) => revealObserver.observe(card));

  const setSong = (index) => {
    if (index === currentIndex) return;
    currentIndex = index;
    const item = config.gallery[index];
    const separator = item.embedUrl.includes("?") ? "&" : "?";
    const muteParam = muted ? "mute=1" : "mute=0";
    player.src = `${item.embedUrl}${separator}${muteParam}`;
    songTitle.textContent = item.song;
    songCredit.textContent = item.credit;
    creditLink.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${item.song} ${item.credit}`)}`;
  };

  const activeObserver = new IntersectionObserver((entries) => {
    const mostVisible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (mostVisible) setSong(Number(mostVisible.target.dataset.photoIndex));
  }, { threshold: [0.45, 0.6, 0.75], rootMargin: "-18% 0px -18% 0px" });
  cards.forEach((card) => activeObserver.observe(card));
  setSong(0);

  muteToggle?.addEventListener("click", () => {
    muted = !muted;
    muteToggle.textContent = muted ? "Unmute" : "Mute";
    currentIndex = -1;
    setSong(Math.max(0, Number(document.querySelector(".photo-story.visible")?.dataset.photoIndex || 0)));
  });
})();

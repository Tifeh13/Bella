// Unique artwork titles by category
const categories = {
    rings: [
      { id: "ring-1", title: "Eternal Flame", category: "ring", img: "https://picsum.photos/600/600?random=101" },
      { id: "ring-2", title: "Whispering Dawn", category: "ring", img: "https://picsum.photos/600/600?random=102" },
      { id: "ring-3", title: "Circle of Grace", category: "ring", img: "https://picsum.photos/600/600?random=103" },
      { id: "ring-4", title: "Silent Promise", category: "ring", img: "https://picsum.photos/600/600?random=104" },
      { id: "ring-5", title: "Echo Jewel", category: "ring", img: "https://picsum.photos/600/600?random=105" },
      { id: "ring-6", title: "Twilight Charm", category: "ring", img: "https://picsum.photos/600/600?random=106" }
    ],
    necklaces: [
      { id: "necklace-1", title: "Ocean Whisper", category: "necklace", img: "https://picsum.photos/600/600?random=201" },
      { id: "necklace-2", title: "Golden Horizon", category: "necklace", img: "https://picsum.photos/600/600?random=202" },
      { id: "necklace-3", title: "Soul Threads", category: "necklace", img: "https://picsum.photos/600/600?random=203" },
      { id: "necklace-4", title: "Velvet Path", category: "necklace", img: "https://picsum.photos/600/600?random=204" },
      { id: "necklace-5", title: "Moonlit Drops", category: "necklace", img: "https://picsum.photos/600/600?random=205" },
      { id: "necklace-6", title: "Eclipse Glow", category: "necklace", img: "https://picsum.photos/600/600?random=206" }
    ],
    bracelets: [
      { id: "bracelet-1", title: "Starlit Bond", category: "bracelet", img: "https://picsum.photos/600/600?random=301" },
      { id: "bracelet-2", title: "River Flow", category: "bracelet", img: "https://picsum.photos/600/600?random=302" },
      { id: "bracelet-3", title: "Golden Drift", category: "bracelet", img: "https://picsum.photos/600/600?random=303" },
      { id: "bracelet-4", title: "Infinity Loop", category: "bracelet", img: "https://picsum.photos/600/600?random=304" },
      { id: "bracelet-5", title: "Mystic Charm", category: "bracelet", img: "https://picsum.photos/600/600?random=305" },
      { id: "bracelet-6", title: "Sunrise Path", category: "bracelet", img: "https://picsum.photos/600/600?random=306" }
    ],
    earrings: [
      { id: "earring-1", title: "Echo Drop", category: "earring", img: "https://picsum.photos/600/600?random=401" },
      { id: "earring-2", title: "Falling Light", category: "earring", img: "https://picsum.photos/600/600?random=402" },
      { id: "earring-3", title: "Silver Whisper", category: "earring", img: "https://picsum.photos/600/600?random=403" },
      { id: "earring-4", title: "Golden Drift", category: "earring", img: "https://picsum.photos/600/600?random=404" },
      { id: "earring-5", title: "Twilight Spark", category: "earring", img: "https://picsum.photos/600/600?random=405" },
      { id: "earring-6", title: "Celestial Glow", category: "earring", img: "https://picsum.photos/600/600?random=406" }
    ],
    watches: [
      { id: "watch-1", title: "Timeless Horizon", category: "watch", img: "https://picsum.photos/600/600?random=501" },
      { id: "watch-2", title: "Midnight Pulse", category: "watch", img: "https://picsum.photos/600/600?random=502" },
      { id: "watch-3", title: "Aurora Time", category: "watch", img: "https://picsum.photos/600/600?random=503" },
      { id: "watch-4", title: "Silent Rhythm", category: "watch", img: "https://picsum.photos/600/600?random=504" },
      { id: "watch-5", title: "Eternal Flow", category: "watch", img: "https://picsum.photos/600/600?random=505" },
      { id: "watch-6", title: "Solar Tide", category: "watch", img: "https://picsum.photos/600/600?random=506" }
    ]
  };
  
  // Flatten into one list
  const products = Object.values(categories).flat();
  
  // DOM references
  const productGrid = document.getElementById("productGrid");
  const searchToggle = document.getElementById("searchToggle");
  const searchInput = document.getElementById("searchInput");
  const modal = document.getElementById("previewModal");
  const modalImg = document.getElementById("modalImg");
  const modalCaption = document.getElementById("modalCaption");
  const modalClose = document.getElementById("modalClose");
  
  // Render grid
  function renderGrid(list = products) {
    if (!productGrid) return;
    productGrid.innerHTML = list
      .map(
        (p) => `
      <article class="card" data-id="${p.id}" data-category="${p.category}">
        <img src="${p.img}" alt="${p.title}" loading="lazy">
        <h3>${p.title}</h3>
      </article>
    `
      )
      .join("");
  }
  renderGrid();
  
  // Modal open
  productGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    const id = card.dataset.id;
    const p = products.find((x) => x.id === id);
    if (!p) return;
    modalImg.src = p.img;
    modalCaption.textContent = `${p.title} — ${capitalize(p.category)}`;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  });
  
  // Modal close
  modalClose.addEventListener("click", () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
    }
  });
  
  // Search toggle
  if (searchToggle && searchInput) {
    searchToggle.addEventListener("click", () => {
      searchInput.classList.toggle("show");
      if (searchInput.classList.contains("show")) searchInput.focus();
      else {
        searchInput.value = "";
        renderGrid();
      }
    });
  
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.trim().toLowerCase();
      if (!q) return renderGrid();
  
      const categoryKeywords = ["ring", "rings", "watch", "watches", "necklace", "necklaces", "earring", "earrings", "bracelet", "bracelets"];
      const asCategory = categoryKeywords.find((k) => q.includes(k));
      if (asCategory) {
        let cat = asCategory.replace(/s$/, "");
        const filtered = products.filter((p) => p.category === cat);
        renderGrid(filtered);
        return;
      }
  
      const filtered = products.filter(
        (p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
      renderGrid(filtered);
    });
  }
  
  // Helper
  function capitalize(s) {
    if (!s) return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  
  // Set footer year
  document.querySelectorAll("2020").forEach((span) => (span.textContent = new Date().getFullYear()));
  
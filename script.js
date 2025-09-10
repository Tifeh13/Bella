// Unique artwork titles by category (Canvas-style artworks)
const categories = {
  rings: [
    { id: "ring-1", title: "Golden Swirl", category: "ring", img: "https://picsum.photos/600/600?random=1101" },
    { id: "ring-2", title: "Sunlit Circle", category: "ring", img: "https://picsum.photos/600/600?random=1102" },
    { id: "ring-3", title: "Azure Loop", category: "ring", img: "https://picsum.photos/600/600?random=1103" },
    { id: "ring-4", title: "Abstract Ring", category: "ring", img: "https://picsum.photos/600/600?random=1104" },
    { id: "ring-5", title: "Canvas Echo", category: "ring", img: "https://picsum.photos/600/600?random=1105" },
    { id: "ring-6", title: "Twilight Loop", category: "ring", img: "https://picsum.photos/600/600?random=1106" }
  ],
  necklaces: [
    { id: "necklace-1", title: "Brushstroke Waves", category: "necklace", img: "https://picsum.photos/600/600?random=1201" },
    { id: "necklace-2", title: "Sunset Canvas", category: "necklace", img: "https://picsum.photos/600/600?random=1202" },
    { id: "necklace-3", title: "Twilight Threads", category: "necklace", img: "https://picsum.photos/600/600?random=1203" },
    { id: "necklace-4", title: "Golden Horizon", category: "necklace", img: "https://picsum.photos/600/600?random=1204" },
    { id: "necklace-5", title: "Ethereal Veil", category: "necklace", img: "https://picsum.photos/600/600?random=1205" },
    { id: "necklace-6", title: "Aurora Glow", category: "necklace", img: "https://picsum.photos/600/600?random=1206" }
  ],
  bracelets: [
    { id: "bracelet-1", title: "Ocean Ripple", category: "bracelet", img: "https://picsum.photos/600/600?random=1301" },
    { id: "bracelet-2", title: "Canvas Drift", category: "bracelet", img: "https://picsum.photos/600/600?random=1302" },
    { id: "bracelet-3", title: "Starry Line", category: "bracelet", img: "https://picsum.photos/600/600?random=1303" },
    { id: "bracelet-4", title: "Abstract Flow", category: "bracelet", img: "https://picsum.photos/600/600?random=1304" },
    { id: "bracelet-5", title: "Golden Swirl", category: "bracelet", img: "https://picsum.photos/600/600?random=1305" },
    { id: "bracelet-6", title: "Sunrise Path", category: "bracelet", img: "https://picsum.photos/600/600?random=1306" }
  ],
  earrings: [
    { id: "earring-1", title: "Canvas Drop", category: "earring", img: "https://picsum.photos/600/600?random=1401" },
    { id: "earring-2", title: "Light Streaks", category: "earring", img: "https://picsum.photos/600/600?random=1402" },
    { id: "earring-3", title: "Golden Brush", category: "earring", img: "https://picsum.photos/600/600?random=1403" },
    { id: "earring-4", title: "Abstract Echo", category: "earring", img: "https://picsum.photos/600/600?random=1404" },
    { id: "earring-5", title: "Twilight Spark", category: "earring", img: "https://picsum.photos/600/600?random=1405" },
    { id: "earring-6", title: "Aurora Glow", category: "earring", img: "https://picsum.photos/600/600?random=1406" }
  ],
  watches: [
    { id: "watch-1", title: "Canvas Horizon", category: "watch", img: "https://picsum.photos/600/600?random=1501" },
    { id: "watch-2", title: "Abstract Time", category: "watch", img: "https://picsum.photos/600/600?random=1502" },
    { id: "watch-3", title: "Twilight Pulse", category: "watch", img: "https://picsum.photos/600/600?random=1503" },
    { id: "watch-4", title: "Brushstroke Rhythm", category: "watch", img: "https://picsum.photos/600/600?random=1504" },
    { id: "watch-5", title: "Golden Flow", category: "watch", img: "https://picsum.photos/600/600?random=1505" },
    { id: "watch-6", title: "Solar Tide", category: "watch", img: "https://picsum.photos/600/600?random=1506" }
  ]
};

// Flatten into one list
const products = Object.values(categories).flat();

// DOM references
const productGrid = document.getElementById("productGrid");
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

// Search functionality (optional)
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) return renderGrid();
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

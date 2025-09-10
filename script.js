// Oil painting-themed artworks
const categories = {
  landscapes: [
    { id: "landscape-1", title: "Sunset Over the Sea", category: "landscape", img: "img/oil-painting1.jpg" },
    { id: "landscape-2", title: "Mountain Serenity", category: "landscape", img: "img/oil-painting2.jpg" },
    { id: "landscape-3", title: "Autumn Pathway", category: "landscape", img: "img/oil-painting3.jpg" },
    { id: "landscape-4", title: "Golden Fields", category: "landscape", img: "img/oil-painting4.jpg" },
    { id: "landscape-5", title: "Misty Morning", category: "landscape", img: "img/oil-painting5.jpg" },
    { id: "landscape-6", title: "Stormy Horizon", category: "landscape", img: "img/oil-painting6.jpg" }
  ],
  still_life: [
    { id: "still_life-1", title: "Vase of Lilies", category: "still_life", img: "img/oil-painting7.jpg" },
    { id: "still_life-2", title: "Fruit Basket", category: "still_life", img: "img/oil-painting8.jpg" },
    { id: "still_life-3", title: "Wine and Grapes", category: "still_life", img: "img/oil-painting9.jpg" },
    { id: "still_life-4", title: "Antique Clock", category: "still_life", img: "img/oil-painting10.jpg" },
    // { id: "still_life-5", title: "Silver Teapot", category: "still_life", img: "img/oil-painting11.jpg" },
    // { id: "still_life-6", title: "Old Books", category: "still_life", img: "img/oil-painting12.jpg" }
  ],
  // portraits: [
  //   { id: "portrait-1", title: "Lady in Blue", category: "portrait", img: "img/oil-painting13.jpg" },
  //   { id: "portrait-2", title: "Man with Hat", category: "portrait", img: "img/oil-painting14.jpg" },
  //   { id: "portrait-3", title: "Young Girl", category: "portrait", img: "img/oil-painting15.jpg" },
  //   { id: "portrait-4", title: "Old Fisherman", category: "portrait", img: "img/oil-painting16.jpg" },
  //   { id: "portrait-5", title: "Noblewoman", category: "portrait", img: "img/oil-painting17.jpg" },
  //   { id: "portrait-6", title: "Pensive Man", category: "portrait", img: "img/oil-painting18.jpg" }
  // ],
  // abstract: [
  //   { id: "abstract-1", title: "Colorful Chaos", category: "abstract", img: "img/oil-painting19.jpg" },
  //   { id: "abstract-2", title: "Geometric Forms", category: "abstract", img: "img/oil-painting20.jpg" }
  // ]
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

// Helper
function capitalize(s) {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

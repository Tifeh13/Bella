// Oil painting portrait projects
const categories = {
  portraits: [
    { id: "portrait-1", title: "Project 1", category: "portrait", img: "img/oil-painting1.jpg" },
    { id: "portrait-2", title: "Project 2", category: "portrait", img: "img/oil-painting2.jpg" },
    { id: "portrait-3", title: "Project 3", category: "portrait", img: "img/oil-painting3.jpg" },
    { id: "portrait-4", title: "Project 4", category: "portrait", img: "img/oil-painting4.jpg" },
    { id: "portrait-5", title: "Project 5", category: "portrait", img: "img/oil-painting5.jpg" },
    { id: "portrait-6", title: "Project 6", category: "portrait", img: "img/oil-painting6.jpg" },
    { id: "portrait-7", title: "Project 7", category: "portrait", img: "img/oil-painting7.jpg" },
    { id: "portrait-8", title: "Project 8", category: "portrait", img: "img/oil-painting8.jpg" },
    { id: "portrait-9", title: "Project 9", category: "portrait", img: "img/oil-painting9.jpg" },
    { id: "portrait-10", title: "Project 10", category: "portrait", img: "img/oil-painting10.jpg" }
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
  modalCaption.textContent = `${p.title}`;
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

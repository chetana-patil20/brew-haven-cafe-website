const MENU_ITEMS = [
  {
    name: "Blue Ocean Cooler",
    category: "coolers",
    highlight: true,
    badge: "Signature Favorite",
    badgeClass: "ocean",
    price: "₹140",
    description: "Zesty citrus, crisp mint, and sparkling blue curacao refreshment—our #1 most talked-about drink.",
    tags: ["Chilled", "Mocktail", "Best Seller"],
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Classic Golden French Fries",
    category: "bites",
    highlight: true,
    badge: "Crowd Favorite",
    badgeClass: "",
    price: "₹120",
    description: "Crispy, golden-fried potato strips seasoned to perfection and served hot with signature dips.",
    tags: ["Crispy", "Vegetarian", "Shareable"],
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Peri-Peri Loaded Fries",
    category: "bites",
    highlight: true,
    badge: "Spicy Kick",
    badgeClass: "",
    price: "₹160",
    description: "Crunchy fries tossed in fiery peri-peri spice and drizzled with creamy cheese & herb sauce.",
    tags: ["Spicy", "Cheesy"],
    image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Haven Signature Hazelnut Latte",
    category: "coffee",
    highlight: true,
    badge: "Barista Pick",
    badgeClass: "",
    price: "₹170",
    description: "Velvety steamed milk poured over rich roasted espresso with aromatic roasted hazelnut notes.",
    tags: ["Hot Brew", "Creamy"],
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Iced Caramel Macchiato",
    category: "coffee",
    highlight: false,
    badge: "Chilled Brew",
    badgeClass: "",
    price: "₹180",
    description: "Chilled espresso layered with cold milk, vanilla essence, and a generous caramel drizzle.",
    tags: ["Iced", "Sweet & Bold"],
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Belgian Chocolate Thick Shake",
    category: "coolers",
    highlight: false,
    badge: "Indulgent",
    badgeClass: "",
    price: "₹190",
    description: "Rich dark cocoa blended with creamy vanilla ice cream and topped with chocolate shavings.",
    tags: ["Thick Shake", "Dessert Drink"],
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Grilled Tandoori Paneer Sandwich",
    category: "bites",
    highlight: false,
    badge: "Filling Bite",
    badgeClass: "",
    price: "₹180",
    description: "Smoky marinated cottage cheese, crisp bell peppers, and mint mayo grilled in artisan bread.",
    tags: ["Vegetarian", "Hearty"],
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Classic Cappuccino",
    category: "coffee",
    highlight: false,
    badge: "Classic",
    badgeClass: "",
    price: "₹140",
    description: "Balanced double-shot espresso crowned with thick, velvety micro-foam.",
    tags: ["Hot", "Classic"],
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=700&q=80"
  }
];

const INSTAGRAM_URL = "https://www.instagram.com/brew_haven_cafe23?igsh=MTZoaW1mMHo4MTc3OQ%3D%3D";

document.addEventListener("DOMContentLoaded", () => {
  // Set current year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById("mobileToggle");
  const navLinks = document.getElementById("navLinks");
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => navLinks.classList.remove("active"));
    });
  }

  // Render Menu
  const menuGrid = document.getElementById("menuGrid");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const searchInput = document.getElementById("menuSearch");

  let currentCategory = "all";
  let currentQuery = "";

  function renderMenu() {
    if (!menuGrid) return;
    const filtered = MENU_ITEMS.filter(item => {
      const matchesCat =
        currentCategory === "all" ||
        (currentCategory === "highlights" && item.highlight) ||
        item.category === currentCategory;

      const q = currentQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q));

      return matchesCat && matchesQuery;
    });

    if (filtered.length === 0) {
      menuGrid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; padding: 32px; color: #5C4E45;">No menu items match "${currentQuery}". Try searching "Fries" or "Blue Ocean".</p>`;
      return;
    }

    menuGrid.innerHTML = filtered
      .map(
        item => `
      <article class="menu-card">
        <div class="menu-card-img">
          <img src="${item.image}" alt="${item.name}" loading="lazy" />
          <span class="menu-badge ${item.badgeClass}">${item.badge}</span>
        </div>
        <div class="menu-card-body">
          <div class="menu-card-header">
            <h3>${item.name}</h3>
            <span class="menu-price">${item.price}</span>
          </div>
          <p>${item.description}</p>
          <div class="menu-tags">
            ${item.tags.map(tag => `<span class="menu-tag">${tag}</span>`).join("")}
          </div>
        </div>
      </article>
    `
      )
      .join("");
  }

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.dataset.category;
      renderMenu();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", e => {
      currentQuery = e.target.value;
      renderMenu();
    });
  }

  renderMenu();

  // Toast helper
  const toastEl = document.getElementById("toast");
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    setTimeout(() => toastEl.classList.remove("show"), 3000);
  }

  // Copy Address Button
  document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const text = btn.dataset.copy;
      navigator.clipboard?.writeText(text).then(() => {
        showToast("Address copied to clipboard!");
      });
    });
  });

  // Reservation Modal Logic
  const reserveModal = document.getElementById("reserveModal");
  const openModalBtn = document.getElementById("openReserveModal");
  const closeModalBtn = document.getElementById("closeReserveModal");
  const visitDateInput = document.getElementById("visitDate");

  if (visitDateInput) {
    visitDateInput.valueAsDate = new Date();
  }

  function openModal() {
    if (!reserveModal) return;
    reserveModal.classList.add("open");
    reserveModal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    if (!reserveModal) return;
    reserveModal.classList.remove("open");
    reserveModal.setAttribute("aria-hidden", "true");
  }

  openModalBtn?.addEventListener("click", openModal);
  closeModalBtn?.addEventListener("click", closeModal);
  reserveModal?.addEventListener("click", e => {
    if (e.target === reserveModal) closeModal();
  });

  // Booking Form Submission -> Copies formatted DM & opens Instagram
  const bookingForm = document.getElementById("bookingForm");
  const bookingFeedback = document.getElementById("bookingFeedback");

  bookingForm?.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("guestName").value.trim();
    const guests = document.getElementById("guestCount").value;
    const date = document.getElementById("visitDate").value;
    const time = document.getElementById("visitTime").value;
    const notes = document.getElementById("visitNotes").value.trim();

    const message = `Hi Brew Haven Cafe! I'd like to book a table:
• Name: ${name}
• Guests: ${guests}
• Date: ${date} at ${time}${notes ? `
• Note: ${notes}` : ""}`;

    navigator.clipboard?.writeText(message).catch(() => {});
    if (bookingFeedback) {
      bookingFeedback.textContent = "Booking details copied! Redirecting to @brew_haven_cafe23 on Instagram...";
    }
    showToast("Booking details copied! Paste in Instagram DM.");

    setTimeout(() => {
      window.open(INSTAGRAM_URL, "_blank", "noopener,noreferrer");
    }, 900);
  });
});

/**
 * ====================================================================
 * 911 AVENUE — ADMIN PANEL JAVASCRIPT LOGIC
 * ====================================================================
 * 
 * Modul ini mengatur:
 * 1. Autentikasi Admin (Email: "admin" & Password simulasi)
 * 2. Manajemen Data Produk (Simulasi CRUD: Nama, Harga, Stok, Gambar)
 * 3. Penyimpanan Persisten di LocalStorage (sebelum tabel database dibuat)
 * 4. Filter, Pencarian, KPI Dashboard, dan Quick Stock Adjuster
 * 5. Blueprint / Hook siap pakai untuk koneksi database MySQL & Express
 */

// Konstanta Kurs Konversi Mata Uang
const RATE_USD_IDR = 15500;

// Kumpulan Aset Gambar Bawaan Toko
const AVAILABLE_IMAGE_PRESETS = [
  { name: "Asics GEL-Kayano 14", path: "ASET/IMAGE/ASICS.jpg" },
  { name: "New Balance 530 Retro", path: "ASET/IMAGE/NB 530.jpg" },
  { name: "Adidas Samba OG Classic", path: "ASET/IMAGE/ADIDAS SAMBO.jpg" },
  { name: "Nike P-6000 Metallic Blue", path: "ASET/IMAGE/NIKE P6000.jpg" },
  { name: "Puma Speedcat OG Sparco", path: "ASET/IMAGE/PUMA SPEEDCAT.jpg" },
  { name: "Vans Old Skool Suede Brown", path: "ASET/IMAGE/VANS.jpg" },
  { name: "Hot Wheels Heavyweight Tee", path: "ASET/IMAGE/hot wheels tshirt.jpg" },
  { name: "Dystovia Cream Corduroy", path: "ASET/IMAGE/Dystovia Cream.jpg" },
  { name: "Dystovia Black Streetwear", path: "ASET/IMAGE/Dystovia Black.jpg" },
  { name: "Celana Jeans Baggy Denim", path: "ASET/IMAGE/Celana jeans baggy.jpg" },
  { name: "Celana Training Sport Track", path: "ASET/IMAGE/Celana Training.jpg" },
  { name: "Baggy Cargo Pants", path: "ASET/IMAGE/Baggy.jpg" },
  { name: "Puma Suede Low", path: "ASET/IMAGE/puma.jpg" },
  { name: "Burgundy Streetwear Hoodie", path: "ASET/IMAGE/burgundy streatwear.jpg" },
  { name: "Black & White Monochrome Jacket", path: "ASET/IMAGE/black white.jpg" }
];

// State Global Admin
let adminProducts = [];
let editingProductId = null;
let deletingProductId = null;

// ====================================================================
// INISIALISASI SAAT DOKUMEN SIAP
// ====================================================================
document.addEventListener("DOMContentLoaded", () => {
  initAdminAuth();
  initProductsStore();
  initEventListeners();
  populateImagePresets();
});

// ====================================================================
// 1. SISTEM AUTENTIKASI ADMIN
// ====================================================================
function initAdminAuth() {
  const isAuth = localStorage.getItem("avenue_admin_session") === "true";
  const authSection = document.getElementById("adminAuthSection");
  const dashSection = document.getElementById("adminDashboardSection");

  if (isAuth) {
    if (authSection) authSection.style.display = "none";
    if (dashSection) dashSection.style.display = "flex";
    renderAdminProductsTable();
    updateKpiStats();
  } else {
    if (authSection) authSection.style.display = "flex";
    if (dashSection) dashSection.style.display = "none";
  }

  // Hook Form Login Admin
  const loginForm = document.getElementById("adminLoginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleAdminLogin);
  }

  // Hook Logout Button
  const logoutBtn = document.getElementById("adminLogoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleAdminLogout);
  }

  // Quick Auto-fill Hint Click
  const hintBox = document.getElementById("adminAuthHint");
  if (hintBox) {
    hintBox.addEventListener("click", () => {
      const emailInput = document.getElementById("adminEmail");
      const passInput = document.getElementById("adminPassword");
      if (emailInput) emailInput.value = "admin";
      if (passInput) passInput.value = "admin123";
      showToast("Kredensial simulasi otomatis terisi!", "info");
    });
  }

  // Toggle Password Visibility
  const togglePassBtn = document.getElementById("btnToggleAdminPass");
  if (togglePassBtn) {
    togglePassBtn.addEventListener("click", () => {
      const passInput = document.getElementById("adminPassword");
      if (!passInput) return;
      const isPwd = passInput.type === "password";
      passInput.type = isPwd ? "text" : "password";
    });
  }
}

function handleAdminLogin(e) {
  e.preventDefault();
  const emailInput = document.getElementById("adminEmail")?.value.trim().toLowerCase();
  const passwordInput = document.getElementById("adminPassword")?.value.trim();
  const errorAlert = document.getElementById("adminLoginAlertError");

  // Validasi Kredensial Admin sesuai instruksi pengguna:
  // Email: "admin" atau "admin@911avenue.com"
  // Password: "admin", "admin123", "********", atau minimal terisi 4 karakter
  const validEmails = ["admin", "admin@911avenue.com", "admin@avenue.com"];
  const isEmailValid = validEmails.includes(emailInput);
  const isPasswordValid = passwordInput.length >= 4;

  if (isEmailValid && isPasswordValid) {
    if (errorAlert) {
      errorAlert.classList.remove("visible");
      errorAlert.style.display = "none";
    }

    localStorage.setItem("avenue_admin_session", "true");
    localStorage.setItem("avenue_admin_user", emailInput);

    showToast("Selamat datang di Admin Panel 911 Avenue!", "success");

    setTimeout(() => {
      const authSection = document.getElementById("adminAuthSection");
      const dashSection = document.getElementById("adminDashboardSection");
      if (authSection) authSection.style.display = "none";
      if (dashSection) dashSection.style.display = "flex";
      renderAdminProductsTable();
      updateKpiStats();
    }, 400);
  } else {
    if (errorAlert) {
      errorAlert.querySelector(".alert-text").textContent =
        "Email atau kata sandi admin tidak cocok. Gunakan email: admin";
      errorAlert.style.display = "flex";
      errorAlert.classList.add("visible");
    }
  }
}

function handleAdminLogout() {
  localStorage.removeItem("avenue_admin_session");
  localStorage.removeItem("avenue_admin_user");
  showToast("Anda telah keluar dari Admin Panel.", "info");

  setTimeout(() => {
    const authSection = document.getElementById("adminAuthSection");
    const dashSection = document.getElementById("adminDashboardSection");
    if (authSection) authSection.style.display = "flex";
    if (dashSection) dashSection.style.display = "none";
  }, 300);
}

// ====================================================================
// 2. DATA STORE PRODUK (SIMULASI & LOCALSTORAGE)
// ====================================================================
function initProductsStore() {
  const savedData = localStorage.getItem("avenue_admin_products");

  if (savedData) {
    try {
      adminProducts = JSON.parse(savedData);
    } catch (err) {
      console.error("Gagal membaca cache produk:", err);
      adminProducts = seedInitialProducts();
    }
  } else {
    adminProducts = seedInitialProducts();
  }
}

function seedInitialProducts() {
  // Ambil data dari catalog PRODUCTS (di products-data.js) jika tersedia
  const sourceProducts = (typeof PRODUCTS !== "undefined" && Array.isArray(PRODUCTS)) 
    ? PRODUCTS 
    : [];

  const defaultStocks = [24, 18, 12, 8, 5, 0, 16, 20, 7, 14, 9, 3, 22, 11, 4];

  const seeded = sourceProducts.map((p, index) => {
    const priceNum = p.priceNum || parseFloat(String(p.price).replace(/[^0-9.]/g, "")) || 99;
    const stockQty = defaultStocks[index % defaultStocks.length];
    
    return {
      id: p.id || `prod-${index + 1}`,
      name: p.name || `Produk 911 Avenue #${index + 1}`,
      category: p.category || "sepatu",
      categoryLabel: p.categoryLabel || getCategoryLabel(p.category || "sepatu"),
      price: p.price || `$${priceNum.toFixed(2)}`,
      priceNum: priceNum,
      priceIdr: p.priceIdr || formatIdr(priceNum),
      stock: stockQty,
      image: p.image || "ASET/IMAGE/ASICS.jpg",
      badge: p.badge || (stockQty === 0 ? "Habis" : stockQty < 10 ? "Stok Menipis" : "Tersedia"),
      shortDesc: p.shortDesc || "Produk berkualitas tinggi dari koleksi eksklusif 911 Avenue.",
      rating: p.rating || 4.8,
      updatedAt: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })
    };
  });

  saveProductsToStorage(seeded);
  return seeded;
}

function saveProductsToStorage(products) {
  adminProducts = products;
  localStorage.setItem("avenue_admin_products", JSON.stringify(products));

  // =========================================================================
  // CATATAN PENGEMBANG:
  // Ketika tabel produk di database MySQL Anda sudah siap,
  // Anda dapat menyinkronkan data ini ke backend Express di sini:
  // syncProductToBackend(products);
  // =========================================================================
}

function getCategoryLabel(cat) {
  const map = {
    sepatu: "Sepatu",
    baju: "Baju",
    celana: "Celana",
    aksesoris: "Aksesoris"
  };
  return map[cat.toLowerCase()] || "Lainnya";
}

function formatUsd(amount) {
  return "$" + Number(amount).toFixed(2);
}

function formatIdr(amountInUsd) {
  const idr = Math.round(Number(amountInUsd) * RATE_USD_IDR);
  return "Rp " + idr.toLocaleString("id-ID");
}

// ====================================================================
// 3. RENDER TABEL PRODUK & FILTER
// ====================================================================
function renderAdminProductsTable() {
  const tbody = document.getElementById("adminProductsTbody");
  const countDisplay = document.getElementById("adminProductCountDisplay");
  if (!tbody) return;

  const searchQuery = document.getElementById("adminSearchInput")?.value.toLowerCase().trim() || "";
  const filterCat = document.getElementById("adminFilterCategory")?.value || "all";
  const filterStock = document.getElementById("adminFilterStock")?.value || "all";

  // Filter Data
  const filtered = adminProducts.filter((item) => {
    // 1. Search Query (Nama atau ID)
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery) ||
      item.id.toLowerCase().includes(searchQuery);

    // 2. Kategori
    const matchesCat = filterCat === "all" || item.category.toLowerCase() === filterCat.toLowerCase();

    // 3. Status Stok
    let matchesStock = true;
    if (filterStock === "available") {
      matchesStock = item.stock > 10;
    } else if (filterStock === "low") {
      matchesStock = item.stock > 0 && item.stock <= 10;
    } else if (filterStock === "out") {
      matchesStock = item.stock === 0;
    }

    return matchesSearch && matchesCat && matchesStock;
  });

  if (countDisplay) {
    countDisplay.textContent = `${filtered.length} dari ${adminProducts.length}`;
  }

  tbody.innerHTML = "";

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6">
          <div class="admin-empty-state">
            <div class="admin-empty-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <div class="admin-empty-title">Tidak Ada Produk yang Cocok</div>
            <p class="admin-empty-desc">Coba sesuaikan kata kunci pencarian atau ganti filter kategori/status stok.</p>
            <button type="button" class="btn-action-secondary" onclick="resetFilters()">Reset Filter</button>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  filtered.forEach((p) => {
    const tr = document.createElement("tr");

    // Tentukan Status Stok
    let stockBadgeClass = "status-in-stock";
    let stockLabel = "Tersedia";

    if (p.stock === 0) {
      stockBadgeClass = "status-out-stock";
      stockLabel = "Stok Habis";
    } else if (p.stock <= 10) {
      stockBadgeClass = "status-low-stock";
      stockLabel = "Stok Menipis";
    }

    tr.innerHTML = `
      <!-- Thumbnail Gambar (Img) -->
      <td class="product-cell-thumb">
        <div class="table-thumb-wrap" onclick="openEditModal('${p.id}')" title="Klik untuk edit produk">
          <img src="${p.image}" alt="${p.name}" class="table-thumb-img" onerror="this.src='ASET/IMAGE/ASICS.jpg'" />
        </div>
      </td>

      <!-- Nama Produk & ID -->
      <td class="product-cell-name">
        <div class="product-title-row">${p.name}</div>
        <div class="product-meta-row">
          <span class="product-id-tag">#${p.id}</span>
          ${p.badge ? `<span class="product-badge-pill">${p.badge}</span>` : ""}
        </div>
      </td>

      <!-- Kategori -->
      <td>
        <span class="category-pill">${p.categoryLabel || getCategoryLabel(p.category)}</span>
      </td>

      <!-- Harga (USD & IDR) -->
      <td>
        <div class="price-display-box">
          <span class="price-main">${p.priceIdr || formatIdr(p.priceNum)}</span>
          <span class="price-secondary">${p.price || formatUsd(p.priceNum)}</span>
        </div>
      </td>

      <!-- Stok & Kontrol Cepat -->
      <td>
        <div class="stock-stepper-box">
          <button type="button" class="stock-control-btn" onclick="adjustQuickStock('${p.id}', -1)" title="Kurangi 1">-</button>
          <span class="stock-num-val">${p.stock}</span>
          <button type="button" class="stock-control-btn" onclick="adjustQuickStock('${p.id}', 1)" title="Tambah 1">+</button>
        </div>
        <div>
          <span class="stock-status-pill ${stockBadgeClass}">
            <span style="font-size: 8px;">●</span> ${stockLabel}
          </span>
        </div>
      </td>

      <!-- Aksi (Edit & Hapus) -->
      <td>
        <div class="table-actions-group">
          <button type="button" class="btn-table-edit" onclick="openEditModal('${p.id}')" title="Edit nama, harga, stok, gambar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Edit
          </button>
          <button type="button" class="btn-table-del" onclick="openDeleteConfirmModal('${p.id}')" title="Hapus produk">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

// Reset Filter Toolbar
function resetFilters() {
  const searchInput = document.getElementById("adminSearchInput");
  const catFilter = document.getElementById("adminFilterCategory");
  const stockFilter = document.getElementById("adminFilterStock");

  if (searchInput) searchInput.value = "";
  if (catFilter) catFilter.value = "all";
  if (stockFilter) stockFilter.value = "all";

  renderAdminProductsTable();
}

// ====================================================================
// 4. STATISTIK KPI DASHBOARD
// ====================================================================
function updateKpiStats() {
  const totalCount = adminProducts.length;
  const totalStockUnits = adminProducts.reduce((acc, p) => acc + (Number(p.stock) || 0), 0);
  const lowStockCount = adminProducts.filter((p) => p.stock > 0 && p.stock <= 10).length;
  const outStockCount = adminProducts.filter((p) => p.stock === 0).length;

  const totalProdEl = document.getElementById("kpiTotalProducts");
  const totalStockEl = document.getElementById("kpiTotalStock");
  const lowStockEl = document.getElementById("kpiLowStock");
  const outStockEl = document.getElementById("kpiOutStock");

  if (totalProdEl) totalProdEl.textContent = totalCount;
  if (totalStockEl) totalStockEl.textContent = totalStockUnits.toLocaleString("id-ID");
  if (lowStockEl) lowStockEl.textContent = lowStockCount;
  if (outStockEl) outStockEl.textContent = outStockCount;
}

// ====================================================================
// 5. QUICK STOCK ADJUSTMENT (+ / - DARI TABEL)
// ====================================================================
function adjustQuickStock(productId, delta) {
  const product = adminProducts.find((p) => p.id === productId);
  if (!product) return;

  const newStock = Math.max(0, (Number(product.stock) || 0) + delta);
  product.stock = newStock;
  product.updatedAt = new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });

  saveProductsToStorage(adminProducts);
  renderAdminProductsTable();
  updateKpiStats();

  showToast(`Stok ${product.name}: ${newStock} unit`, "info");
}

// ====================================================================
// 6. MODAL EDIT PRODUK (NAMA, HARGA, STOK, GAMBAR)
// ====================================================================
function openEditModal(productId) {
  const product = adminProducts.find((p) => p.id === productId);
  if (!product) return;

  editingProductId = productId;

  // Isi Field Form
  document.getElementById("modalEditId").textContent = `#${product.id}`;
  document.getElementById("editProductName").value = product.name;
  document.getElementById("editProductCategory").value = product.category || "sepatu";
  document.getElementById("editProductPriceUsd").value = product.priceNum || 100;
  document.getElementById("editProductStock").value = product.stock || 0;
  document.getElementById("editProductImage").value = product.image;
  document.getElementById("editProductBadge").value = product.badge || "";
  document.getElementById("editProductDesc").value = product.shortDesc || "";

  // Update Preview Gambar & Live IDR
  updateEditModalImagePreview(product.image);
  syncEditModalPriceIdr();
  syncEditModalStockBadge();

  // Buka Modal
  const modalBackdrop = document.getElementById("editProductModal");
  if (modalBackdrop) modalBackdrop.classList.add("active");
}

function closeEditModal() {
  editingProductId = null;
  const modalBackdrop = document.getElementById("editProductModal");
  if (modalBackdrop) modalBackdrop.classList.remove("active");
}

function handleSaveEditProduct(e) {
  e.preventDefault();
  if (!editingProductId) return;

  const product = adminProducts.find((p) => p.id === editingProductId);
  if (!product) return;

  // Baca input form
  const newName = document.getElementById("editProductName")?.value.trim();
  const newCategory = document.getElementById("editProductCategory")?.value;
  const newPriceUsd = parseFloat(document.getElementById("editProductPriceUsd")?.value) || 0;
  const newStock = parseInt(document.getElementById("editProductStock")?.value, 10) || 0;
  const newImage = document.getElementById("editProductImage")?.value.trim();
  const newBadge = document.getElementById("editProductBadge")?.value.trim();
  const newDesc = document.getElementById("editProductDesc")?.value.trim();

  if (!newName) {
    showToast("Nama produk wajib diisi!", "error");
    return;
  }

  // Update Objek Produk
  product.name = newName;
  product.category = newCategory;
  product.categoryLabel = getCategoryLabel(newCategory);
  product.priceNum = newPriceUsd;
  product.price = formatUsd(newPriceUsd);
  product.priceIdr = formatIdr(newPriceUsd);
  product.stock = Math.max(0, newStock);
  product.image = newImage || "ASET/IMAGE/ASICS.jpg";
  product.badge = newBadge;
  product.shortDesc = newDesc;
  product.updatedAt = new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });

  // Simpan
  saveProductsToStorage(adminProducts);
  renderAdminProductsTable();
  updateKpiStats();
  closeEditModal();

  showToast(`Perubahan "${product.name}" berhasil disimpan!`, "success");
}

// Helper Preview Gambar di Modal Edit
function updateEditModalImagePreview(src) {
  const previewImg = document.getElementById("editModalPreviewImg");
  if (previewImg) {
    previewImg.src = src || "ASET/IMAGE/ASICS.jpg";
    previewImg.onerror = () => {
      previewImg.src = "ASET/IMAGE/ASICS.jpg";
    };
  }
}

function syncEditModalPriceIdr() {
  const usdVal = parseFloat(document.getElementById("editProductPriceUsd")?.value) || 0;
  const idrDisplay = document.getElementById("editProductPriceIdrDisplay");
  if (idrDisplay) {
    idrDisplay.textContent = formatIdr(usdVal);
  }
}

function syncEditModalStockBadge() {
  const stockVal = parseInt(document.getElementById("editProductStock")?.value, 10) || 0;
  const badgeEl = document.getElementById("editModalStockStatusBadge");
  if (!badgeEl) return;

  if (stockVal === 0) {
    badgeEl.className = "stock-status-pill status-out-stock";
    badgeEl.textContent = "Stok Habis";
  } else if (stockVal <= 10) {
    badgeEl.className = "stock-status-pill status-low-stock";
    badgeEl.textContent = "Stok Menipis";
  } else {
    badgeEl.className = "stock-status-pill status-in-stock";
    badgeEl.textContent = "Tersedia";
  }
}

// Preset Dropdown Generator
function populateImagePresets() {
  const editPresetSelect = document.getElementById("editProductPresetImg");
  const addPresetSelect = document.getElementById("addProductPresetImg");

  const buildOptions = () => {
    return `
      <option value="">-- Pilih dari Koleksi Aset Gambar --</option>
      ${AVAILABLE_IMAGE_PRESETS.map(
        (img) => `<option value="${img.path}">${img.name} (${img.path})</option>`
      ).join("")}
    `;
  };

  if (editPresetSelect) editPresetSelect.innerHTML = buildOptions();
  if (addPresetSelect) addPresetSelect.innerHTML = buildOptions();
}

// ====================================================================
// 7. MODAL TAMBAH PRODUK BARU
// ====================================================================
function openAddModal() {
  const addModal = document.getElementById("addProductModal");
  if (addModal) {
    // Reset Form
    document.getElementById("addProductName").value = "";
    document.getElementById("addProductCategory").value = "sepatu";
    document.getElementById("addProductPriceUsd").value = "100";
    document.getElementById("addProductStock").value = "15";
    document.getElementById("addProductImage").value = "ASET/IMAGE/ASICS.jpg";
    document.getElementById("addProductBadge").value = "New Arrival";
    document.getElementById("addProductDesc").value = "";

    updateAddModalImagePreview("ASET/IMAGE/ASICS.jpg");
    syncAddModalPriceIdr();

    addModal.classList.add("active");
  }
}

function closeAddModal() {
  const addModal = document.getElementById("addProductModal");
  if (addModal) addModal.classList.remove("active");
}

function handleSaveAddProduct(e) {
  e.preventDefault();

  const name = document.getElementById("addProductName")?.value.trim();
  const category = document.getElementById("addProductCategory")?.value || "sepatu";
  const priceUsd = parseFloat(document.getElementById("addProductPriceUsd")?.value) || 0;
  const stock = parseInt(document.getElementById("addProductStock")?.value, 10) || 0;
  const image = document.getElementById("addProductImage")?.value.trim() || "ASET/IMAGE/ASICS.jpg";
  const badge = document.getElementById("addProductBadge")?.value.trim() || "New Arrival";
  const desc = document.getElementById("addProductDesc")?.value.trim() || "";

  if (!name) {
    showToast("Nama produk wajib diisi!", "error");
    return;
  }

  // Buat ID baru
  const newId = `${category.toLowerCase()}-${Date.now().toString().slice(-4)}`;

  const newProduct = {
    id: newId,
    name: name,
    category: category,
    categoryLabel: getCategoryLabel(category),
    priceNum: priceUsd,
    price: formatUsd(priceUsd),
    priceIdr: formatIdr(priceUsd),
    stock: Math.max(0, stock),
    image: image,
    badge: badge,
    shortDesc: desc || "Koleksi produk terbaru 911 Avenue.",
    rating: 5.0,
    updatedAt: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })
  };

  // Tambahkan ke paling atas
  adminProducts.unshift(newProduct);
  saveProductsToStorage(adminProducts);
  renderAdminProductsTable();
  updateKpiStats();
  closeAddModal();

  showToast(`Produk "${newProduct.name}" berhasil ditambahkan ke katalog!`, "success");
}

function updateAddModalImagePreview(src) {
  const previewImg = document.getElementById("addModalPreviewImg");
  if (previewImg) {
    previewImg.src = src || "ASET/IMAGE/ASICS.jpg";
  }
}

function syncAddModalPriceIdr() {
  const usdVal = parseFloat(document.getElementById("addProductPriceUsd")?.value) || 0;
  const idrDisplay = document.getElementById("addProductPriceIdrDisplay");
  if (idrDisplay) {
    idrDisplay.textContent = formatIdr(usdVal);
  }
}

// ====================================================================
// 8. MODAL KONFIRMASI HAPUS PRODUK
// ====================================================================
function openDeleteConfirmModal(productId) {
  const product = adminProducts.find((p) => p.id === productId);
  if (!product) return;

  deletingProductId = productId;
  document.getElementById("deleteConfirmProdName").textContent = product.name;
  document.getElementById("deleteConfirmProdId").textContent = `#${product.id}`;

  const delModal = document.getElementById("deleteConfirmModal");
  if (delModal) delModal.classList.add("active");
}

function closeDeleteConfirmModal() {
  deletingProductId = null;
  const delModal = document.getElementById("deleteConfirmModal");
  if (delModal) delModal.classList.remove("active");
}

function executeDeleteProduct() {
  if (!deletingProductId) return;

  const targetIndex = adminProducts.findIndex((p) => p.id === deletingProductId);
  if (targetIndex !== -1) {
    const deletedName = adminProducts[targetIndex].name;
    adminProducts.splice(targetIndex, 1);
    saveProductsToStorage(adminProducts);
    renderAdminProductsTable();
    updateKpiStats();
    closeDeleteConfirmModal();
    showToast(`Produk "${deletedName}" berhasil dihapus.`, "info");
  }
}

// ====================================================================
// 9. MODAL PANDUAN DATABASE MYSQL
// ====================================================================
function openDatabaseGuideModal() {
  const modal = document.getElementById("databaseGuideModal");
  if (modal) modal.classList.add("active");
}

function closeDatabaseGuideModal() {
  const modal = document.getElementById("databaseGuideModal");
  if (modal) modal.classList.remove("active");
}

// ====================================================================
// 10. RESET SIMULASI KE DATA DEFAULT
// ====================================================================
function handleResetSimulation() {
  if (confirm("Apakah Anda yakin ingin mengembalikan semua data katalog simulasi ke bawaan awal?")) {
    localStorage.removeItem("avenue_admin_products");
    adminProducts = seedInitialProducts();
    renderAdminProductsTable();
    updateKpiStats();
    showToast("Data katalog simulasi berhasil dikembalikan ke default!", "success");
  }
}

// ====================================================================
// 11. TOAST NOTIFICATION UTILITY
// ====================================================================
function showToast(message, type = "info") {
  const container = document.getElementById("adminToastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "admin-toast";

  let iconSvg = "";
  if (type === "success") {
    iconSvg = `
      <svg class="toast-icon-success" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    `;
  } else if (type === "error") {
    iconSvg = `
      <svg style="color: #ef4444;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
    `;
  } else {
    iconSvg = `
      <svg class="toast-icon-info" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    `;
  }

  toast.innerHTML = `
    ${iconSvg}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 350);
  }, 2500);
}

// ====================================================================
// 12. EVENT LISTENERS HOOKS
// ====================================================================
function initEventListeners() {
  // Live Search & Filters
  const searchInput = document.getElementById("adminSearchInput");
  const catFilter = document.getElementById("adminFilterCategory");
  const stockFilter = document.getElementById("adminFilterStock");

  if (searchInput) searchInput.addEventListener("input", renderAdminProductsTable);
  if (catFilter) catFilter.addEventListener("change", renderAdminProductsTable);
  if (stockFilter) stockFilter.addEventListener("change", renderAdminProductsTable);

  // Form Edit Submit
  const editForm = document.getElementById("editProductForm");
  if (editForm) editForm.addEventListener("submit", handleSaveEditProduct);

  // Form Tambah Submit
  const addForm = document.getElementById("addProductForm");
  if (addForm) addForm.addEventListener("submit", handleSaveAddProduct);

  // Live Sync Modal Edit
  const editUsdInput = document.getElementById("editProductPriceUsd");
  if (editUsdInput) editUsdInput.addEventListener("input", syncEditModalPriceIdr);

  const editStockInput = document.getElementById("editProductStock");
  if (editStockInput) editStockInput.addEventListener("input", syncEditModalStockBadge);

  const editImgInput = document.getElementById("editProductImage");
  if (editImgInput) {
    editImgInput.addEventListener("input", (e) => {
      updateEditModalImagePreview(e.target.value);
    });
  }

  const editPresetSelect = document.getElementById("editProductPresetImg");
  if (editPresetSelect) {
    editPresetSelect.addEventListener("change", (e) => {
      if (e.target.value) {
        if (editImgInput) editImgInput.value = e.target.value;
        updateEditModalImagePreview(e.target.value);
      }
    });
  }

  // Upload File Gambar Lokal (FileReader) pada Modal Edit
  const editFileInput = document.getElementById("editProductFileImg");
  if (editFileInput) {
    editFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (uploadEvt) => {
          const dataUrl = uploadEvt.target.result;
          if (editImgInput) editImgInput.value = dataUrl;
          updateEditModalImagePreview(dataUrl);
          showToast("Gambar lokal berhasil dimuat untuk pratinjau!", "info");
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Live Sync Modal Tambah
  const addUsdInput = document.getElementById("addProductPriceUsd");
  if (addUsdInput) addUsdInput.addEventListener("input", syncAddModalPriceIdr);

  const addImgInput = document.getElementById("addProductImage");
  if (addImgInput) {
    addImgInput.addEventListener("input", (e) => {
      updateAddModalImagePreview(e.target.value);
    });
  }

  const addPresetSelect = document.getElementById("addProductPresetImg");
  if (addPresetSelect) {
    addPresetSelect.addEventListener("change", (e) => {
      if (e.target.value) {
        if (addImgInput) addImgInput.value = e.target.value;
        updateAddModalImagePreview(e.target.value);
      }
    });
  }

  const addFileInput = document.getElementById("addProductFileImg");
  if (addFileInput) {
    addFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (uploadEvt) => {
          const dataUrl = uploadEvt.target.result;
          if (addImgInput) addImgInput.value = dataUrl;
          updateAddModalImagePreview(dataUrl);
          showToast("Gambar lokal berhasil dimuat untuk pratinjau!", "info");
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

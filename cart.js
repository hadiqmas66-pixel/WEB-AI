// ============================================
// 911 AVENUE — CART MANAGEMENT SYSTEM
// ============================================

const CART_STORAGE_KEY = "avenue_cart_v1";

// ── 1. Storage Helpers ──
function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Gagal membaca keranjang:", e);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartUI();
    window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { cart } }));
  } catch (e) {
    console.error("Gagal menyimpan keranjang:", e);
  }
}

// ── 2. Add to Cart ──
function addToCart(productId, size, quantity = 1, openDrawer = false) {
  const product = typeof getProductById === "function" ? getProductById(productId) : null;
  if (!product) {
    console.error("Produk tidak ditemukan:", productId);
    return false;
  }

  // Validasi size jika belum dipilih
  if (!size) {
    if (product.sizes && product.sizes.length > 0) {
      size = product.sizes[0]; // fallback ke ukuran pertama
    } else {
      size = "One Size";
    }
  }

  const cart = getCart();
  const existingIdx = cart.findIndex(
    (item) => item.productId === productId && item.size === size
  );

  if (existingIdx > -1) {
    cart[existingIdx].quantity += Number(quantity);
  } else {
    cart.push({
      productId: product.id,
      name: product.name,
      category: product.category,
      categoryLabel: product.categoryLabel || product.category,
      price: product.price,
      priceNum: product.priceNum,
      priceIdr: product.priceIdr || formatIdr(product.priceNum),
      image: product.image,
      size: size,
      quantity: Number(quantity)
    });
  }

  saveCart(cart);

  if (typeof showToast === "function") {
    showToast(`✓ Ditambahkan: ${product.name} (Size: ${size})`);
  }

  // Trigger badge animation
  animateCartBadge();

  if (openDrawer) {
    openCartDrawer();
  }

  return true;
}

// ── 3. Modify Quantity & Remove ──
function updateCartQuantity(index, delta) {
  const cart = getCart();
  if (cart[index]) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    saveCart(cart);
  }
}

function removeFromCart(index) {
  const cart = getCart();
  if (cart[index]) {
    const removedName = cart[index].name;
    cart.splice(index, 1);
    saveCart(cart);
    if (typeof showToast === "function") {
      showToast(`Item "${removedName}" dihapus dari keranjang`);
    }
  }
}

function clearCart() {
  saveCart([]);
}

// ── 4. Calculations ──
function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.quantity || 1), 0);
}

function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.priceNum * (item.quantity || 1)), 0);
}

// ── 5. UI Drawer Rendering ──
function updateCartUI() {
  const count = getCartCount();
  const total = getCartTotal();
  const cart = getCart();

  // Update badge counter
  const badges = document.querySelectorAll("#cartCount, .cart-count-badge");
  badges.forEach((b) => {
    b.textContent = count;
  });

  // Render items inside drawer
  const cartItemsList = document.getElementById("cartItems");
  const cartTotalEl = document.getElementById("cartTotal");

  if (cartTotalEl) {
    cartTotalEl.innerHTML = `${formatUsd(total)} <span class="idr-sub">(${formatIdr(total)})</span>`;
  }

  if (cartItemsList) {
    if (cart.length === 0) {
      cartItemsList.innerHTML = `
        <div class="cart-empty-state">
          <div class="empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </div>
          <p class="empty-title">Keranjang Belanja Kosong</p>
          <p class="empty-sub">Pilih produk favorit Anda dan tentukan ukuran yang sesuai.</p>
          <a href="index.html#shop" class="btn-continue-shop" onclick="closeCartDrawer()">Lihat Produk &rarr;</a>
        </div>
      `;
    } else {
      cartItemsList.innerHTML = cart
        .map(
          (item, idx) => `
        <li class="cart-item-row" data-index="${idx}">
          <div class="cart-item-thumb">
            <img src="${item.image}" alt="${item.name}" onerror="this.src='ASET/IMAGE/ASICS.jpg'" />
          </div>
          <div class="cart-item-info">
            <div class="cart-item-header">
              <h4 class="cart-item-title">${item.name}</h4>
              <button type="button" class="cart-item-remove" onclick="removeFromCart(${idx})" aria-label="Hapus item">&times;</button>
            </div>
            <div class="cart-item-meta">
              <span class="cart-item-size">Size: <strong>${item.size}</strong></span>
              <span class="cart-item-price">${formatUsd(item.priceNum)}</span>
            </div>
            <div class="cart-item-bottom">
              <div class="qty-stepper">
                <button type="button" class="qty-btn" onclick="updateCartQuantity(${idx}, -1)" aria-label="Kurangi">-</button>
                <span class="qty-value">${item.quantity}</span>
                <button type="button" class="qty-btn" onclick="updateCartQuantity(${idx}, 1)" aria-label="Tambah">+</button>
              </div>
              <span class="cart-item-subtotal">${formatUsd(item.priceNum * item.quantity)}</span>
            </div>
          </div>
        </li>
      `
        )
        .join("");
    }
  }
}

// ── 6. Drawer Controller ──
function openCartDrawer() {
  const drawer = document.getElementById("cartModal");
  const overlay = document.getElementById("cartOverlay");
  if (!drawer || !overlay) return;
  drawer.classList.add("active");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
  const drawer = document.getElementById("cartModal");
  const overlay = document.getElementById("cartOverlay");
  if (!drawer || !overlay) return;
  drawer.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

function animateCartBadge() {
  const badges = document.querySelectorAll("#cartCount, .cart-count-badge");
  badges.forEach((cartBadge) => {
    cartBadge.style.transition = "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)";
    cartBadge.style.transform = "scale(1.45) rotate(10deg)";
    setTimeout(() => {
      cartBadge.style.transform = "scale(1) rotate(0deg)";
    }, 220);
  });
}

// ── 7. Hook Checkout Button ──
function initCheckoutTrigger() {
  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      const cart = getCart();
      if (cart.length === 0) {
        if (typeof showToast === "function") {
          showToast("⚠️ Keranjang Anda masih kosong. Silakan pilih produk terlebih dahulu!");
        } else {
          alert("Keranjang Anda masih kosong. Silakan pilih produk terlebih dahulu!");
        }
        return;
      }
      // Redirect ke halaman transaksi checkout
      window.location.href = "checkout.html";
    });
  }
}

// Global initialization
document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();
  initCheckoutTrigger();
});

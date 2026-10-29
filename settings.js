// ============================================
// 911 AVENUE — SETTINGS & LOCALIZATION SYSTEM
// (Input Alamat & Pengaturan Bahasa)
// ============================================

const SETTINGS_STORAGE_KEYS = {
  ADDRESS: "avenue_user_address",
  LANGUAGE: "avenue_site_lang"
};

// ── 1. Dictionary Terjemahan Lengkap (ID & EN) ──
const I18N_DICTIONARY = {
  id: {
    // Navbar
    nav_home: "Beranda",
    nav_shop: "Belanja",
    nav_about: "Tentang",
    nav_contact: "Kontak",
    nav_settings: "Setting",
    nav_login: "Masuk",
    nav_logout: "Logout",
    
    // Landing Page Setting
    settings_page_tag: "Pusat Kontrol Akun & Preferensi",
    settings_page_title: "Pengaturan <em>911 Avenue</em>",
    settings_page_sub: "Kelola alamat pengiriman pesanan dan preferensi bahasa belanja Anda untuk pengalaman terbaik.",
    breadcrumb_home: "Beranda",
    breadcrumb_settings: "Pengaturan",
    
    // Bagian Menu Alamat
    address_menu_badge: "Pengiriman",
    address_card_title: "Menu Input Alamat",
    address_card_desc: "Alamat ini akan otomatis digunakan sebagai tujuan pengiriman saat Anda melakukan checkout pesanan.",
    setting_address_title: "Input Alamat",
    setting_address_placeholder: "Masukkan alamat pengiriman lengkap (Jalan, RT/RW, No. Rumah, Kota, Provinsi)...",
    setting_btn_input_address: "Input Alamat",
    setting_address_saved: "Alamat Tersimpan Saat Ini:",
    address_status_empty: "Belum ada alamat yang tersimpan. Silakan masukkan alamat Anda di atas.",
    address_tips_title: "Tips Alamat",
    address_tips_desc: "Pastikan menyertakan patokan lokasi atau nomor rumah yang jelas untuk memudahkan kurir mengantarkan paket Anda.",
    
    // Bagian Menu Bahasa
    lang_menu_badge: "Lokalisasi",
    lang_card_title: "Menu Pengaturan Bahasa",
    lang_card_desc: "Pilih bahasa tampilan yang Anda inginkan. Teks dan antarmuka toko akan langsung diperbarui.",
    setting_language_title: "Pengaturan Bahasa",
    setting_lang_id: "Indonesia",
    setting_lang_en: "English",
    lang_id_sub: "Gunakan Bahasa Indonesia sebagai bahasa utama",
    lang_en_sub: "Use English as the primary site language",
    lang_badge_active: "Bahasa Aktif",
    
    // Kartu Ringkasan Akun
    account_pref_title: "Informasi Sistem",
    account_pref_desc: "Preferensi Anda disimpan secara otomatis di browser dan tersinkronisasi langsung ke sistem checkout.",
    btn_back_home: "&larr; Kembali ke Beranda",
    btn_go_shop: "Mulai Belanja &rarr;",
    
    // Hero Main Page
    hero_tag: "Koleksi Baru 2026",
    hero_title: "911 Avenue <br /><em>Gaya Sehari-hari</em>",
    hero_sub: "Koleksi fashion pilihan yang memadukan nuansa biru abadi dengan sentuhan cokelat hangat.",
    hero_cta: "Belanja Sekarang &rarr;",
    
    // Shop & Products
    section_featured_title: "Produk Unggulan",
    section_featured_sub: "Pilihan esensial untuk gaya modern",
    filter_all: "Semua",
    filter_shoes: "Sepatu",
    filter_shirts: "Baju",
    filter_pants: "Celana",
    filter_accessories: "Aksesoris",
    btn_select_and_buy: "Pilih Ukuran &amp; Beli",
    
    // Cart Drawer
    cart_title: "Keranjang Belanja",
    cart_total_label: "Total:",
    cart_checkout_btn: "Lanjut ke Pembayaran",
    cart_empty_text: "Keranjang belanja Anda masih kosong.",
    
    // About
    about_tag: "Kisah &amp; Filosofi Kami",
    about_title: "Di Mana Indigo Elegan Bertemu Hangatnya Bumi",
    about_sub: "Menciptakan pakaian dan kebutuhan harian bernilai abadi dengan desain berkarakter.",
    
    // Contact
    contact_title: "Hubungi Kami",
    contact_sub: "Punya pertanyaan atau ingin berkolaborasi? Kirimkan pesan kepada kami.",
    contact_name_placeholder: "Nama Anda",
    contact_email_placeholder: "Alamat Email",
    contact_subject_placeholder: "Subjek",
    contact_msg_placeholder: "Pesan Anda...",
    contact_btn_send: "Kirim Pesan",
    
    // Footer
    footer_tagline: "Fashion &amp; aksesoris premium sejak 2024.",
    footer_quick_links: "Tautan Cepat",
    footer_support: "Bantuan",
    footer_rights: "&copy; 2026 911 Avenue Official Store. Hak cipta dilindungi.",
    footer_admin: "Panel Admin",

    // Feedback Messages
    toast_address_saved: "✓ Alamat berhasil disimpan!",
    toast_address_empty: "⚠️ Silakan masukkan alamat terlebih dahulu!",
    toast_lang_switched: "✓ Bahasa diubah ke Bahasa Indonesia"
  },
  en: {
    // Navbar
    nav_home: "Home",
    nav_shop: "Shop",
    nav_about: "About",
    nav_contact: "Contact",
    nav_settings: "Setting",
    nav_login: "Login",
    nav_logout: "Logout",
    
    // Landing Page Setting
    settings_page_tag: "Account & Preferences Center",
    settings_page_title: "Settings <em>911 Avenue</em>",
    settings_page_sub: "Manage your delivery shipping address and language preference for the best shopping experience.",
    breadcrumb_home: "Home",
    breadcrumb_settings: "Settings",
    
    // Bagian Menu Alamat
    address_menu_badge: "Shipping",
    address_card_title: "Input Address Menu",
    address_card_desc: "This address will be automatically populated as your destination when checking out orders.",
    setting_address_title: "Input Address",
    setting_address_placeholder: "Enter full shipping address (Street, Apt/Suite, City, Postal Code)...",
    setting_btn_input_address: "Input Address",
    setting_address_saved: "Currently Saved Address:",
    address_status_empty: "No address saved yet. Please enter your address above.",
    address_tips_title: "Address Tips",
    address_tips_desc: "Make sure to include nearby landmarks or house numbers to ensure fast delivery.",
    
    // Bagian Menu Bahasa
    lang_menu_badge: "Localization",
    lang_card_title: "Language Settings Menu",
    lang_card_desc: "Choose your preferred display language. Store text and interfaces will update immediately.",
    setting_language_title: "Language Settings",
    setting_lang_id: "Indonesian",
    setting_lang_en: "English",
    lang_id_sub: "Use Indonesian as the primary site language",
    lang_en_sub: "Use English as the primary site language",
    lang_badge_active: "Active Language",
    
    // Kartu Ringkasan Akun
    account_pref_title: "System Information",
    account_pref_desc: "Your preferences are stored automatically in your browser and sync directly with the checkout process.",
    btn_back_home: "&larr; Back to Home",
    btn_go_shop: "Start Shopping &rarr;",
    
    // Hero Main Page
    hero_tag: "New Collection 2026",
    hero_title: "911 Avenue <br /><em>Everyday Style</em>",
    hero_sub: "Curated fashion pieces blending timeless blue tones with warm brown accents.",
    hero_cta: "Shop Now &rarr;",
    
    // Shop & Products
    section_featured_title: "Featured Products",
    section_featured_sub: "Handpicked essentials for the modern wardrobe",
    filter_all: "All",
    filter_shoes: "Shoes",
    filter_shirts: "Shirts",
    filter_pants: "Pants",
    filter_accessories: "Accessories",
    btn_select_and_buy: "Select Size &amp; Buy",
    
    // Cart Drawer
    cart_title: "Your Cart",
    cart_total_label: "Total:",
    cart_checkout_btn: "Checkout",
    cart_empty_text: "Your cart is currently empty.",
    
    // About
    about_tag: "Our Story &amp; Philosophy",
    about_title: "Where Cool Indigo Meets Warm Earth",
    about_sub: "Crafting timeless apparel and everyday essentials with purposeful design.",
    
    // Contact
    contact_title: "Get In Touch",
    contact_sub: "Have questions or want to collaborate? Send us a message.",
    contact_name_placeholder: "Your Name",
    contact_email_placeholder: "Email Address",
    contact_subject_placeholder: "Subject",
    contact_msg_placeholder: "Your Message...",
    contact_btn_send: "Send Message",
    
    // Footer
    footer_tagline: "Premium fashion &amp; accessories since 2024.",
    footer_quick_links: "Quick Links",
    footer_support: "Support",
    footer_rights: "&copy; 2026 911 Avenue Official Store. All rights reserved.",
    footer_admin: "Admin Panel",

    // Feedback Messages
    toast_address_saved: "✓ Address saved successfully!",
    toast_address_empty: "⚠️ Please enter an address first!",
    toast_lang_switched: "✓ Language switched to English"
  }
};

// ── 2. Helper Notifikasi Toast ──
function showSettingsToast(message) {
  if (typeof showToast === "function") {
    showToast(message);
    return;
  }
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 2200);
}

// ── 3. State Management Settings ──
function getSavedAddress() {
  return localStorage.getItem(SETTINGS_STORAGE_KEYS.ADDRESS) || "";
}

function setSavedAddress(address) {
  localStorage.setItem(SETTINGS_STORAGE_KEYS.ADDRESS, address.trim());
}

function getCurrentLanguage() {
  return localStorage.getItem(SETTINGS_STORAGE_KEYS.LANGUAGE) || "id";
}

function setCurrentLanguage(lang) {
  localStorage.setItem(SETTINGS_STORAGE_KEYS.LANGUAGE, lang);
}

// ── 4. Logika Input Alamat ──
function updateAddressIndicator(address) {
  const currentLang = getCurrentLanguage();
  const dict = I18N_DICTIONARY[currentLang] || I18N_DICTIONARY.id;

  // Indikator versi dropdown/modal (jika ada)
  const indicator = document.getElementById("savedAddressIndicator");
  const textEl = document.getElementById("savedAddressText");
  if (indicator && textEl) {
    if (address && address.trim()) {
      textEl.textContent = address.trim();
      indicator.style.display = "flex";
    } else {
      indicator.style.display = "none";
      textEl.textContent = "";
    }
  }

  // Indikator versi Landing Page Settings
  const landingSavedCard = document.getElementById("landingSavedAddressCard");
  const landingSavedText = document.getElementById("landingSavedAddressText");
  const landingEmptyNotice = document.getElementById("landingAddressEmptyNotice");

  if (landingSavedText) {
    if (address && address.trim()) {
      landingSavedText.textContent = address.trim();
      if (landingSavedCard) landingSavedCard.style.display = "flex";
      if (landingEmptyNotice) landingEmptyNotice.style.display = "none";
    } else {
      landingSavedText.textContent = "";
      if (landingSavedCard) landingSavedCard.style.display = "none";
      if (landingEmptyNotice) {
        landingEmptyNotice.style.display = "block";
        landingEmptyNotice.textContent = dict.address_status_empty;
      }
    }
  }
}

function handleSaveAddress() {
  const input = document.getElementById("settingAddressInput");
  if (!input) return;

  const value = input.value.trim();
  const currentLang = getCurrentLanguage();
  const dict = I18N_DICTIONARY[currentLang] || I18N_DICTIONARY.id;

  if (!value) {
    showSettingsToast(dict.toast_address_empty);
    input.focus();
    return;
  }

  // Simpan ke localStorage
  setSavedAddress(value);
  updateAddressIndicator(value);

  // Animasi umpan balik tombol simpan
  const saveBtn = document.getElementById("btnInputAddress");
  if (saveBtn) {
    saveBtn.classList.add("btn-saved-success");
    const labelSpan = saveBtn.querySelector("span");
    const originalText = labelSpan ? labelSpan.textContent : "";
    if (labelSpan) {
      labelSpan.textContent = currentLang === "id" ? "Tersimpan ✓" : "Saved ✓";
    }
    setTimeout(() => {
      saveBtn.classList.remove("btn-saved-success");
      if (labelSpan && originalText) {
        labelSpan.textContent = dict.setting_btn_input_address;
      }
    }, 1500);
  }

  showSettingsToast(dict.toast_address_saved);

  // Jika sedang di halaman checkout, isi field form alamat secara otomatis
  const checkoutAddressField = document.getElementById("custAddress");
  if (checkoutAddressField) {
    checkoutAddressField.value = value;
  }
}

// ── 5. Logika Pengaturan Bahasa ──
function applyLanguage(lang, triggerToast = false) {
  if (lang !== "id" && lang !== "en") lang = "id";
  setCurrentLanguage(lang);

  const dict = I18N_DICTIONARY[lang] || I18N_DICTIONARY.id;

  // Ubah atribut lang pada html
  document.documentElement.lang = lang;

  // Update badge indikator pada tombol navbar
  const badge = document.getElementById("settingCurrentLangBadge");
  if (badge) {
    badge.textContent = lang.toUpperCase();
  }

  // Update tombol opsi bahasa (active state)
  const optId = document.getElementById("langChoiceId");
  const optEn = document.getElementById("langChoiceEn");
  if (optId) optId.classList.toggle("active", lang === "id");
  if (optEn) optEn.classList.toggle("active", lang === "en");

  // Terjemahkan semua elemen dengan data-i18n
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      if (dict[key].includes("<") || dict[key].includes("&")) {
        el.innerHTML = dict[key];
      } else {
        el.textContent = dict[key];
      }
    }
  });

  // Terjemahkan placeholder dengan data-i18n-placeholder
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key]) {
      el.setAttribute("placeholder", dict[key]);
    }
  });

  // Perbarui pesan alamat kosong jika relevan
  const savedAddress = getSavedAddress();
  updateAddressIndicator(savedAddress);

  if (triggerToast) {
    showSettingsToast(dict.toast_lang_switched);
  }
}

// ── 6. Inisialisasi Sistem Settings ──
function initSettingsSystem() {
  const currentLang = getCurrentLanguage();
  const savedAddress = getSavedAddress();

  // Terapkan bahasa & data awal
  applyLanguage(currentLang, false);

  const addressInput = document.getElementById("settingAddressInput");
  if (addressInput && savedAddress) {
    addressInput.value = savedAddress;
  }
  updateAddressIndicator(savedAddress);

  // Tombol Simpan Alamat (Input Alamat)
  const saveBtn = document.getElementById("btnInputAddress");
  if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveAddress);
  }

  // Izinkan submit via tombol Enter pada input alamat
  if (addressInput) {
    addressInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSaveAddress();
      }
    });
  }

  // Tombol Pilihan Bahasa (Indonesia & English)
  const langIdBtn = document.getElementById("langChoiceId");
  const langEnBtn = document.getElementById("langChoiceEn");

  if (langIdBtn) {
    langIdBtn.addEventListener("click", () => {
      if (getCurrentLanguage() !== "id") {
        applyLanguage("id", true);
      }
    });
  }

  if (langEnBtn) {
    langEnBtn.addEventListener("click", () => {
      if (getCurrentLanguage() !== "en") {
        applyLanguage("en", true);
      }
    });
  }

  // Jika di halaman checkout, isi alamat otomatis jika tersedia
  const checkoutAddressField = document.getElementById("custAddress");
  if (checkoutAddressField && !checkoutAddressField.value && savedAddress) {
    checkoutAddressField.value = savedAddress;
  }
}

// Jalankan saat DOM siap
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSettingsSystem);
} else {
  initSettingsSystem();
}

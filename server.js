/**
 * ====================================================================
 * 911 AVENUE — BACKEND SERVER
 * ====================================================================
 * 
 * File server backend untuk melayani file frontend statis dan
 * menyediakan kerangka endpoint API autentikasi (Login & Register).
 * 
 * CARA MENJALANKAN:
 * 1. Jalankan `npm install` (sudah terkonfigurasi express & cors)
 * 2. Jalankan `npm start` atau `node server.js`
 *    (atau `npm run dev` untuk hot-reload otomatis)
 * 3. Buka browser di http://localhost:3000
 * 
 * CATATAN PENGEMBANG:
 * Logika autentikasi sebenarnya (pengecekan database MySQL/MongoDB/Postgres,
 * hashing password dengan bcrypt, dan pembuatan token JWT atau session)
 * dapat Anda lengkapi pada fungsi placeholder yang telah ditandai di bawah.
 */

const express = require('express');
const path = require('path');
const cors = require('cors');

const db = require('./db');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

// ── 1. MIDDLEWARES ──
app.use(cors()); // Mengizinkan cross-origin request
app.use(express.json()); // Parsing payload format JSON
app.use(express.urlencoded({ extended: true })); // Parsing form urlencoded

// Logger request sederhana
app.use((req, res, next) => {
  const timestamp = new Date().toLocaleTimeString('id-ID');
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Melayani seluruh file statis di folder proyek (HTML, CSS, JS, Gambar)
app.use(express.static(path.join(__dirname)));

// ── 2. ROUTING HALAMAN FRONTEND UTAMA ──
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));
});

app.get('/product-detail', (req, res) => {
  res.sendFile(path.join(__dirname, 'product-detail.html'));
});

app.get('/checkout', (req, res) => {
  res.sendFile(path.join(__dirname, 'checkout.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// ── 3. KERANGKA ENDPOINT AUTENTIKASI (BACKEND API) ──

/**
 * POST /api/auth/register
 * Menerima data pendaftaran: name, email, password, phone (opsional)
 */
app.post('/api/auth/register', async (req, res) => {
  try {
    const { nama, email, password, no_hp } = req.body;

    // 1. Validasi dasar
    if (!nama || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Nama lengkap, email, dan kata sandi wajib diisi!'
      });
    }


    const cleanName = nama.trim();
    const cleanEmail = email.trim().toLowerCase();

    const [existingUsers] = await db.execute(
      'SELECT id FROM users WHERE email = ?',
      [cleanEmail]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Email sudah terdaftar.'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      `INSERT INTO users (nama, email, password, no_hp, role)
   VALUES (?, ?, ?, ?, "user")`,
      [cleanName, cleanEmail, hashedPassword, no_hp || null]
    );

    return res.status(201).json({
      success: true,
      message: 'Registrasi berhasil!',
      user: {
        id: result.insertId,
        nama: cleanName,
        email: cleanEmail,
        no_hp: no_hp || null,
        role: "user"
      }
    });


  } catch (error) {
    console.error('[API Register Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server saat registrasi.',
      error: error.message
    });
  }
});

/**
 * POST /api/auth/login
 * Menerima data login: email, password, rememberMe
 */

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    // 1. Validasi input
    if (!email?.trim() || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email dan kata sandi wajib diisi!'
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 2. Cari email di database
    const [users] = await db.execute(
      'SELECT id, nama, email, password, no_hp FROM users WHERE email = ? LIMIT 1',
      [cleanEmail]
    );

    // 3. Tolak jika email tidak ditemukan
    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Email atau kata sandi salah.'
      });
    }

    const user = users[0];

    // 4. Cocokkan password dengan hash bcrypt
    const passwordCocok = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordCocok) {
      return res.status(401).json({
        success: false,
        message: 'Email atau kata sandi salah.'
      });
    }

    // 5. Login berhasil jika kedua pemeriksaan lolos
    console.log('[API Login] Login berhasil:', user.email);

    return res.status(200).json({
      success: true,
      message: 'Login berhasil! Selamat datang kembali di 911 Avenue.',
      user: {
        id: user.id,
        name: user.nama,
        email: user.email,
        phone: user.no_hp
      }
    });

  } catch (error) {
    console.error('[API Login Error]:', error);

    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server saat login.'
    });
  }
});


/**
 * POST /api/auth/logout
 * Endpoint logout (menghapus cookie / session di server jika digunakan)
 */
app.post('/api/auth/logout', (req, res) => {
  console.log('[API Logout] User logout');
  return res.status(200).json({
    success: true,
    message: 'Logout berhasil. Sesi telah diakhiri.'
  });
});

/**
 * GET /api/auth/me
 * Mengecek status pengguna yang sedang login saat ini
 */
app.get('/api/auth/me', (req, res) => {
  /*
   * -------------------------------------------------------------
   * [TEMPAT MENARUH LOGIKA ANDA]:
   * Ambil token dari header (Authorization: Bearer <token>) atau cookies,
   * lalu verifikasi token dan kembalikan profil user aktif.
   * -------------------------------------------------------------
   */
  return res.status(200).json({
    success: true,
    status: 'Endpoint siap dihubungkan dengan verifikasi token/session'
  });
});

// ── 3.5. KERANGKA ENDPOINT PRODUK ADMIN (SIMULASI & BACKEND DATABASE) ──

/**
 * GET /api/admin/products
 * Mengambil seluruh data produk dari tabel database MySQL
 */
app.get('/api/admin/products', async (req, res) => {
  try {
    /*
     * TEMPAT MENGHUBUNGKAN KE DATABASE MYSQL:
     * Ketika tabel `products` sudah Anda buat di MySQL:
     * 
     * const [rows] = await db.execute('SELECT * FROM products ORDER BY created_at DESC');
     * return res.status(200).json({ success: true, data: rows });
     */
    return res.status(200).json({
      success: true,
      message: 'Mode simulasi aktif. Buat tabel `products` di MySQL untuk menyimpan secara permanen.',
      data: []
    });
  } catch (error) {
    console.error('[API Products GET Error]:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * PUT /api/admin/products/:id
 * Memperbarui nama, harga, stok, dan gambar produk
 */
app.put('/api/admin/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, priceNum, priceIdr, stock, image } = req.body;

    /*
     * TEMPAT QUERY UPDATE MYSQL:
     * const query = `
     *   UPDATE products 
     *   SET name = ?, category = ?, price_usd = ?, price_idr = ?, stock = ?, image = ?
     *   WHERE id = ?
     * `;
     * await db.execute(query, [name, category, priceNum, priceIdr, stock, image, id]);
     */

    console.log(`[API Product Update] ID: ${id} diperbarui:`, { name, priceNum, stock, image });

    return res.status(200).json({
      success: true,
      message: `Produk #${id} berhasil diperbarui (simulasi backend)`,
      updated: { id, name, category, priceNum, priceIdr, stock, image }
    });
  } catch (error) {
    console.error('[API Product PUT Error]:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/admin/products
 * Menambah produk baru ke database
 */
app.post('/api/admin/products', async (req, res) => {
  try {
    const { id, name, category, priceNum, priceIdr, stock, image, badge } = req.body;

    /*
     * TEMPAT QUERY INSERT MYSQL:
     * const query = `
     *   INSERT INTO products (id, name, category, price_usd, price_idr, stock, image, badge)
     *   VALUES (?, ?, ?, ?, ?, ?, ?, ?)
     * `;
     * await db.execute(query, [id, name, category, priceNum, priceIdr, stock, image, badge]);
     */

    console.log('[API Product Insert] Produk baru ditambahkan:', { id, name, stock });

    return res.status(201).json({
      success: true,
      message: 'Produk berhasil ditambahkan (simulasi backend)',
      product: req.body
    });
  } catch (error) {
    console.error('[API Product POST Error]:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * DELETE /api/admin/products/:id
 * Menghapus produk dari database
 */
app.delete('/api/admin/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    /*
     * TEMPAT QUERY DELETE MYSQL:
     * await db.execute('DELETE FROM products WHERE id = ?', [id]);
     */

    console.log(`[API Product Delete] ID: ${id} dihapus.`);

    return res.status(200).json({
      success: true,
      message: `Produk #${id} berhasil dihapus (simulasi backend)`
    });
  } catch (error) {
    console.error('[API Product DELETE Error]:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// ── 4. FALLBACK 404 (HALAMAN TIDAK DITEMUKAN) ──
app.use((req, res) => {
  res.status(404).send(`
    <div style="font-family: sans-serif; text-align: center; padding: 60px; background: #060a14; color: #fff; min-height: 100vh;">
      <h1 style="color: #5996fa; font-size: 3rem; margin-bottom: 10px;">404</h1>
      <p style="color: #94a3b8; font-size: 1.2rem;">Halaman yang Anda tuju tidak ditemukan.</p>
      <a href="/" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background: #3374f6; color: #fff; text-decoration: none; border-radius: 8px;">Kembali ke Beranda</a>
    </div>
  `);
});

// ── 5. MENJALANKAN SERVER ──
app.listen(PORT, () => {
  console.log(` 911 AVENUE SERVER RUNNING`);
  console.log(` Local URL     : http://localhost:${PORT}`);
  console.log(` Login Page    : http://localhost:${PORT}/login.html`);
  console.log(` Register Page : http://localhost:${PORT}/register.html`);
  console.log(` Shop / Home   : http://localhost:${PORT}/index.html`);
  console.log(` Admin Panel   : http://localhost:${PORT}/admin.html (or /admin)`);
});

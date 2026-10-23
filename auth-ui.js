
document.addEventListener("DOMContentLoaded", () => {
  initPasswordToggles();
  initPasswordStrengthMeter();
  initAuthFormSubmitHooks();
  initAuthButtons();
});

// ── 1. Toggle Visibility Password ──
function initPasswordToggles() {
  const toggleBtns = document.querySelectorAll(".btn-toggle-pwd");

  toggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const input = document.getElementById(targetId);
      if (!input) return;

      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";

      if (isPassword) {
        btn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
            <line x1="1" y1="1" x2="23" y2="23"/>
          </svg>
        `;
        btn.setAttribute("aria-label", "Sembunyikan kata sandi");
      } else {
        btn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        `;
        btn.setAttribute("aria-label", "Tampilkan kata sandi");
      }
    });
  });
}

// ── 2. Password Strength Meter ──
function initPasswordStrengthMeter() {
  const pwdInput = document.getElementById("registerPassword");
  const barFill = document.getElementById("pwdStrengthFill");
  const labelText = document.getElementById("pwdStrengthText");

  if (!pwdInput || !barFill || !labelText) return;

  pwdInput.addEventListener("input", () => {
    const val = pwdInput.value;

    if (!val) {
      barFill.style.width = "0%";
      labelText.textContent = "-";
      labelText.style.color = "#64748b";
      return;
    }

    let score = 0;
    if (val.length >= 6) score++;
    if (val.length >= 10) score++;
    if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    if (score <= 2) {
      barFill.style.width = "30%";
      barFill.style.backgroundColor = "#ef4444";
      labelText.textContent = "Lemah";
      labelText.style.color = "#f87171";
    } else if (score <= 4) {
      barFill.style.width = "65%";
      barFill.style.backgroundColor = "#f59e0b";
      labelText.textContent = "Sedang";
      labelText.style.color = "#fbbf24";
    } else {
      barFill.style.width = "100%";
      barFill.style.backgroundColor = "#10b981";
      labelText.textContent = "Sangat Kuat";
      labelText.style.color = "#34d399";
    }
  });
}

// ── 3. Helper Tampilkan Pesan Alert ──
function showAuthAlert(type, message) {
  const errorAlert = document.querySelector(".auth-alert-error");
  const successAlert = document.querySelector(".auth-alert-success");

  if (errorAlert) {
    errorAlert.classList.remove("visible");
    errorAlert.style.display = "none";
  }

  if (successAlert) {
    successAlert.classList.remove("visible");
    successAlert.style.display = "none";
  }

  const target = type === "success" ? successAlert : errorAlert;

  if (target) {
    const alertText = target.querySelector(".alert-text");
    if (alertText) alertText.textContent = message;

    target.style.display = "flex";
    target.classList.add("visible");
  }
}

// ── 4. Pengiriman Form Login dan Register ──
function initAuthFormSubmitHooks() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  // A. Login Form
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("loginEmail")?.value;
      const password = document.getElementById("loginPassword")?.value;
      const remember = document.getElementById("rememberMe")?.checked;

      console.log("[UI Form Login] Data input:", {
        email,
        passwordLength: password?.length,
        remember
      });

      // DIPERBAIKI: arahkan request ke backend Express port 3000
      const loginUrl = "http://localhost:3000/api/auth/login";

      fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          rememberMe: remember
        })
      })
        .then(async (res) => {
          const data = await res.json();
          return { res, data };
        })
        .then(({ res, data }) => {
          if (res.ok && data.success) {
            localStorage.setItem("isLoggedIn", "true");

            showAuthAlert(
              "success",
              data.message || "Login berhasil! Mengalihkan ke halaman utama..."
            );

            setTimeout(() => {
              window.location.href = "index.html";
            }, 1000);
          } else {
            showAuthAlert(
              "error",
              data.message || "Email atau kata sandi salah."
            );
          }
        })
        .catch((err) => {
          console.error("[Login Error]:", err);
          showAuthAlert("error", "Koneksi ke backend server gagal.");
        });
    });
  }

  // B. Register Form
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nama = document.getElementById("registerName")?.value.trim();
      const email = document.getElementById("registerEmail")?.value.trim();
      const no_hp = document.getElementById("registerPhone")?.value.trim();
      const password = document.getElementById("registerPassword")?.value;
      const confirmPassword = document.getElementById("registerConfirmPassword")?.value;

      if (password !== confirmPassword) {
        showAuthAlert("error", "Konfirmasi kata sandi tidak cocok!");
        return;
      }

      try {
        // DIPERBAIKI: arahkan request ke backend Express port 3000
        const registerUrl = "http://localhost:3000/api/auth/register";

        const res = await fetch(registerUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nama,
            email,
            password,
            no_hp
          })
        });

        const data = await res.json();

        console.log("Status:", res.status);
        console.log("Respons backend:", data);

        if (res.ok && data.success) {
          showAuthAlert("success", data.message || "Registrasi berhasil.");
        } else {
          showAuthAlert("error", data.message || "Registrasi gagal.");
        }
      } catch (err) {
        console.error("Error register:", err);
        showAuthAlert("error", "Koneksi ke backend server gagal.");
      }
    });
  }
}

// ── 5. Status Tombol Login dan Logout ──
function updateAuthButtons() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const loginBtnDesktop = document.getElementById("navLoginBtnDesktop");
  const logoutBtnDesktop = document.getElementById("navLogoutBtnDesktop");
  const loginBtnMobile = document.getElementById("navLoginBtnMobile");
  const logoutBtnMobile = document.getElementById("navLogoutBtnMobile");

  if (loginBtnDesktop) {
    loginBtnDesktop.classList.toggle("auth-btn-hidden", isLoggedIn);
  }

  if (logoutBtnDesktop) {
    logoutBtnDesktop.classList.toggle("auth-btn-hidden", !isLoggedIn);
  }

  if (loginBtnMobile) {
    loginBtnMobile.classList.toggle("auth-btn-hidden", isLoggedIn);
  }

  if (logoutBtnMobile) {
    logoutBtnMobile.classList.toggle("auth-btn-hidden", !isLoggedIn);
  }
}

function handleLogout(e) {
  if (e) e.preventDefault();

  localStorage.removeItem("isLoggedIn");
  updateAuthButtons();
}

function initAuthButtons() {
  updateAuthButtons();

  const logoutBtns = document.querySelectorAll(
    "#navLogoutBtnDesktop, #navLogoutBtnMobile"
  );

  logoutBtns.forEach((btn) => {
    btn.removeAttribute("onclick");
    btn.onclick = handleLogout;
  });
}

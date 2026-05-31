const form = document.getElementById("registrationForm");
const alertBox = document.getElementById("alertBox");
const successCard = document.getElementById("successCard");
const successContent = document.getElementById("successContent");
const themeToggle = document.getElementById("themeToggle");

function setAlert(messages) {
  alertBox.innerHTML = messages.map((msg) => `<p>${msg}</p>`).join("");
  alertBox.classList.remove("hidden");
}

function clearAlert() {
  alertBox.classList.add("hidden");
  alertBox.innerHTML = "";
}

function setSuccessContent(data) {
  successContent.innerHTML = `
    <ul>
      <li><strong>Nama:</strong> ${data.fullName}</li>
      <li><strong>NIM:</strong> ${data.studentId}</li>
      <li><strong>Program:</strong> ${data.program}</li>
      <li><strong>Angkatan:</strong> ${data.batch}</li>
      <li><strong>Email:</strong> ${data.email}</li>
      <li><strong>No HP:</strong> ${data.phone}</li>
      <li><strong>Alamat:</strong> ${data.address}</li>
      <li><strong>Kota:</strong> ${data.city}</li>
      <li><strong>Kode Pos:</strong> ${data.postal}</li>
    </ul>
  `;
  successCard.classList.remove("hidden");
}

function validateForm(data) {
  const errors = [];
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\d+$/;
  const postalPattern = /^\d{5}$/;

  if (!data.fullName) errors.push("Nama lengkap wajib diisi.");
  if (!data.studentId) errors.push("NRP / NIM wajib diisi.");
  if (!data.program) errors.push("Program studi wajib dipilih.");
  if (!data.batch) errors.push("Angkatan wajib diisi.");
  if (!data.email) errors.push("Email wajib diisi.");
  if (!data.phone) errors.push("Nomor HP wajib diisi.");
  if (!data.address) errors.push("Alamat wajib diisi.");
  if (!data.city) errors.push("Kota wajib diisi.");
  if (!data.postal) errors.push("Kode pos wajib diisi.");

  if (data.email && !emailPattern.test(data.email)) {
    errors.push("Format email tidak valid.");
  }

  if (data.phone && !phonePattern.test(data.phone)) {
    errors.push("Nomor HP hanya boleh angka.");
  }

  if (data.postal && !postalPattern.test(data.postal)) {
    errors.push("Kode pos harus 5 digit angka.");
  }

  return errors;
}

// Handle submit form registrasi
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = {
    fullName: document.getElementById("fullName").value.trim(),
    studentId: document.getElementById("studentId").value.trim(),
    program: document.getElementById("program").value.trim(),
    batch: document.getElementById("batch").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    address: document.getElementById("address").value.trim(),
    city: document.getElementById("city").value.trim(),
    postal: document.getElementById("postal").value.trim(),
  };

  const errors = validateForm(data);
  if (errors.length > 0) {
    setAlert(errors);
    successCard.classList.add("hidden");
    return;
  }

  clearAlert();
  setSuccessContent(data);
  form.reset();
  successCard.scrollIntoView({ behavior: "smooth", block: "center" });
});

// Toggle dark mode sederhana
function setTheme(mode) {
  document.body.classList.toggle("dark", mode === "dark");
  themeToggle.textContent = mode === "dark" ? "Light Mode" : "Dark Mode";
  localStorage.setItem("theme", mode);
}

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  setTheme(isDark ? "light" : "dark");
});

// Inisialisasi halaman
const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

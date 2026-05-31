const form = document.getElementById("registrationForm");
const alertBox = document.getElementById("alertBox");
const successCard = document.getElementById("successCard");
const successContent = document.getElementById("successContent");
const themeToggle = document.getElementById("themeToggle");
const postalSearchForm = document.getElementById("postalSearchForm");
const provinceSearch = document.getElementById("provinceSearch");
const citySearch = document.getElementById("citySearch");
const districtSearch = document.getElementById("districtSearch");
const postalStatus = document.getElementById("postalStatus");
const postalResult = document.getElementById("postalResult");
const postalValue = document.getElementById("postalValue");
const postalLocation = document.getElementById("postalLocation");
const copyToForm = document.getElementById("copyToForm");

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

const postalData = [
  { province: "Jawa Timur", city: "Surabaya", district: "Sukolilo", postal: "60111" },
  { province: "Jawa Timur", city: "Sidoarjo", district: "Buduran", postal: "61252" },
  { province: "Jawa Timur", city: "Malang", district: "Lowokwaru", postal: "65141" },
  { province: "Jawa Tengah", city: "Semarang", district: "Tembalang", postal: "50275" },
  { province: "DI Yogyakarta", city: "Yogyakarta", district: "Depok", postal: "55281" },
  { province: "DKI Jakarta", city: "Jakarta Selatan", district: "Tebet", postal: "12810" },
  { province: "Jawa Barat", city: "Bandung", district: "Cicendo", postal: "40173" },
  { province: "Banten", city: "Tangerang", district: "Cipondoh", postal: "15148" },
  { province: "Bali", city: "Denpasar", district: "Denpasar Selatan", postal: "80224" },
  { province: "Sumatera Utara", city: "Medan", district: "Medan Baru", postal: "20154" },
  { province: "Kalimantan Timur", city: "Balikpapan", district: "Balikpapan Selatan", postal: "76114" },
  { province: "Sulawesi Selatan", city: "Makassar", district: "Panakkukang", postal: "90231" },
];

let latestPostalEntry = null;

function normalizeLocation(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\b(kabupaten|kab|kota)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findPostalEntry(province, city, district) {
  const normalizedProvince = normalizeLocation(province);
  const normalizedCity = normalizeLocation(city);
  const normalizedDistrict = normalizeLocation(district);

  return postalData.find((entry) => {
    return (
      normalizeLocation(entry.province) === normalizedProvince &&
      normalizeLocation(entry.city) === normalizedCity &&
      normalizeLocation(entry.district) === normalizedDistrict
    );
  });
}

function setPostalStatus(message, variant) {
  postalStatus.textContent = message;
  postalStatus.dataset.variant = variant;
  postalStatus.classList.remove("hidden");
}

function clearPostalStatus() {
  postalStatus.textContent = "";
  postalStatus.classList.add("hidden");
  postalStatus.removeAttribute("data-variant");
}

function showPostalResult(entry) {
  postalValue.textContent = entry.postal;
  postalLocation.textContent = `${entry.district}, ${entry.city}, ${entry.province}`;
  postalResult.classList.remove("hidden");
  copyToForm.disabled = false;
}

function clearPostalResult() {
  postalResult.classList.add("hidden");
  postalValue.textContent = "-";
  postalLocation.textContent = "";
  copyToForm.disabled = true;
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

postalSearchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const province = provinceSearch.value.trim();
  const city = citySearch.value.trim();
  const district = districtSearch.value.trim();

  if (!province || !city || !district) {
    setPostalStatus("Semua input pencarian wajib diisi.", "error");
    clearPostalResult();
    latestPostalEntry = null;
    return;
  }

  const entry = findPostalEntry(province, city, district);
  if (!entry) {
    setPostalStatus(
      "Data belum ditemukan. Coba ejaan lengkap atau gunakan contoh yang tersedia.",
      "error"
    );
    clearPostalResult();
    latestPostalEntry = null;
    return;
  }

  clearPostalStatus();
  showPostalResult(entry);
  latestPostalEntry = entry;
});

copyToForm.addEventListener("click", () => {
  if (!latestPostalEntry) return;
  document.getElementById("city").value = latestPostalEntry.city;
  document.getElementById("postal").value = latestPostalEntry.postal;
  setPostalStatus("Kode pos berhasil diisi ke form registrasi.", "success");
  document.getElementById("postal").focus();
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

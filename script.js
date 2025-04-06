const strengthLevels = {
  1: "Weak",
  2: "Weak",
  3: "Medium",
  4: "Strong",
  5: "Very Strong",
};
const strengthColors = {
  1: "#FF0000",
  2: "#FF0000",
  3: "#FFA500",
  4: "#FFFF00",
  5: "#008000",
};

const wrong = `<i class="fa-solid fa-xmark wrong"></i>`;
const right = `<i class="fa-solid fa-check correct"></i>`;

const passwordinp = document.getElementById("password");
const showBtn = document.querySelector(".eye");
const progressBar = document.querySelector(".strengthMeter");
const strengthText = document.querySelector(".strengthText");
const lengthIndi = document.querySelector(".length");
const uppCaseIndi = document.querySelector(".uppercase");
const lowCaseIndi = document.querySelector(".lowercase");
const numIndi = document.querySelector(".number");
const specIndi = document.querySelector(".special");
const cpyTxt = document.querySelector(".copyText");
const cpyBtn = document.querySelector(".cpyBtn");
const clipboard = document.querySelector(".clipBoard");

document.addEventListener("DOMContentLoaded", function () {
  passwordinp.addEventListener("input", checkStrength);
  showBtn.addEventListener("click", togglePasswordVisibility);
  passwordinp.addEventListener("input", updateStrengthMeter);
  cpyBtn.addEventListener("click", copyText);
});
function copyText() {
  const password = passwordinp.value;
  navigator.clipboard.writeText(password).then(() => {
    cpyTxt.innerHTML = "Password Copied!";
    this.querySelector("i").classList.toggle("fa-check");
    this.querySelector("i").classList.toggle("fa-copy");
    setTimeout(() => {
      this.querySelector("i").classList.toggle("fa-copy");
      this.querySelector("i").classList.toggle("fa-check");
      cpyTxt.innerHTML = "Copy to Clip Board..?";
    }, 2000);
  });
}
function checkStrength() {
  const password = passwordinp.value;
  if (password.length >= 8) {
    lengthIndi.innerHTML = right;
  } else {
    lengthIndi.innerHTML = wrong;
  }
  if (/[A-Z]/.test(password)) {
    uppCaseIndi.innerHTML = right;
  } else {
    uppCaseIndi.innerHTML = wrong;
  }
  if (/[a-z]/.test(password)) {
    lowCaseIndi.innerHTML = right;
  } else {
    lowCaseIndi.innerHTML = wrong;
  }
  if (/\d/.test(password)) {
    numIndi.innerHTML = right;
  } else {
    numIndi.innerHTML = wrong;
  }
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    specIndi.innerHTML = right;
  } else {
    specIndi.innerHTML = wrong;
  }
}
function togglePasswordVisibility() {
  const type =
    passwordinp.getAttribute("type") === "password" ? "text" : "password";
  passwordinp.setAttribute("type", type);

  // Toggle eye icon
  this.querySelector("i").classList.toggle("fa-eye");
  this.querySelector("i").classList.toggle("fa-eye-slash");
}
function updateStrengthMeter() {
  const password = passwordinp.value;
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
  progressBar.value = strength * 20;
  progressBar.style.setProperty("--progress-color", strengthColors[strength]);
  strengthText.textContent =
    "Password Strength: " +
    (strengthLevels[strength] === undefined
      ? "Very Weak"
      : strengthLevels[strength]);
  if (strength === 5) {
    clipboard.classList.toggle("hide");
  } else {
    clipboard.classList.add("hide");
  }
}

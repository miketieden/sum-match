const numbersDiv = document.getElementById("numbers");
const message = document.getElementById("message");
const targetEl = document.getElementById("target");
const resetBtn = document.getElementById("resetBtn");
const selectionEl = document.getElementById("selection");

let numbers = [];
let target = 0;
let selected = [];
let attempts = 3;

function newRound() {
  message.textContent = "";
  selectionEl.textContent = "";
  selected = [];
  attempts = 3;

  // Generate 6 unique random numbers (1–20)
  numbers = [];
  while (numbers.length < 6) {
    const n = Math.floor(Math.random() * 20) + 1;
    if (!numbers.includes(n)) numbers.push(n);
  }

  // Generate target (somewhat likely to be achievable)
  const randomIndices = numbers.sort(() => 0.5 - Math.random()).slice(0, 3);
  target = randomIndices.reduce((a, b) => a + b, 0);

  targetEl.textContent = `🎯 Target: ${target}`;
  renderNumbers();
}

function renderNumbers() {
  numbersDiv.innerHTML = "";
  numbers.forEach((n, i) => {
    const btn = document.createElement("div");
    btn.className = "number";
    btn.textContent = n;
    btn.addEventListener("click", () => handleSelect(i));
    numbersDiv.appendChild(btn);
  });
}

function handleSelect(index) {
  const numberDivs = document.querySelectorAll(".number");
  const num = numbers[index];

  // toggle selection
  if (selected.includes(num)) {
    selected = selected.filter(n => n !== num);
    numberDivs[index].classList.remove("selected");
  } else if (selected.length < 3) {
    selected.push(num);
    numberDivs[index].classList.add("selected");
  }

  selectionEl.textContent = `Your picks: ${selected.join(", ")}`;

  if (selected.length === 3) checkSum();
}

function checkSum() {
  const sum = selected.reduce((a, b) => a + b, 0);
  if (sum === target) {
    message.textContent = "🎉 Correct! You win!";
    disableAll();
  } else {
    attempts--;
    if (attempts > 0) {
      message.textContent = `❌ Not ${sum}. Try again (${attempts} left).`;
      clearSelection();
    } else {
      message.textContent = `😞 Out of tries. The correct sum was ${target}.`;
      disableAll();
    }
  }
}

function clearSelection() {
  selected = [];
  document.querySelectorAll(".number").forEach(n => n.classList.remove("selected"));
  selectionEl.textContent = "";
}

function disableAll() {
  document.querySelectorAll(".number").forEach(n => n.style.pointerEvents = "none");
}

resetBtn.addEventListener("click", newRound);

newRound();
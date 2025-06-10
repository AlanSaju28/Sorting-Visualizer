"use strict";

// Algorithm complexity data
const algorithmComplexity = {
  1: {
    // Bubble Sort
    name: "Bubble Sort",
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
  },
  2: {
    // Selection Sort
    name: "Selection Sort",
    best: "O(n²)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
  },
  3: {
    // Insertion Sort
    name: "Insertion Sort",
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
  },
  4: {
    // Merge Sort
    name: "Merge Sort",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    space: "O(n)",
  },
  5: {
    // Quick Sort
    name: "Quick Sort",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n²)",
    space: "O(log n)",
  },
  6: {
    // Radix Sort
    name: "Radix Sort",
    best: "O(nk)",
    average: "O(nk)",
    worst: "O(nk)",
    space: "O(n + k)",
  },
  7: {
    // Counting Sort
    name: "Counting Sort",
    best: "O(n + k)",
    average: "O(n + k)",
    worst: "O(n + k)",
    space: "O(k)",
  },
  8: {
    // Bucket Sort
    name: "Bucket Sort",
    best: "O(n + k)",
    average: "O(n + k)",
    worst: "O(n²)",
    space: "O(n)",
  },
};

// Performance tracking
let performanceStats = {
  comparisons: 0,
  swaps: 0,
  startTime: 0,
};

const updateAlgorithmInfo = (algoValue) => {
  const info = algorithmComplexity[algoValue];
  if (info) {
    document.getElementById("algoName").textContent = info.name;
    document.getElementById("bestCase").textContent = info.best;
    document.getElementById("avgCase").textContent = info.average;
    document.getElementById("worstCase").textContent = info.worst;
    document.getElementById("spaceComplexity").textContent = info.space;
  } else {
    document.getElementById("algoName").textContent = "Select an Algorithm";
    document.getElementById("bestCase").textContent = "-";
    document.getElementById("avgCase").textContent = "-";
    document.getElementById("worstCase").textContent = "-";
    document.getElementById("spaceComplexity").textContent = "-";
  }
};

const resetPerformanceStats = () => {
  performanceStats.comparisons = 0;
  performanceStats.swaps = 0;
  performanceStats.startTime = 0;
  updatePerformanceDisplay();
};

const updatePerformanceDisplay = () => {
  document.getElementById("comparisons").textContent =
    performanceStats.comparisons;
  document.getElementById("swaps").textContent = performanceStats.swaps;
  const elapsed = performanceStats.startTime
    ? Date.now() - performanceStats.startTime
    : 0;
  document.getElementById("timeElapsed").textContent = elapsed + "ms";
};

const start = async () => {
  let algoValue = Number(document.querySelector(".algo-menu").value);
  let speedValue = Number(document.querySelector(".speed-menu").value);

  if (speedValue === 0) {
    speedValue = 1;
  }
  if (algoValue === 0) {
    alert("No Algorithm Selected");
    return;
  }

  // Reset and start performance tracking
  resetPerformanceStats();
  performanceStats.startTime = Date.now();

  // Update performance display periodically during sorting
  const performanceInterval = setInterval(updatePerformanceDisplay, 100);

  let algorithm = new sortAlgorithms(speedValue);

  try {
    if (algoValue === 1) await algorithm.BubbleSort();
    if (algoValue === 2) await algorithm.SelectionSort();
    if (algoValue === 3) await algorithm.InsertionSort();
    if (algoValue === 4) await algorithm.MergeSort();
    if (algoValue === 5) await algorithm.QuickSort();
    if (algoValue === 6) await algorithm.RadixSort();
    if (algoValue === 7) await algorithm.CountingSort();
    if (algoValue === 8) await algorithm.BucketSort();
  } finally {
    clearInterval(performanceInterval);
    updatePerformanceDisplay();
  }
};

const RenderScreen = async () => {
  let algoValue = Number(document.querySelector(".algo-menu").value);
  updateAlgorithmInfo(algoValue);
  resetPerformanceStats();
  await RenderList();
};

const RenderList = async () => {
  let sizeValue = Number(document.querySelector(".size-menu").value);
  await clearScreen();

  let list = await randomList(sizeValue);
  const arrayNode = document.querySelector(".array");
  console.log(arrayNode);
  console.log(list);
  for (const element of list) {
    const node = document.createElement("div");
    node.className = "cell";
    node.setAttribute("value", String(element));
    node.style.height = `${3.8 * element}px`;
    arrayNode.appendChild(node);
  }
};

const RenderArray = async (sorted) => {
  let sizeValue = Number(document.querySelector(".size-menu").value);
  await clearScreen();

  let list = await randomList(sizeValue);
  if (sorted) list.sort((a, b) => a - b);

  const arrayNode = document.querySelector(".array");
  const divnode = document.createElement("div");
  divnode.className = "s-array";

  for (const element of list) {
    const dnode = document.createElement("div");
    dnode.className = "s-cell";
    dnode.innerText = element;
    divnode.appendChild(dnode);
  }
  arrayNode.appendChild(divnode);
};

const randomList = async (Length) => {
  let list = new Array();
  let lowerBound = 1;
  let upperBound = 100;

  for (let counter = 0; counter < Length; ++counter) {
    let randomNumber = Math.floor(
      Math.random() * (upperBound - lowerBound + 1) + lowerBound
    );
    list.push(parseInt(randomNumber));
  }
  return list;
};

const clearScreen = async () => {
  document.querySelector(".array").innerHTML = "";
};

const response = () => {
  let Navbar = document.querySelector(".navbar");
  if (Navbar.className === "navbar") {
    Navbar.className += " responsive";
  } else {
    Navbar.className = "navbar";
  }
};

document.querySelector(".icon").addEventListener("click", response);
document.querySelector(".start").addEventListener("click", start);
document.querySelector(".size-menu").addEventListener("change", RenderScreen);
document.querySelector(".algo-menu").addEventListener("change", RenderScreen);
window.onload = RenderScreen;

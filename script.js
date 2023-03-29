const canvas = document.getElementById("jscanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jscolor");
const range = document.getElementById("jsrange");
const eraseBtn = document.getElementById("jseraser");
const clearBtn = document.getElementById("jsclear");
const saveBtn = document.getElementById("jssave");
const INITIAL_COLOR = "#FFFFFF";

if (window.innerWidth < 768) {
    canvas.width = 500;
    canvas.height = 1000;
} else if (window.innerWidth >= 768 && window.innerWidth <= 1023) {
    canvas.width = 900;
    canvas.height = 1800;
} else {
    canvas.width = 2000;
    canvas.height = 1000;
}

ctx.fillStyle = "#145A32";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 5;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

let painting = false;
let lastX, lastY;
let currentLineWidth = ctx.lineWidth;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onTouchStart(event) {
    event.preventDefault();
    const x = event.touches[0].clientX;
    const y = event.touches[0].clientY;
    lastX = x;
    lastY = y;
    ctx.beginPath();
    ctx.moveTo(x, y);
    painting = true;
}

function onTouchEnd(event) {
    event.preventDefault();
    painting = false;
}

function onTouchMove(event) {
    event.preventDefault();
    const x = event.touches[0].clientX;
    const y = event.touches[0].clientY;
    ctx.lineTo(x, y);
    ctx.stroke();
    lastX = x;
    lastY = y;
}

function handleColorClick(event) {
    let color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.lineWidth = currentLineWidth;
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
    currentLineWidth = ctx.lineWidth;
}

function handleCM(event) {
    event.preventDefault();
}

function handleEraseClick() {
    currentLineWidth = ctx.lineWidth;
    ctx.strokeStyle = "#145A32";
    ctx.lineWidth = 55;
}

function handleClearClick() {
    ctx.fillStyle = "#145A32";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "Paint";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("touchmove", onTouchMove);
    canvas.addEventListener("touchstart", onTouchStart);
    canvas.addEventListener("touchend", onTouchEnd);
    canvas.addEventListener("touchcancel", stopPainting);
    canvas.addEventListener("contextmenu", handleCM);
}

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (eraseBtn) {
    eraseBtn.addEventListener("click", handleEraseClick);
}

if (clearBtn) {
    clearBtn.addEventListener("click", handleClearClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}

// Detect if the device being accessed is a mobile device
const isMobile = /iPhone|iPad|iPod|Android|BlackBerry|webOS|Opera Mini/i.test(navigator.userAgent);
"use strict";

let gCanvas;
let gCtx;
let gCurrPhoto = "";
let gLineLocation = 0;
let gLineFirst = 50;
let gCurrText = "";
let gFirstText = "";
let gIsFirst = true;
let gIsMiddle = false;
let gIsLast = false;
let gMiddleText = "";
let gLastText = "";
let gLineMiddel = 200;
let gLineLast = 380;
let isLineMiddel = false;
let gColorStrok = "red";
let gColorFill = "white";
let gAlign = "start";
let gImg = "";
let gFont = "impact";
let gFontSize = 40;
let gWidthFirst = 20;
let gWidthMiddle = 20;
let gWidthlast = 20;
let gSearchNames = [];
let gIsApper;
// let gOutLineFirst =
// let gOutLineMiddle =
// let gOutLineLast =

function init() {
  gCanvas = document.querySelector(".canvas");
  gCtx = gCanvas.getContext("2d"); //working on 2 demnsion . ctx holds methodes which can be implated to the canvas
  let elCanvasContainer = document.querySelector(".pohoto-to-dispaly");
  gCanvas.width = elCanvasContainer.offsetWidth;
  gCanvas.height = elCanvasContainer.offsetHeight;
  let elEditSection = document.querySelector(".edit-photo-container");
  elEditSection.classList.add("hide");
  renderGallary();
  window.addEventListener("resize", resizeCanvas);
}

// function resizeCanvas() {
//   let elContainer = document.querySelector(".pohoto-to-dispaly");
//   gCanvas.width = elContainer.offsetWidth;
//   gCanvas.height = elContainer.offsetHeight;
// }

function toogleVisability() {
  let elEditSection = document.querySelector(".edit-photo-container");
  elEditSection.classList.add("hide");
  let elMainGallary = document.querySelector(".main-content");
  elMainGallary.classList.remove("hide");
  let elYourOwnPhoto = document.querySelector(".own-photos");
  elYourOwnPhoto.classList.remove("hide");
  renderGallary();
}

function searchByKeyWords(value) {
  goSearch(value);
}

function renderGallary(galaary = gImgs) {
  let strHTML = "";
  galaary.forEach((img) => {
    strHTML += `
    <div class="card">
    <img onclick="showChoosenPhoto(this.src)"  class="card-image zoom"  src="${img.url}" alt=""  /> 
    <div class="card-tag"></div>
  </div>
  `;
  });
  let elMainGallary = document.querySelector(".main-content");
  elMainGallary.innerHTML = strHTML;
}

function showChoosenPhoto(src) {
  let elMainGallary = document.querySelector(".main-content");
  elMainGallary.classList.add("hide");
  let elEditSection = document.querySelector(".edit-photo-container");
  elEditSection.classList.remove("hide");
  let elYourOwnPhoto = document.querySelector(".own-photos");
  elYourOwnPhoto.classList.add("hide");
  let img = new Image();
  img.src = src;
  gCurrPhoto = img;
  gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function drawOutLine(linestart, width, line) {
  // gCtx.fillStyle = "rgba(0, 0, 0, 0.2)";
  // gCtx.strokeRect(10,linestart*0.9 , width,linestart )
}

function onTyping(ev, inputText) {
  let measureTextWidth = gCtx.measureText(inputText).width;
  let textWidthPos = 20;
  gCtx.font = `${gFontSize}` + "px" + " " + `${gFont}`;
  gCtx.strokeStyle = gColorStrok;
  gCtx.fillStyle = gColorFill;
  gCtx.textAlign = gAlign;
  gCtx.lineWidth = 1;
  // gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
  // gCtx.drawImage(gCurrPhoto, 0, 0, gCanvas.width, gCanvas.height);
  gCurrText = inputText;
  let char = gCurrText.substr(gCurrText[0]);
  //    textWidthPos = gCtx.measureText(char).width;
  // gCtx.fillText('gCurrText' ,width , gLineMiddel);

  // Draw blue rect outline

  // // Draw transparent yellow rect
  // ctx.fillStyle = "rgba(255, 255, 0, 0.75)";
  // ctx.fillRect(210, 180, 125, 125);

  if (gIsFirst) {
    gCtx.strokeText(inputText, gWidthFirst, gLineFirst);
    gCtx.fillText(inputText, gWidthFirst, gLineFirst);
    // drawOutLine(measureTextWidth,gLineFirst)
    gCtx.strokeText(gMiddleText, textWidthPos, gLineMiddel);
    gCtx.fillText(gMiddleText, textWidthPos, gLineMiddel);
    gCtx.strokeText(gLastText, textWidthPos, gLineLast);
    gCtx.fillText(gLastText, textWidthPos, gLineLast);
  }
  if (gIsMiddle) {
    gMiddleText = inputText;
    gCtx.strokeText(gFirstText, textWidthPos, gLineFirst);
    gCtx.fillText(gFirstText, textWidthPos, gLineFirst);
    gCtx.strokeText(inputText, textWidthPos, gLineMiddel);
    gCtx.fillText(inputText, textWidthPos, gLineMiddel);
    gCtx.strokeText(gLastText, textWidthPos, gLineLast);
    gCtx.fillText(gLastText, textWidthPos, gLineLast);
  }
  if (gIsLast) {
    gLastText = inputText;
    gCtx.strokeText(gFirstText, textWidthPos, gLineFirst);
    gCtx.fillText(gFirstText, textWidthPos, gLineFirst);
    gCtx.strokeText(gMiddleText, textWidthPos, gLineMiddel);
    gCtx.fillText(gMiddleText, textWidthPos, gLineMiddel);
    gCtx.strokeText(inputText, textWidthPos, gLineLast);
    gCtx.fillText(inputText, textWidthPos, gLineLast);
  }
}

function changeCoordsX(x) {
  let currActive;
  if (gIsLast) currActive = gLineLast;
  if (gIsMiddle) currActive = gLineMiddel;
  if (gIsFirst) currActive = gLineFirst;
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
  gCtx.drawImage(gCurrPhoto, 0, 0, gCanvas.width, gCanvas.height);
  gCtx.fillText(gCurrText, x, currActive);
}
function changeCoordsY(y) {
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
  gCtx.drawImage(gCurrPhoto, 0, 0, gCanvas.width, gCanvas.height);
  gCtx.fillText(gCurrText,  20,  y);
}

function colorChoiseStrok(color) {
  gColorStrok = color;
}
function colorChoiseFill(color) {
  gColorFill = color;
}

function addSticer(src) {
  let img = new Image();
  img.src = src;
  gCtx.drawImage(img, 0, 0, 200, 200);
}

function deleteLine() {
  if (gIsFirst) {
    gCtx.strokeText("A", 20, gLineFirst);
    gCtx.fillText("A", 20, gLineFirst);
  }
  if (gIsMiddle) gCtx.clearRect(0, 0, gCanvas.width, gLineMiddel);
  if (gIsLast) gCtx.clearRect(0, 0, gCanvas.width, gLineLast);
}

function SwitchLine() {
  if (gLineLocation === 0) {
    let metrics = gCtx.measureText(gLastText);
    gWidthFirst = metrics.width + 20;

    gCtx.strokeText(gLastText, 20, gLineLast);
    gCtx.fillText(gLastText, 20, gLineLast);
    gFirstText = gCurrText;
    gIsFirst = false;
    gIsMiddle = false;
    gIsLast = true;
    let measureTextWidth = gCtx.measureText(gLastText).width;
    drawOutLine(gLineLast, gCanvas.width, measureTextWidth);
  } else if (gLineLocation === 1) {
    let metrics = gCtx.measureText(gMiddleText);
    gWidthlast = metrics.width + 20;

    gCtx.strokeText(gMiddleText, 20, gLineMiddel);
    gCtx.fillText(gMiddleText, 20, gLineMiddel);
    gMiddleText = gCurrText;
    gIsFirst = false;
    gIsLast = false;
    gIsMiddle = true;
    drawOutLine(gCanvas.width, gLineMiddel);
  } else if (gLineLocation === 2) {
    gWidthMiddle = gCtx.measureText(gFirstText).width + 20;
    // gWidthMiddle = metrics.width +20;

    gCtx.strokeText(gFirstText, 20, gLineFirst);
    gCtx.fillText(gFirstText, 20, gLineFirst);
    gIsFirst = true;
    gIsMiddle = false;
    gIsLast = false;
    gLineLocation = -1;
    drawOutLine(gCanvas.width, gLineFirst);
  }
  gLineLocation++;
}

function onLihterPhoto() {
  gCtx.globalAlpha = 0.4;
}
function textChoise(value) {
  gFont = value;
}

function getImg(ev) {
  document.querySelector(".self-cards").style.display = "block";
  loadImageFromInput(ev, addImgToGallary);
}

function loadImageFromInput(ev, onImageReady) {
  let reader = new FileReader();
  reader.onload = (event) => {
    let img = new Image();
    img.onload = onImageReady.bind(null, img);
    img.src = event.target.result;

    gImg = img;
  };
  reader.readAsDataURL(ev.target.files[0]);
}
function addImgToGallary(img) {
  document.querySelector(".self-cards").innerHTML = `
    <div class="card">
    <img onclick="showChoosenPhoto(this.src)" src="${img.src}" alt="" class="card-image zoom" />
    <div class="card-tag"></div>
    </div>
    `;
}
function saveImg(elLink) {
  console.log("HI");
  let data = gCanvas.toDataURL();
  elLink.href = data;
}

function increaseFont() {
  gFontSize++;
}
function decreaseFont() {
  gFontSize--;
}

function onSetLeft() {
  document.querySelector(".text").classList.remove("rtl");
  gWidthFirst = 20;
  gWidthMiddle = 20;
  gWidthlast = 20;
  gAlign = "start";
  chooseLang("en");
  doTrans();
}
function onSetRight() {
  document.querySelector(".text").classList.add("rtl");
  gWidthFirst = 380;
  gWidthMiddle = 380;
  gWidthlast = 380;
  gAlign = "end";
  chooseLang("he");
  doTrans();
}
function onSetCenter() {
  document.querySelector(".text").classList.remove("rtl");
  gWidthFirst = gCanvas.height / 2;
  gWidthMiddle = gCanvas.height / 2;
  gWidthlast = gCanvas.height / 2;
  gAlign = "center";
  chooseLang("en");
  doTrans();
}

function searchByKeyWords(keyword) {
  goSearch(keyword);
}

function onKeyWordsToDisplay(keyword) {
  let strHTML = "";
  gIsApper = false;
  gSearchNames.forEach((value) => {
    if (value.name === keyword) {
      gIsApper = true;
      value.fontSize += 10;
    }
  });
  if (!gIsApper) {
    createSearchWord(keyword);
  }

  let elSearchWordsToDisplay = document.querySelector(".key-words-to-display");
  gSearchNames.forEach((name) => {
    strHTML += `
  <span class= "${name.name}"> ${name.name} </span> 
  `;
  });
  elSearchWordsToDisplay.innerHTML = strHTML;
  changeFont();
}

function changeFont() {
  gSearchNames.forEach((name) => {
    let elWord = document.querySelector(`.${name.name}`);
    elWord.style.fontSize = `${name.fontSize}px`;
  });
}

function createSearchWord(name, fontSize = 15) {
  let searchName = {
    name,
    fontSize,
  };
  gSearchNames.push(searchName);
}

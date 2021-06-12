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
let gNames = [];
let gSearchFont = {};
let gSearchNames = [];

function init() {
  gCanvas = document.querySelector(".canvas");
  gCtx = gCanvas.getContext("2d"); //working on 2 demnsion . ctx holds methodes which can be implated to the canvas
  let elCanvasContainer = document.querySelector(".pohoto-to-dispaly");
  gCanvas.width = elCanvasContainer.offsetWidth;
  gCanvas.height = elCanvasContainer.offsetHeight;
  let elEditSection = document.querySelector(".edit-photo-container");
  elEditSection.classList.add("hide");
  renderGallary();
}

function toogleVisability() {
  let elEditSection = document.querySelector(".edit-photo-container");
  elEditSection.classList.add("hide");
  let elMainGallary = document.querySelector(".main-content");
  elMainGallary.classList.remove("hide");
  let elYourOwnPhoto = document.querySelector(".own-photos");
  elYourOwnPhoto.classList.remove("hide");
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

// // mousedown event mimicks to drag start event and stores x, y cords to start the imaginary rectangle
// $canvas.addEventListener("mousedown", e => {
//     let cX = $canvas.getBoundingClientRect().left + window.scrollX;
//     let cY = $canvas.getBoundingClientRect().top + window.scrollY;
//     startX = e.pageX - cX;
//     startY = e.pageY - cY;
// });

// // mouseup event mimicks to drag end event and stores x, y cords to end the imaginary rectangle
// $canvas.addEventListener("mouseup", e => {
//     let cX = $canvas.getBoundingClientRect().left + window.scrollX;
//     let cY = $canvas.getBoundingClientRect().top + window.scrollY;
//     endX = e.pageX - cX;
//     endY = e.pageY - cY;

//     if (startX !== endX) {
//         if (startY > endY) {
//             let tempX = startX;
//             let tempY = startY;
//             startX = endX;
//             startY = endY;
//             endX = tempX;
//             endY = tempY;
//         }
//         drawRectangle();
//     }
// });

// // draws triangle with given x, y cords and random color
// function drawRectangle() {
//     ctx.beginPath();
//     ctx.fillStyle = randomColor(); // method to get random color
//     ctx.strokeStyle = "black";
//     ctx.lineWidth = 1;
//     ctx.moveTo(startX + (endX - startX) / 2, startY);
//     ctx.lineTo(startX, endY);
//     ctx.lineTo(endX, endY);
//     ctx.lineTo(startX + (endX - startX) / 2, startY);
//     ctx.stroke();
//     ctx.fill();
//     ctx.closePath();
// }

// // clear event to clear th canvas
// $clear.addEventListener('click', (e) => {
//     ctx.clearRect(0, 0, $canvas.width, $canvas.height);
// });

function onTyping(ev, inputText) {
  var measureTextWidth = gCtx.measureText(inputText).width;
  let textWidthPos = 20;
  gCtx.font = `${gFontSize}`+'px' + ' ' +  `${gFont}`;
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
  console.log(gWidthFirst, gWidthMiddle, gWidthlast);
  if (gIsFirst) {
    gCtx.strokeText(inputText, gWidthFirst, gLineFirst);
    gCtx.fillText(inputText, gWidthFirst, gLineFirst);
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
  } else if (gLineLocation === 1) {
    let metrics = gCtx.measureText(gMiddleText);
    gWidthlast = metrics.width + 20;

    gCtx.strokeText(gMiddleText, 20, gLineMiddel);
    gCtx.fillText(gMiddleText, 20, gLineMiddel);
    gMiddleText = gCurrText;
    gIsFirst = false;
    gIsLast = false;
    gIsMiddle = true;
  } else if (gLineLocation === 2) {
    gWidthMiddle = gCtx.measureText(gFirstText).width + 20;
    // gWidthMiddle = metrics.width +20;

    gCtx.strokeText(gFirstText, 20, gLineFirst);
    gCtx.fillText(gFirstText, 20, gLineFirst);
    gIsFirst = true;
    gIsMiddle = false;
    gIsLast = false;
    gLineLocation = -1;
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
  document.querySelector(".text").classList.remove("rtl")
  gWidthFirst = 20;
  gWidthMiddle = 20;
  gWidthlast = 20;
  gAlign = "start";
  chooseLang("en");
  doTrans();
}
function onSetRight() {
  document.querySelector(".text").classList.add("rtl")
  gWidthFirst = 380;
  gWidthMiddle = 380;
  gWidthlast = 380;
  gAlign = "end";
  chooseLang("he");
  doTrans();
}
function onSetCenter() {
  document.querySelector(".text").classList.remove("rtl")
  gWidthFirst = gCanvas.height / 2;
  gWidthMiddle = gCanvas.height / 2;
  gWidthlast = gCanvas.height / 2;
  gAlign = "center";
  chooseLang("en");
  doTrans();
}

function searchByKeyWords(keyword) {
  goSearch(keyword)
}


function onKeyWordsToDisplay(keyword) {
  let strHTML = '';
  if(!gSearchNames) gSearchNames.forEach((name)=>{
  if(name.name===keyword){
    gSearchNames.fontSize+=5;
  }
})
else{
  createSearchWord(keyword)
}
  
let elSearchWordsToDisplay = document.querySelector(".key-words-to-display");
gSearchNames.forEach((name)=>{
  strHTML+= `
  <span class = "${name.name}"> ${name.name} </span> 
  `
})
console.log(strHTML,gSearchNames);
elSearchWordsToDisplay.innerHTML = strHTML;
}

function createSearchWord(name,fontSize=5){
let searchName = {
  name,
  fontSize,
}
gSearchNames.push(searchName);
}
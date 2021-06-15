"use strict";

function init() {
  gCanvas = document.querySelector(".canvas");
  gCtx = gCanvas.getContext("2d"); //working on 2 demnsion . ctx holds methodes which can be implated to the canvas
  let elCanvasContainer = document.querySelector(".pohoto-to-dispaly");
  gCanvas.width = elCanvasContainer.offsetWidth;
  gCanvas.height = elCanvasContainer.offsetHeight;
  let elEditSection = document.querySelector(".edit-photo-container");
  elEditSection.classList.add("hide");
  renderGallary();
  // window.addEventListener("resize", resizeCanvas);
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

function showChoosenPhoto(src, el) {
  console.log(el);
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

function renderText() {}
// function onTyping(ev, inputText) {
//   let imgId = getImgId(gCurrPhoto);

//   // createMeme(imgId,selectedLineIdx, inputText)

//   let textWidthPos;
//   let measureTextWidth = gCtx.measureText(inputText).width;
//   let width = gCanvas.width-(gCanvas.width-measureTextWidth);
//   textWidthPos =   width+20;
//   gCtx.font = `${gFontSize}` + "px" + " " + `${gFont}`;
//   gCtx.strokeStyle = gColorStrok;
//   gCtx.fillStyle = gColorFill;
//   gCtx.textAlign = gAlign;
//   gCtx.lineWidth = 1;
//   gCurrText = inputText;
//   let char = gCurrText.substr(gCurrText[0]);

//   if (gIsFirst) {
//     gCtx.strokeText(inputText, gWidthFirst, gLineFirst);
//     gCtx.fillText(inputText, gWidthFirst, gLineFirst);

//     // drawOutLine(measureTextWidth,gLineFirst)
//     gCtx.strokeText(gMiddleText, textWidthPos, gLineMiddel);
//     gCtx.fillText(gMiddleText, textWidthPos, gLineMiddel);
//     gCtx.strokeText(gLastText, textWidthPos, gLineLast);
//     gCtx.fillText(gLastText, textWidthPos, gLineLast);
//   }
//   if (gIsMiddle) {
//     gMiddleText = inputText;
//     gCtx.strokeText(gFirstText, textWidthPos, gLineFirst);
//     gCtx.fillText(gFirstText, textWidthPos, gLineFirst);
//     gCtx.strokeText(inputText, textWidthPos, gLineMiddel);
//     gCtx.fillText(inputText, textWidthPos, gLineMiddel);
//     gCtx.strokeText(gLastText, textWidthPos, gLineLast);
//     gCtx.fillText(gLastText, textWidthPos, gLineLast);
//   }
//   if (gIsLast) {
//     gLastText = inputText;
//     gCtx.strokeText(gFirstText, textWidthPos, gLineFirst);
//     gCtx.fillText(gFirstText, textWidthPos, gLineFirst);
//     gCtx.strokeText(gMiddleText, textWidthPos, gLineMiddel);
//     gCtx.fillText(gMiddleText, textWidthPos, gLineMiddel);
//     gCtx.strokeText(inputText, textWidthPos, gLineLast);
//     gCtx.fillText(inputText, textWidthPos, gLineLast);
//   }
// }

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
  gCtx.fillText(gCurrText, 20, y);
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
function getInput(text) {
  updateMeme(text);
}
function drawInput() {}



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
  gWidth = 20;
  gAlign = "start";
  chooseLang("en");
  doTrans();
  gMeme.lines[gCurrIdx].txt='';
  drawOnCanvas(gMeme.lines);
}
function onSetRight() {
  document.querySelector(".text").classList.add("rtl");
  gWidth = 380;
  gAlign = "end";
  chooseLang("he");
  doTrans();
  gMeme.lines[gCurrIdx].txt='';
  drawOnCanvas(gMeme.lines);
}
function onSetCenter() {
  document.querySelector(".text").classList.remove("rtl");
  gWidth = gCanvas.height / 2;
  gAlign = "center";
  chooseLang("en");
  doTrans();
  gMeme.lines[gCurrIdx].txt='';
  drawOnCanvas(gMeme.lines);
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

let gMeme;
let gCurrIdx = 0;

function getInput(text,ev) {
if(ev.which ===8 || ev.which === 46){
 text=text.substr(0,text.length-1);
 gCurrText = text;
 gMeme.lines[gCurrIdx].txt=text
 drawOnCanvas(gMeme.lines);
}
 else{
  gCurrText = text;
  if (!gMeme) createMeme(text);
  gMeme.lines[gCurrIdx].txt+=gCurrText.charAt(text.length-1) 
  drawOnCanvas(gMeme.lines);
 } 
}
function addLine() {
  gCurrIdx++;
  gCurrText = "";
  let line = {
    txt:  gCurrText,
    height: 40 * gCurrIdx + 50,
  };
  if (gMeme.lines[gCurrIdx]===undefined) gMeme.lines[gCurrIdx]=line;
  else {gMeme.lines.push(line)}
  drawOnCanvas(gMeme.lines);
}
function createMeme(txt) {
  gMeme = {
    lines: [
      { txt: txt, height: 40 * gCurrIdx + 50 },
    ],
  };
  gMemes.push(gMeme);
  return gMeme;
}
let gWidth=30;


function drawOnCanvas(memelines) {
  memelines.forEach((line) => {
    gCtx.font = `${gFontSize}` + "px" + " " + `${gFont}`;
    gCtx.strokeStyle = gColorStrok;
    gCtx.fillStyle = gColorFill;
    gCtx.textAlign = gAlign;
    gCtx.lineWidth = 1;
      gCtx.shadowColor = 'rgba(0,0,0,0.5)';
    gCtx.shadowBlur = 2;
    gCtx.lineJoin = 'bevel';
    gCtx.lineWidth = 1;
    gCtx.strokeStyle = 'black';
    gCtx.strokeRect(20, line.height+3 , gCanvas.width-50, -36);
    gCtx.strokeText(line.txt, gWidth, line.height);
    gCtx.fillText(line.txt, gWidth, line.height);
  });
}


function switchLine() {
  let line;
  if (gCurrIdx !== 50 && gCurrIdx !== 70) {
    gCurrIdx = 70;
    gCurrText=''
    line = {
      txt: gCurrText='',
      height: gCanvas.height-30,
    };
    if (gMeme.lines[70]===undefined||!gMeme.lines[70]) gMeme.lines[70]=line;
    return
  }

  if ( gCurrIdx === 50) {
    gCurrIdx = 0;
    gCurrText = "";
    line = {
      txt : gCurrText,
      height: 70,
    };
    if (!gMeme.lines[gCurrIdx]) gMeme.lines.push(line);
    drawOnCanvas(gMeme.lines);
    return
  }

  if (gCurrIdx === 70 ) {
    gCurrIdx = 50;
    gCurrText = "";
    line = {
      txt : gCurrText,
      height: gCanvas.height/2,
     
    };
    if (gMeme.lines[50]===undefined||!gMeme.lines[50]) gMeme.lines[50]=line;
    drawOnCanvas(gMeme.lines);
    return
  }

}


function deleteLine() {
for (const meme of gMeme) {
 console.log(meme); 
}
}
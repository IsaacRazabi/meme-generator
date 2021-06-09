"use strict";

let gCanvas;
let gCtx;
let gStartPosition = {};
let gLastPosition = {};
let gCurrPhoto = "";
let gLineLocation = 0;
let gCanvasHeight = 50;

function init() {
  gCanvas = document.querySelector(".canvas");
  gCtx = gCanvas.getContext("2d"); //working on 2 demnsion . ctx holds methodes which can be implated to the canvas
  let elCanvasContainer = document.querySelector(".pohoto-to-dispaly");
  gCanvas.width = elCanvasContainer.offsetWidth;
  gCanvas.height = elCanvasContainer.offsetHeight;
  let elEditSection = document.querySelector(".edit-photo-container");
  elEditSection.classList.add("hide");
}

function showChoosenPhoto(src) {
  let elMainGallary = document.querySelector(".main-content");
  elMainGallary.classList.add("hide");
  let elEditSection = document.querySelector(".edit-photo-container");
  elEditSection.classList.remove("hide");
  //   elEditSection.classList.remove("hide");
  let img = new Image();
  img.src = src;
  gCurrPhoto = img;

  gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function onTyping(font = "40px Impact") {
  let inputText = "";
  let textPosX = 20;
  let text = document.querySelector(".text");
  text.addEventListener("input", (ev) => {
    inputText = ev.target.value;
    gCtx.font = font;
    // ctx.fillStyle = "red";/
    // gCtx.globalCompositeOperation = "lighter";
    gCtx.strokeText(inputText, textPosX, gCanvasHeight);
    console.log(ev);
  });

  text.addEventListener("keydown", (event) => {
    let KeyID = event.keyCode;
    switch (KeyID) {
      case 8:
        gCtx.font = "40px Impact";
        gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
        gCtx.strokeText(
          inputText.substr(0, inputText.length - 1),
          20,
          gCanvasHeight
        );
        gCtx.drawImage(gCurrPhoto, 0, 0, gCanvas.width, gCanvas.height);

        break;
      case 46:
        gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
        gCtx.strokeText(
          inputText.substr(0, inputText.length - 1),
          20,
          canvasHeight
        );
        gCtx.drawImage(gCurrPhoto, 0, 0, gCanvas.width, gCanvas.height);
        break;
      default:
        break;
    }
  });
}
function SwitchLine() {
    console.log(gLineLocation);
    if(gLineLocation === 0 ) {
        gCanvasHeight = gCanvas.height / 2;
        gLineLocation++;
      }
  else  if (gLineLocation === 1) {
        gCanvasHeight = gCanvas.height - 10;
        gLineLocation++;
    }
 else if (gLineLocation === 2) {
    gCanvasHeight = 50;
    gLineLocation=0;
  }
}

function onLihterPhoto() {
  gCtx.globalAlpha = 0.4;
}
function textChoise(value) {
  onTyping(value);
}

function getImg(ev) {
  loadImageFromInput(ev, renderImg);
}

function loadImageFromInput(ev, onImageReady) {
  document.querySelector(".share-container").innerHTML = "";
  let reader = new FileReader();
  reader.onload = (event) => {
    let img = new Image();
    img.onload = onImageReady.bind(null, img);
    img.src = event.target.result;
    gImg = img;
  };
  reader.readAsDataURL(ev.target.files[0]);
}
function renderImg(img) {
  gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

// on submit call to this function
function uploadImg(elForm, ev) {
  ev.preventDefault();
  document.getElementById("imgData").value = gElCanvas.toDataURL("image/jpeg");

  // A function to be called if request succeeds
  function onSuccess(uploadedImgUrl) {
    uploadedImgUrl = encodeURIComponent(uploadedImgUrl);
    document.querySelector(".share-container").innerHTML = `
    <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
       Share   
    </a>`;
  }
  let inputVal = elForm.querySelector("input").value;
  doUploadImg(elForm, onSuccess, inputVal);
}

function doUploadImg(elForm, onSuccess) {
  var formData = new FormData(elForm);
  console.log("doUploadImg -> formData", formData);
  fetch("//ca-upload.com/here/upload.php", {
    method: "POST",
    body: formData,
  })
    .then(function (res) {
      return res.text();
    })
    .then(onSuccess)
    .catch(function (err) {
      console.error(err);
    });
}

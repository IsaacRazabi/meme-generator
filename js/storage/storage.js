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

let gKeywords = {
  "Ancient Aliens": 0,
  "funny puk": 0,
  baby: 0,
  dog: 0,
  cat: 0,
  matrix: 0,
  drevil: 0,
  listen: 0,
  hugging: 0,
  leo: 0,
  obama: 0,
  "One Does Not Simply": 0,
  Oprah: 0,
  patrick: 0,
  " putin": 0,
  trump: 0,
  tzadik: 0,
  "tzlili hamozika": 0,
  whatt: 0,
  Everywhere: 0,
};
let gImgs = [
  {
    id: _makeId(),
    url: "images/meme-imgs/Ancient-Aliens.jpg",
    keywords: ["Ancient Aliens"],
  },
  {
    id: _makeId(),
    url: "images/meme-imgs/baby-dog.jpg",
    keywords: ["baby dog"],
  },
  { id: _makeId(), url: "images/meme-imgs/baby2.jpg", keywords: ["baby"] },
  { id: _makeId(), url: "images/meme-imgs/baby.jpg", keywords: ["baby"] },
  { id: _makeId(), url: "images/meme-imgs/baby3.jpg", keywords: ["baby"] },
  { id: _makeId(), url: "images/meme-imgs/baby4.jpg", keywords: ["baby"] },
  { id: _makeId(), url: "images/meme-imgs/cat2.jpg", keywords: ["cat"] },
  { id: _makeId(), url: "images/meme-imgs/cat.jpg", keywords: ["cat"] },
  { id: _makeId(), url: "images/meme-imgs/choose.jpg", keywords: ["matrix"] },
  { id: _makeId(), url: "images/meme-imgs/dog.jpg", keywords: ["dog"] },
  { id: _makeId(), url: "images/meme-imgs/drevil.jpg", keywords: ["drevil"] },
  {
    id: _makeId(),
    url: "images/meme-imgs/im-lisetning.jpg",
    keywords: ["listen"],
  },
  { id: _makeId(), url: "images/meme-imgs/boston.jpg", keywords: ["hugging"] },
  { id: _makeId(), url: "images/meme-imgs/leo.jpg", keywords: ["leo"] },
  { id: _makeId(), url: "images/meme-imgs/obama.jpg", keywords: ["obama"] },
  {
    id: _makeId(),
    url: "images/meme-imgs/One-Does-Not-Simply.jpg",
    keywords: ["One Does Not Simply"],
  },
  {
    id: _makeId(),
    url: "images/meme-imgs/Oprah-You-Get-A.jpg",
    keywords: ["Oprah"],
  },
  { id: _makeId(), url: "images/meme-imgs/patrick.jpg", keywords: ["patrick"] },
  { id: _makeId(), url: "images/meme-imgs/putin.jpg", keywords: ["putin"] },
  { id: _makeId(), url: "images/meme-imgs/trump.jpg", keywords: ["trump"] },
  { id: _makeId(), url: "images/meme-imgs/trump2.jpg", keywords: ["trump"] },
  { id: _makeId(), url: "images/meme-imgs/tzadik.jpg", keywords: ["tzadik"] },
  {
    id: _makeId(),
    url: "images/meme-imgs/tzlili.jpg",
    keywords: ["tzlili hamozika"],
  },
  { id: _makeId(), url: "images/meme-imgs/whatt.jpg", keywords: ["whatt"] },
  {
    id: _makeId(),
    url: "images/meme-imgs/X-Everywhere.jpg",
    keywords: ["Everywhere"],
  },
];
// let gMeme = {};
let gMemes = [];
// let gMeme={}


  function getImgId(src){
    let imgId = gImgs.find((img)=>{
      img===src;
    })
}

// function createMeme(imgId,selectedLineIdx,txt){
//   let gMeme = {
//     selectedImgId: imgId,
//     selectedLineIdx:selectedLineIdx,
//     lines: [
//       { txt: txt, size: 20, align: "left", color: "red" },
//     ],
//   };
//   gMemes.push(gMeme)
//   return meme;
// }

// function createMemes() {
//   gMemes = createMeme();
// }

function updateKeyWords(name) {
  for (const keyword in gKeywords) {
    if (keyword.includes(name)) {
      gKeywords[keyword]++;
      onKeyWordsToDisplay(name);
    }
  }
}

function goSearch(value) {
  updateKeyWords(value);
  let filteredBySearch = [];
  gImgs.forEach((name) => {
    if (name.keywords[0].includes(value)) filteredBySearch.push(name);
  });
  renderGallary(filteredBySearch);
}

// on submit call to this function
function uploadImg(elForm, ev) {
  ev.preventDefault();
  document.getElementById("imgData").value = gElCanvas.toDataURL("image/jpeg");

  // A function to be called if request succeeds
  function onSuccess(uploadedImgUrl) {
    uploadedImgUrl = encodeURIComponent(uploadedImgUrl);
    document.querySelector(".share").innerHTML = `
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

function _makeId(length = 5) {
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}


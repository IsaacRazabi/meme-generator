let gCurrLang = "en";
let gTrans = {
  Download: {
    en: "Download your work",
    he: "הורד את המם שלך",
  },
  share: {
    en: "share",
    he: "העלה לפייסבוק",
  },
};

function getTrans(titleKey) {
  let keyTrans = gTrans[titleKey];
  if (!keyTrans) return "UNKNOWN";
  let txt = keyTrans[gCurrLang];
  if (!txt) return keyTrans.en;
  return txt;
}

function doTrans() {
  let elTranslate = document.querySelectorAll("[data-trans]");
  elTranslate.forEach((el) => {
    let txt = getTrans(el.dataset.trans);
    if (el.nodeName === "INPUT") el.placeholder = txt;
    else el.innerText = txt;
  });
}

function chooseLang(lang) {
  gCurrLang = lang;
}

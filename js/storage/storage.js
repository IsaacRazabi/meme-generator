let gKeywords = { happy: 12, "funny puk": 1 };
let gImgs = [{ id: 1, url: "img/popo.jpg", keywords: ["happy"] }];
// let gMeme = {
//   selectedImgId: 5,
//   selectedLineIdx: 0,
//   lines: [
//     {
//       txt: "I never eat Falafel",
//       size: 20,
//       align: "left",
//       color: "red",
//     },
//   ],
// };

let gMeme=[];

function createMeme() {
    let meme = {
        selectedImgId: 5,
        selectedLineIdx: 0,
        lines: [
          {
            txt: "I never eat Falafel",
            size: 20,
            align: "left",
            color: "red",
          },
        ],
    }
    return meme;
}

function createMemes() {
    gMeme = createMeme();
}

const Memeify = require('./Memeify');
const TextFormatter = require('./TextFormatter');
const fs = require('fs');
const { updateTweetWithMock } = require('./twitterClient');

const textFormatter = new TextFormatter(
  'maen ke rumah gebetan, pas mau pulang sengaja ninggalin barang biar ada alasan maen ke rumahnya lagi maen ke rumah gebetan, pas mau pulang sengaja ninggalin barang biar ada alasan maen ke rumahnya lagi maen ke rumah gebetan, pas mau pulang sengaja ninggalin barang biar ada alasan maen ke rumahnya lagi '
);

const mockText = textFormatter.mockText();
const mickTixt = textFormatter.mickTixt();

const memeGenerator = new Memeify();
// memeGenerator.generateMeme('spongebob', mockText);
// memeGenerator.generateMeme('khaleesi', mickTixt);

// const sleep = ms => {
//   return new Promise(resolve => {
//     setTimeout(resolve, ms);
//   });
// };

// (async () => {
//   const imgPath = await memeGenerator.generateMeme('khaleesi', mockText);
//   await sleep(1500);
//   updateTweetWithMock('1299324070647873536', mockText, imgPath);
// })();

let text = 'please💩 anjay juga'.split(' ');
text.map(t => {
  if (t.match(/\bplease/g)) {
    if (t.length > 6) {
      console.log('please in emoji');
      const textTransformoji = textFormatter.transformoji(t.substr(-2));
      console.log(textTransformoji);
    } else {
      console.log('normal please');
    }
  }
});

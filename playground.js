const Memeify = require('./Memeify');
const TextFormatter = require('./TextFormatter');
const fs = require('fs');
const { updateTweetWithMock } = require('./twitterClient');

const textFormatter = new TextFormatter(
  'maen ke rumah gebetan, pas mau pulang sengaja ninggalin barang biar ada alasan maen ke rumahnya lagi'
);

const mockText = textFormatter.mockText();

const memeGenerator = new Memeify();

const sleep = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

(async () => {
  const imgPath = await memeGenerator.generateMeme('khaleesi', mockText);
  await sleep(1500);
  updateTweetWithMock('1299324070647873536', mockText, imgPath);
})();

// memeGenerator.generateMeme('spongebob', mockText);

// const imgPath = fs.readFileSync('./img/mock_spongebob_generated.png');
// updateTweetWithMock(
//   '1299524304086818816',
//   'mockthistweetv2',
//   './img/mock_spongebob_generated.png'
// );

const Jimp = require('jimp');
const { sleep } = require('./helper');

class Memeify {
  async generateMeme(type, imageCaption) {
    const image =
      type == 'spongebob'
        ? './img/mock_spongebob.png'
        : './img/mock_khaleesi.png';
    const outputImage =
      type == 'spongebob'
        ? './img/mock_spongebob_generated.png'
        : './img/mock_khaleesi_generated.png';
    await Jimp.read(image)
      .then(async image => {
        await Jimp.loadFont('font/impact.fnt').then(font => {
          let textHeight = Jimp.measureTextHeight(
            font,
            imageCaption,
            image.bitmap.width
          );
          let bottomPos = image.bitmap.height - textHeight - 25;
          image.print(
            font,
            0,
            bottomPos,
            {
              text: imageCaption,
              alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
            },
            image.bitmap.width,
            image.bitmap.height
          );
          image.write(outputImage);
          console.log('Meme generated');
        });
      })
      .catch(err => {
        console.log(err);
      });
    await sleep(1500);
    return outputImage;
  }
}

module.exports = Memeify;

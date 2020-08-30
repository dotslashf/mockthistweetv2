const Jimp = require('jimp');

class Memeify {
  generateMeme(type, imageCaption) {
    const image =
      type == 'spongebob' ? 'img/mock_spongebob.png' : 'img/mock_khaleesi.png';
    const outputImage =
      type == 'spongebob'
        ? 'img/mock_spongebob_generated.png'
        : 'img/mock_khaleesi_generated.png';
    Jimp.read(image)
      .then(image => {
        Jimp.loadFont('font/impact.fnt').then(font => {
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
            image.bitmap.width - 20,
            image.bitmap.height
          );
          image.write(outputImage);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = Memeify;

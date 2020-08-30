class TextFormatter {
  constructor(inputText) {
    this.text = this._removeBadChars(inputText);
  }

  _removeBadChars(text) {
    const regex = /[a-zA-Z0-9!?$&()\\-`.+,/\'\"]+/g;
    return text.match(regex).join(' ');
  }

  mockText() {
    let outPutText = '',
      mockModifier = Math.round(Math.random());
    let text = this.text.toLowerCase();
    for (let index = 0; index < text.length; index++) {
      if (index % 2 == mockModifier) {
        outPutText += text[index].toUpperCase();
      } else {
        outPutText += text[index];
      }
    }
    return outPutText;
  }

  mickTixt() {
    let outPutText = '';
    let text = this.text.toLowerCase();
    const vocal = ['a', 'i', 'u', 'e', 'o'];
    for (let index = 0; index < text.length; index++) {
      if (vocal.includes(text[index])) {
        outPutText += 'i';
      } else {
        outPutText += text[index];
      }
    }
    return outPutText;
  }

  transformoji(emoji) {
    let text = this.text.split(' ').join(emoji);
    return (text += emoji);
  }
}

module.exports = TextFormatter;

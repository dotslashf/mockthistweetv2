let emoji1 = 'please💩';
let emoji2 = 'please🚀';
let emoji3 = 'please🐈';

const inputText =
  "Lorem @ipsum #dolor sit amet, consectetur adipiscing elit???'. Phasellus eu porta nisi. Ut sed nunc in turpis porttitor";

class textFormatter {
  constructor(text) {
    this.text = this._removeBadChars(text);
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

const textF = new textFormatter(inputText);
const ce1 = emoji1.slice(-2);
const ce2 = emoji2.slice(-2);
const ce3 = emoji3.slice(-2);
console.log(
  `${textF.mockText()}\n${textF.mickTixt()}\n${textF.transformoji(
    ce1
  )}\n${textF.transformoji(ce2)}\n${textF.transformoji(ce3)}`
);

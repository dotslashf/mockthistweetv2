const Memeify = require('./Memeify');
const TextFormatter = require('./TextFormatter');

const textFormatter = new TextFormatter(
  'hello from mockthistweetv2 built using js, i hope this is works on both image hello from mockthistweetv2 built using js, i hope this is works on both image hello from mockthistweetv2 built using js, i hope this is works on both image'
);

const mockText = textFormatter.mockText();
const mickTixt = textFormatter.mickTixt();

const memeGenerator = new Memeify();

memeGenerator.generateMeme('khaleesi', mickTixt);
memeGenerator.generateMeme('spongebob', mockText);

const ALPHABET_LENGTH = 26;
const alphabetOffset = 'A'.charCodeAt();

function isCharLowercase(char) {
  return char.match(/[a-z]/);
}

function processString(string, key) {
  return string.split('').map((char) => {
    let newChar = char;
    if (char.match(/[A-z]/)) {
      const isLowercase = isCharLowercase(char);
      const upperCaseChar = char.toUpperCase();
      newChar = String.fromCharCode((upperCaseChar.charCodeAt() - alphabetOffset + key + ALPHABET_LENGTH) % ALPHABET_LENGTH + alphabetOffset);
      if (isLowercase) {
        newChar = newChar.toLowerCase();
      }
    }
    return newChar;
  }).join('');
}

function encode(string, key) {
  return processString(string, key);
}

function decode(string, key) {
  const invertedKey = -key;
  return processString(string, invertedKey);
}

module.exports = {
  encode,
  decode
};
const getCommandLineParams = require('./params_processing');
const { encode, decode } = require('./cipher');
const { Transform, pipeline } = require('stream');

class Transformer extends Transform {
  constructor(action, shift) {
    super();
    this.action = action;
    this.shift = shift;
  }

  _transform(chunk, _encoding, callback) {
    const source = chunk.toString('utf8');
    const cipherFunction = this.action === 'encode' ? encode : decode;
    const result = cipherFunction(source, this.shift);
    this.push(result);
    callback();
  }
}

let params = {};
try {
  params = getCommandLineParams();
} catch (error) {
  console.error(error.message);
  process.exit(-1);
}

pipeline(
  params.input,
  new Transformer(params.action, params.shift),
  params.output,
  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
      process.exit(-1);
    }
  }
);
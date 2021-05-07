const minimist = require('minimist');
const fs = require('fs');

const POSSIBLE_ACTIONS = {
  encode: 'encode',
  decode: 'decode'
};

function prepareAttributes(args) {
  const result = {};
  result.shift = args.s || args.shift;
  result.action = args.a || args.action;
  result.input = args.i || args.input;
  result.output = args.o || args.output;
  return result;
}

function validateArgs(args) {
  if (!args.shift) {
    throw new Error('Argument -s (--shift) must be present');
  }

  if (!Number.isInteger(args.shift)) {
    throw new Error('Argument -s (--shift) must be integer');
  }

  if (!args.action || Object.values(POSSIBLE_ACTIONS).indexOf(args.action) === -1) {
    throw new Error('Argument -a (--action) must be present and equal to "encode" or "decode"');
  }

  if (args.input) {
    validateFile(args.input, 'read');
  }

  if (args.output) {
    validateFile(args.output, 'write');
  }
}

function validateFile(filename, accessType = 'read') {
  if (fs.existsSync(filename)) {
    try {
      fs.accessSync(filename, accessType === 'read' ? fs.constants.R_OK : fs.constants.W_OK);
    } catch (err) {
      throw new Error(`File ${filename} is not accessible for ${accessType}`);
    }
  } else {
    throw new Error(`File ${filename} doesn't exist`);
  }
}

function normalizeArgs(args) {
  const MAXIMAL_SHIFT = 26;
  args.shift = ((args.shift % MAXIMAL_SHIFT) + MAXIMAL_SHIFT) % MAXIMAL_SHIFT;
  args.input = args.input ? fs.createReadStream(args.input) : process.stdin;
  args.output = args.output ? fs.createWriteStream(args.output) : process.stdout;
}


function getCommandLineParams() {
  const argv = minimist(process.argv.slice(2));
  const preparedArgs = prepareAttributes(argv);
  validateArgs(preparedArgs);
  normalizeArgs(preparedArgs);
  return preparedArgs;
}

module.exports = getCommandLineParams;
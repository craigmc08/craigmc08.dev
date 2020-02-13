require('./mustache-build');

const rollup = require('rollup');

const options = require('../rollup.config');

function build() {
  return Promise.all(options.map(async option => {
    const bundle = await rollup.rollup(option);

    console.log(`Building ${option.input}`);
  
    await bundle.write(option.output);
  }));
}

build();

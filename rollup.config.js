// glob pattern input file matching from
// https://github.com/rollup/rollup/issues/1435#issue-233487806

const globby = require('globby');

const nodeResolve = require('rollup-plugin-node-resolve');

module.exports = globby.sync('src/*.js').map(inputFile => ({
    input: inputFile,
    output: {
        file: inputFile.replace('src', 'dist/js'),
        format: 'iife',
    },
    plugins: [
        nodeResolve({ preferBuiltIns: true }),
    ],
}));

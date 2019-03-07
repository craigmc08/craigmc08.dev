// glob pattern input file matching from
// https://github.com/rollup/rollup/issues/1435#issue-233487806

import globby from 'globby';

import nodeResolve from 'rollup-plugin-node-resolve';

export default globby.sync('src/*.js').map(inputFile => ({
    input: inputFile,
    output: {
        file: inputFile.replace('src', 'dist/js'),
        format: 'iife',
    },
    plugins: [
        nodeResolve({ preferBuiltIns: true }),
    ],
}));
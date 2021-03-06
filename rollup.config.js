// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';

export default {
    entry: 'src/main.js',
    format: 'cjs',
    plugins: [ resolve() ],
    dest: 'dist/bundle.js'
};
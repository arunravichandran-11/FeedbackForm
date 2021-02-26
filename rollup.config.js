// import babel from 'rollup-plugin-babel';
import scss from 'rollup-plugin-scss';
export default {
  input: 'src/main.js',
  output: {
    file: 'build/js/bundle.js',
  },
  plugins: [
    scss({
            outputStyle: 'compressed',
            output: 'build/styles/bundle.css',
    })
  ]
};

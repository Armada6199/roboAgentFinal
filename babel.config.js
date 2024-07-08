// module.exports = { presets: ["@babel/preset-env"] };
module.exports = {
    presets: [
      ['@babel/preset-env', { targets: 'defaults' }],
      '@babel/preset-typescript',
      ['@babel/preset-react', { runtime: 'automatic', development: process.env.NODE_ENV !== 'production' }],
    ],
    plugins: ['@babel/plugin-transform-runtime', 'babel-plugin-styled-components'],
  };
  
  
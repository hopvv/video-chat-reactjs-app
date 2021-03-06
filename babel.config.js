module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
        forceAllTransforms: true,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: ['@babel/plugin-proposal-object-rest-spread'].filter(
    Boolean,
  ),
}
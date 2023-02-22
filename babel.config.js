module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: './app',
          alias: {
            '@components': './app/components',
            '@constants': './app/constants',
            '@config': './app/config',
            '@services': './app/services',
            '@screens': './app/screens',
            '@hooks': './app/hooks',
            '@navigation': './app/navigation',
            '@utils': './app/utils',
            '@assets': './app/assets',
            '@theme': './app/theme',
            '@api': './app/api',
            '@redux': './app/redux',
          },
        },
      ],
      'react-native-reanimated/plugin',
      'transform-inline-environment-variables',
    ],
  }
}

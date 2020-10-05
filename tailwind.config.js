module.exports = {
  important: true,
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    enabled: true,
    content: ['./src/**/*.js', './public/index.html'],
  }, 
  theme: {
    extend: {
      colors: {
        'noclope-green': "#31D0B5",
        'noclope-darkgreen': "#27AB95",
        'noclope-gray': "#F8F8F8"
      }
    },
  },
  variants: {},
  plugins: [],
}

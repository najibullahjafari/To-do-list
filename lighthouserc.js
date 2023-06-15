module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'], // Add your application's URL here
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};

module.exports = {
  server: {
    host: "localhost",
    port: 3000,
  },
  database: {
    url: "mongodb://localhost/book",
    properties: {
      useMongoClient: true,
    },
  },
  key: {
    privateKey: "amir_amir_amir",
    tokenExpiry: 1 * 30 * 1000 * 60,
  },
};

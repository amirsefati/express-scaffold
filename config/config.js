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
    tokenExpireInMinutes: 1440,
  },
};

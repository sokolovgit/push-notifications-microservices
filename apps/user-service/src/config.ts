export default () => ({
  database: {
    url: process.env.DATABASE_URL,
    logging: process.env.DATABASE_LOGGING === "true",
  },
})

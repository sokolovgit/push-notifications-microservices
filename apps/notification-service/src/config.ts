export default () => ({
  port: process.env.PORT || 3000,

  rabbitmq: {
    url: process.env.RABBITMQ_URL,
    userQueue: process.env.RABBITMQ_USER_QUEUE,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },

  webhook: {
    uniqueUrl: process.env.WEBHOOK_UNIQUE_URL,
  },

  bullboard: {
    enabled: process.env.BULLBOARD_ENABLED === "true",
    path: process.env.BULLBOARD_PATH || "queues",
  },
})

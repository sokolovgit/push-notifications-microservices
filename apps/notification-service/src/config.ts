export default () => ({
  rabbitmq: {
    url: process.env.RABBITMQ_URL,
    userQueue: process.env.RABBITMQ_USER_QUEUE,
  },
})

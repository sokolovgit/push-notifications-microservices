import { dropDatabase } from "typeorm-extension"
import { config } from "../../../data-source"
;(async () => {
  await dropDatabase({
    options: config,
    initialDatabase: "postgres",
  })
})().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("Error dropping database:", error)
})

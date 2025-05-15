import { createDatabase } from "typeorm-extension"
import { config } from "../../../data-source"
;(async () => {
  await createDatabase({
    options: config,
    initialDatabase: "postgres",
  })
})().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("Error creating database:", error)
})

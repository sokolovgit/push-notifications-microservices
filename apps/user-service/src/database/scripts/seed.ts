/* eslint-disable no-console */
import { SeederOptions, runSeeders } from "typeorm-extension"
import { config as dataSourceConfig } from "../../../data-source"
import { DataSource, DataSourceOptions } from "typeorm"
import * as path from "path"

const bootstrap = async () => {
  const seedDataSourceConfig: DataSourceOptions & SeederOptions = {
    ...dataSourceConfig,
    seeds: [path.resolve(__dirname, "../seeds/*.{ts,js}")],
    seedTracking: true,
  }

  const dataSource = new DataSource(seedDataSourceConfig)

  await dataSource.initialize()

  await runSeeders(dataSource, { seedTracking: true })

  console.log("Run all seeders successfully")

  await dataSource.destroy()
}

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("Error running runSeeders script:", error)
  process.exit(1)
})

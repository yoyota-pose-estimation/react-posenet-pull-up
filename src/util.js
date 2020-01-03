import Influx from "influx"

const influxdbURL = localStorage.getItem("influxdb-url")
let influx = { writePoints: () => {} }
try {
  influx = new Influx.InfluxDB(influxdbURL)
} catch (err) {
  // eslint-disable-next-line no-console
  console.error(err)
}

// eslint-disable-next-line import/prefer-default-export
export function writeCount(measurement, count) {
  influx.writePoints([
    {
      fields: { count },
      measurement
    }
  ])
}

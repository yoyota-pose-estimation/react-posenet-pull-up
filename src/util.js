import Influx from "influx"
import dayjs from "dayjs"

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

export function setReloadTimeout(now = dayjs(), hour = 6) {
  const reloadTime = now.set("hour", hour)
  let delay = reloadTime.diff(now, "millisecond")
  if (delay < 0) {
    delay += 86400 * 1000
  }
  setTimeout(() => {
    window.location.reload()
  }, delay)
}

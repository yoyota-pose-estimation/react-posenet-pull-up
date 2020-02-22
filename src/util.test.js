import dayjs from "dayjs"
import { setReloadTimeout } from "./util"

jest.useFakeTimers()

// https://gist.github.com/remarkablemark/5cb571a13a6635ab89cf2bb47dc004a3
delete window.location
window.location = {
  reload: jest.fn()
}

test("test reload", () => {
  const hour = 6
  const now = dayjs()
  const oneAM = now.set("hour", 1)
  let reloadTime = oneAM.set("hour", hour)
  let delay = reloadTime.diff(oneAM, "millisecond")
  setReloadTimeout(oneAM, hour)
  expect(setTimeout.mock.calls[0][1]).toBe(delay)

  const tenAM = now.set("hour", 10)
  reloadTime = reloadTime.add(1, "day")
  delay = reloadTime.diff(tenAM, "millisecond")
  setReloadTimeout(tenAM, hour)
  expect(setTimeout.mock.calls[1][1]).toBe(delay)
  jest.runAllTimers()
  expect(window.location.reload).toHaveBeenCalled()
})

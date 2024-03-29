import {
  DAY,
  DAYLIGHT_ENDS,
  DAYLIGHT_STARTS,
  HOUR,
  HOURS_PER_DAY,
  WORLD_TIME_UPDATE_INTERVAL,
  TRANSITION,
  Whisper,
} from './util'

let worldTime = 10 * HOUR // let's start at 10 o clock

function timeLoop() {
  worldTime += 1
  Whisper.say('time_tick', worldTime)
}

// returns the amount of luminosity at this time from 0 (dark) to 1 (bright)
export const luminosity = () => {
  var relativeTime = worldTime % DAY
  // I started doing this using some crazy math.. but this proved to be simpler to define
  if (relativeTime >= DAYLIGHT_STARTS && relativeTime < DAYLIGHT_ENDS) {
    return 1
  } else if (relativeTime >= DAYLIGHT_ENDS && relativeTime < DAYLIGHT_ENDS + TRANSITION) {
    return 1 - (relativeTime - DAYLIGHT_ENDS) / TRANSITION
  } else if (relativeTime >= DAYLIGHT_STARTS - TRANSITION && relativeTime < DAYLIGHT_STARTS) {
    return (relativeTime - (DAYLIGHT_STARTS - TRANSITION)) / TRANSITION
  }
  return 0
}

export const getCurrentWorldTime = function () {
  return worldTime
}

export const formatTime = function (time: number) {
  var days = Math.floor(time / DAY),
    hours = Math.floor(time / HOUR) % HOURS_PER_DAY,
    minutes = '' + (time % HOUR)
  if (minutes.length == 1) {
    // stupid padding
    minutes = '0' + minutes
  }
  return (days > 0 ? 'day ' + days + ', ' : '') + hours + ':' + minutes
}

export const initTime = function () {
  setInterval(timeLoop, WORLD_TIME_UPDATE_INTERVAL)
}

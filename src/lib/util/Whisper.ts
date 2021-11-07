type Listeners = Record<string, Function[]>

type Listener<T> = (obj: T) => void

export const createWhisper = () => {
  const listeners: Listeners = {}

  function listen<T>(name: string, func: Listener<T>) {
    if (!name || !func) {
      throw new Error('Whisper.listen: You must provide an event name and a callback')
    }

    if (!listeners[name]) {
      listeners[name] = []
    }

    listeners[name].push(func)
  }

  function say<T>(name: string, obj?: T) {
    if (!name) {
      throw new Error('Whisper.say: You must provide an event name')
    }

    const arr = listeners[name]

    if (!arr) return

    arr.forEach((cb) => {
      setTimeout(cb.bind(undefined, obj), 0)
    })
  }

  return {
    say: say,
    listen: listen,
  }
}

export const Whisper = createWhisper()

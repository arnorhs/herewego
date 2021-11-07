type Listeners = Record<string, Function[]>

export const createWhisper = () => {
  const listeners: Listeners = {}

  function listen(name: string, func: Function) {
    if (!name || !func) {
      throw new Error('Whisper.listen: You must provide an event name and a callback')
    }

    if (!listeners[name]) {
      listeners[name] = []
    }

    listeners[name].push(func)
  }

  function say(name: string, ...args: unknown[]) {
    if (!name) {
      throw new Error('Whisper.say: You must provide an event name')
    }

    const arr = listeners[name]

    if (!arr) return

    arr.forEach((cb) => {
      setTimeout(cb.bind(undefined, args), 0)
    })
  }

  return {
    say: say,
    listen: listen,
  }
}

export const Whisper = createWhisper()

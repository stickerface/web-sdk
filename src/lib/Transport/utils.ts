const MESSAGE_IDENTIFIER = 'STICKERFACE_SDK_MESSAGE'

export type MessageHandler = (...args: any) => any

const handlers = new Set<MessageHandler>()

interface ISendPostMessage {
  data?: any
  error?: string
  target: Window
  eventName: string
  targetOrigin: string
}

export function sendPostMessage(message: ISendPostMessage) {
  const { target, eventName, data, targetOrigin = '*', error } = message

  const messageData = { MESSAGE_IDENTIFIER, eventName, error, data }

  target.postMessage(messageData, targetOrigin)

  log(`Send: ${messageData.eventName}`)
}

interface IMessageListener {
  eventName: string
  callback: MessageHandler
  onError: MessageHandler
}

export function onPostMessage(props: IMessageListener) {
  const { eventName, callback, onError } = props

  const handler = createHandler({ eventName, callback, onError })

  addHandler(handler)
  return () => removeHandler(handler)
}

function createHandler(props: IMessageListener) {
  const { eventName, callback, onError } = props

  return function handler(event: MessageEvent) {
    if (
      event.data.MESSAGE_IDENTIFIER !== MESSAGE_IDENTIFIER ||
      event.data.eventName !== eventName
    ) {
      return
    }

    if (event.data.error !== undefined && typeof onError === 'function') {
      return onError(event, event.data.error)
    }

    log(`Received: ${event.data.eventName};`)
    callback(event, event.data.data)
  }
}

function addHandler(handler: MessageHandler) {
  window.addEventListener('message', handler, false)

  handlers.add(handler)
}

function removeHandler(handler: MessageHandler) {
  if (handlers.has(handler)) {
    window.removeEventListener('message', handler, false)

    handlers.delete(handler)
  }
}

export function log(message: string): void {
  console.log(`%c ${message}`, 'color: #bada55;')
}

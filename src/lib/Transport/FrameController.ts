// eslint-disable-next-line no-unused-vars
import { MessageHandler, onPostMessage, sendPostMessage } from './utils'

type Unsubscribe = () => void

export class FrameController {
  public frame: Window | null = null

  public setFrame(frame: Window | null) {
    if (frame !== null) {
      this.frame = frame
    }
  }

  public onInit() {
    if (!this.frame) {
      return
    }

    sendPostMessage({
      data: 'Frame initialised',
      target: this.frame,
      eventName: 'sdk_init',
      targetOrigin: '*'
    })
  }

  public addEventListener(
    eventName: string,
    handler: MessageHandler
  ): Unsubscribe {
    const unsubscribe = onPostMessage({
      eventName,
      callback: handler,
      onError: handler
    })

    this.unsubscribers.push(unsubscribe)

    return unsubscribe
  }

  public unsubscribeAll() {
    this.unsubscribers.forEach((unsubscriber) => {
      unsubscriber()
    })
  }

  private unsubscribers: Array<() => void> = []
}

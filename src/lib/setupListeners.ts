// eslint-disable-next-line no-unused-vars
import { RefObject, useEffect } from 'react'
import { useTransport } from './Transport/Transport'

interface IListenerProps {
  onInit: () => void
  onChange: (layers: string) => void
  isLoaded: boolean
  frame: RefObject<HTMLIFrameElement>
}

export const setupListeners = (props: IListenerProps) => {
  const { frame, isLoaded } = props
  const { controller } = useTransport()

  useEffect(() => {
    console.log(frame.current !== null && isLoaded, controller)

    if (frame.current !== null && isLoaded) {
      controller?.unsubscribeAll()
      controller?.setFrame(frame.current.contentWindow)

      controller?.addEventListener('iframe_init', props.onInit)
      controller?.addEventListener('layers_change', props.onChange)

      controller?.onInit()
    }
  }, [frame.current, isLoaded])
}

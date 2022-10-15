import { useRef, useState } from 'react'
import * as React from 'react'
import { FrameWindow } from './lib/FrameWindow'
import { setupListeners } from './lib/setupListeners'
import { TransportContextProvider } from './lib/Transport/Transport'
import styles from './styles.module.css'

interface Props {
  token: string
  onInit: () => void
  layers?: string | null
  onChange: (layers: string) => void
  className?: string
  size: {
    width: string
    height: string
  }
}

const DEFAULT_LAYERS =
  '1;69;159;253;250;13;160;100;3040;265;76;3000;273;3200;90;28;23;203;11;68;219;83;35;'

const FRAME_ORIGIN = 'https://editor.stickerface.io'
const FRAME_PATH = `?section=Head&excludedSections=background&layers=${DEFAULT_LAYERS}`

const StickerFace: React.FC<Props> = (props) => {
  const [visible, setIsVisible] = useState<boolean>(false)
  const frameRef = useRef<HTMLIFrameElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  console.log('visible', visible)

  setupListeners({
    isLoaded,
    onInit: props.onInit,
    onChange: props.onChange,
    frame: frameRef
  })

  // const handleClick = () => {
  //   setIsVisible(!visible)
  // }

  return (
    <div className={styles.StickerFaceContainer}>
      <FrameWindow
        src={props.layers ? FRAME_ORIGIN : FRAME_ORIGIN + FRAME_PATH}
        className={props.className}
        size={props.size}
        visible={visible}
        layers={props.layers}
        frameRef={frameRef}
        setLoad={(loaded) => setIsLoaded(loaded)}
        setVisible={(visible) => setIsVisible(visible)}
      />
    </div>
  )
}

export { TransportContextProvider, StickerFace }

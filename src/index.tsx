import { useRef, useState } from 'react'
import * as React from 'react'
import { FrameWindow } from './lib/FrameWindow'
import { setupListeners } from './lib/setupListeners'
import { TransportContextProvider } from './lib/Transport/Transport'
import styles from './styles.module.css'
import classNames from 'classnames'

interface IEditorProps {
  token: string
  onInit: () => void
  layers?: string | null
  onChange: (layers: string) => void
  style?: React.CSSProperties
  className?: string
  size: {
    width: string
    height: string
  }
  config: {
    excludedSections?: string | undefined
    selectedSections?: string | undefined
  }
}

const DEFAULT_LAYERS =
  '1;69;159;253;250;13;160;100;3040;265;76;3000;273;3200;90;28;23;203;11;68;219;83;35;'

const FRAME_ORIGIN = 'https://editor.stickerface.io'
const FRAME_PATH = `?section=Head&excludedSections=background&layers=${DEFAULT_LAYERS}`

const StickerFace: React.FC<IEditorProps> = (props) => {
  const [visible, setIsVisible] = useState<boolean>(false)
  const frameRef = useRef<HTMLIFrameElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  setupListeners({
    isLoaded,
    onInit: props.onInit,
    onChange: props.onChange,
    frame: frameRef
  })

  return (
    <div
      className={classNames(styles.StickerFaceContainer, props.className)}
      style={props.style}
    >
      <FrameWindow
        src={props.layers ? FRAME_ORIGIN : FRAME_ORIGIN + FRAME_PATH}
        layers={props.layers}
        size={props.size}
        visible={visible}
        frameRef={frameRef}
        setLoad={(loaded) => setIsLoaded(loaded)}
        setVisible={(visible) => setIsVisible(visible)}
        config={props.config}
      />
    </div>
  )
}

export { TransportContextProvider, StickerFace }

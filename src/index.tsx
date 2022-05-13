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
}

const StickerFace: React.FC<Props> = (props) => {
  const [visible, setIsVisible] = useState<boolean>(false)
  const frameRef = useRef<HTMLIFrameElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  setupListeners({
    isLoaded,
    onInit: props.onInit,
    onChange: props.onChange,
    frame: frameRef
  })

  const handleClick = () => {
    setIsVisible(!visible)
  }

  return (
    <div className={styles.StickerFaceContainer}>
      <button onClick={handleClick}>ShowStickerFace</button>
      {visible ? (
        <FrameWindow
          visible={visible}
          layers={props.layers}
          frameRef={frameRef}
          setLoad={(loaded) => setIsLoaded(loaded)}
          setVisible={(visible) => setIsVisible(visible)}
        />
      ) : null}
    </div>
  )
}

export { TransportContextProvider, StickerFace }

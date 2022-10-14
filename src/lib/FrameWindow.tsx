import * as React from 'react'
// eslint-disable-next-line no-unused-vars
import { RefObject, useEffect } from 'react'
import { handleClickOutside } from '../hooks'
import styles from '../styles.module.css'

// const WIDTH = 300
// const HEIGHT = 620
// const FRAME_SRC = 'http://localhost:3000/'

interface IFrameWindowProps {
  layers?: string | null
  setVisible: (visible: boolean) => void
  visible: boolean
  setLoad: (loaded: boolean) => void
  frameRef: RefObject<HTMLIFrameElement>
  className: string | undefined
  src: string
}

export const FrameWindow: React.FC<IFrameWindowProps> = React.memo(
  (props) => {
    const { setVisible } = props

    handleClickOutside(props.frameRef, () => setVisible(false))

    useEffect(() => {
      return () => {
        props.setLoad(false)
      }
    }, [])

    return (
      <iframe
        className={styles.StickerFaceFrame}
        // width={WIDTH}
        // height={HEIGHT}
        // src={FRAME_SRC + (props.layers ? `?layers=${props.layers}` : '')}
        // className='StickerFaceFrame'
        src={
          props.src +
          (props.layers
            ? `?section=Head&excludedSections=background&layers=${props.layers}`
            : '?excludedSections=background')
        }
        ref={props.frameRef}
        // style={getFrameStyles()}
        onLoad={() => props.setLoad(true)}
      />
    )
  },
  (prev, next) => prev.visible === next.visible
)

// const getFrameStyles = () => {
//   return {
//     left: WIDTH / 4,
//     bottom: -HEIGHT / 4
//   }
// }

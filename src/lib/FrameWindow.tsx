import * as React from 'react'
// eslint-disable-next-line no-unused-vars
import { RefObject, useEffect } from 'react'
import { handleClickOutside } from '../hooks'
import styles from '../styles.module.css'

interface IFrameWindowProps {
  layers?: string | null
  setVisible: (visible: boolean) => void
  visible: boolean
  setLoad: (loaded: boolean) => void
  frameRef: RefObject<HTMLIFrameElement>
  src: string
  size: {
    width: string
    height: string
  }
  config: {
    excludedSections?: string | undefined
    selectedSections?: string | undefined
  }
}

export const FrameWindow: React.FC<IFrameWindowProps> = React.memo(
  (props) => {
    const srcParams = {
      selectedSections: props.config.selectedSections
        ? `section=${props.config.selectedSections}`
        : '',
      excludedSections: props.config.excludedSections
        ? '&excludedSections=' + props.config.excludedSections
        : ''
    }

    console.log(srcParams)

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
        width={props.size.width}
        height={props.size.height}
        src={
          props.src +
          (props.layers
            ? `?${srcParams.selectedSections}${srcParams.excludedSections}&layers=${props.layers}`
            : ``)
        }
        ref={props.frameRef}
        onLoad={() => props.setLoad(true)}
      />
    )
  },
  (prev, next) => prev.visible === next.visible
)

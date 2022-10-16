/* eslint-disable prettier/prettier */
import * as React from 'react'
import { useEffect, useState } from 'react'
import { handleClickOutside } from '../hooks'
import styles from '../styles.module.css'
import { IFrameWindowProps } from '../types/Iframe'
import { IConfig } from '../types/Editor'

const DEFAULT_LAYERS = '1;69;159;253;250;13;160;100;3040;265;76;3000;273;3200;90;28;23;203;11;68;219;83;35;'

export const FrameWindow: React.FC<IFrameWindowProps> = React.memo(
  (props) => {
    const [srcParams, setSrcParams] = useState<IConfig | undefined>()

    useEffect(() => {
      if (props.config) {
        setSrcParams({
          selectedSections: props.config.selectedSections
            ? `section=${props.config.selectedSections}`
            : '',
          excludedSections: props.config.excludedSections
            ? '&excludedSections=' + props.config.excludedSections
            : ''
        })
      }
    }, [props.config])

    const { setVisible } = props

    handleClickOutside(props.frameRef, () => setVisible(false))

    useEffect(() => {
      return () => {
        props.setLoad(false)
      }
    }, [])

    const editorConfigUrl = `?${srcParams?.selectedSections || ''}${srcParams?.excludedSections || ''}&layers=${props?.layers || DEFAULT_LAYERS}`

    return (
      <iframe
        className={styles.StickerFaceFrame}
        width={props.size.width}
        height={props.size.height}
        src={props.src + editorConfigUrl}
        ref={props.frameRef}
        onLoad={() => props.setLoad(true)}
      />
    )
  },
  (prev, next) => prev.visible === next.visible
)

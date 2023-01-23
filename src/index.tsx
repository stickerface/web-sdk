/* eslint-disable prettier/prettier */
import styles from "./styles.module.css";
import * as React from "react";
import { useRef, useState } from "react";
import { IEditorProps } from "./types/Editor";
import { FrameWindow } from "./lib/FrameWindow";
import { setupListeners } from "./lib/setupListeners";
import { TransportContextProvider } from "./lib/Transport/Transport";
import classNames from "classnames";
import { RENDER_EXTENSION, useRenderLayers } from "./hooks/useLayersRender";

const FRAME_ORIGIN = 'https://editor.stickerface.io'

const StickerFaceEditor: React.FC<IEditorProps> = (props) => {
  const { dataConnect } = props
  const [visible, setIsVisible] = useState<boolean>(false)
  const frameRef = useRef<HTMLIFrameElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [layers, onChange] = useState('')

  const changeLayersOnSave = props?.showButtonSaveAvatar ? onChange : props.onChange ? props?.onChange : onChange

  const handleSave = () => {
    if (props.onSave) {
      // @ts-ignore
      props.onSave(layers?.data?.data)
    }
  }

  const getWalletStr = () => {
    const wallet = dataConnect?.wallet || ''
    const network = dataConnect?.network || ''

    if ((wallet === '') || (network === '')) return '';
    return `wallet=${wallet}&network=${network}`
  }

  setupListeners({
    isLoaded,
    onInit: props.onInit,
    onChange: changeLayersOnSave,
    frame: frameRef
  })

  return (
    <div
      className={classNames(styles.StickerFaceContainer, props.className)}
    >
      <FrameWindow
        src={FRAME_ORIGIN}
        layers={props.layers}
        size={props.size}
        visible={visible}
        frameRef={frameRef}
        setLoad={(loaded) => setIsLoaded(loaded)}
        setVisible={(visible) => setIsVisible(visible)}
        config={props.config}
        dataWalletStr={getWalletStr()}
      />

      {
        (props?.showButtonSaveAvatar && isLoaded) && (
          <button className={styles.StickerFaceButton} onClick={handleSave}>
            Save Avatar
          </button>
        )
      }
    </div>
  )
}


interface IAvatarProps {
  layers: string
  noBackground?: boolean
}

const StickerFaceAvatar: React.FC<IAvatarProps> = (props) => {
  const layersSvg = useRenderLayers(props.layers, RENDER_EXTENSION.SVG, props?.noBackground || false)

  return (
    <div>
      <img
        src={layersSvg}
        width="100%"
        height="100%"
        alt=""
      />
    </div>
  )
}

export {
  TransportContextProvider,
  StickerFaceEditor,
  StickerFaceAvatar,
}

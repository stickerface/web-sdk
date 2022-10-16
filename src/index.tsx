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
        src={FRAME_ORIGIN}
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


interface IAvatarProps {
  layer: string
  noBackground: boolean
}

/*
  <div id="render-canvas-container"></div>
  <div id="render-continer"></div>
  <script type="text/javascript" src="https://stickerface.io/api/init-min.js"></script>
  <script type="text/javascript" src="https://stickerface.io/js/render.js"></script>
*/

const StickerFaceAvatar: React.FC<IAvatarProps> = (props) => {
  const layersSvg = useRenderLayers(props.layer, RENDER_EXTENSION.SVG, props.noBackground)

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

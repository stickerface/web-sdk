/* eslint-disable */
import {useEffect, useState} from "react";

export enum RENDER_EXTENSION {
  SVG = 'svg',
  PNG = 'png',
}

export {}
declare global {
  interface Window {
    render: (
      layer: string | string[],
      reqId: number,
      size: number,
      callback: unknown
    ) => undefined
    renderSVG: (
      layer: string | string[],
      reqId: number,
      size: number,
      params: object,
      callback: unknown
    ) => undefined
    renderPNG: (
      layer: string | string[],
      reqId: number,
      size: number,
      params: object,
      callback: unknown
    ) => undefined
    renderCanvas: (
      layer: string | string[],
      size: number,
      params: object,
      callback: unknown
    ) => undefined
  }
}

const asyncRenderImage = async (layers: string, type: RENDER_EXTENSION, noBackground: boolean, setResultRender: (blob: string) => unknown
) => {
  switch (type) {
    case RENDER_EXTENSION.PNG:
      if (typeof window.renderPNG !== 'undefined') {
        window.renderPNG(layers, 0, 800, {}, function (blob: string) {
          setResultRender(blob)
        })
      }
      break;
    case RENDER_EXTENSION.SVG:
      if (typeof window.renderSVG  !== 'undefined') {
        window.renderSVG(layers, 0, 800, {nobg: noBackground}, function (blob: string) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setResultRender(genSvgSrc(blob))
        })
      }
      break;
  }
}

export const useRenderLayers = (layers: string, type: RENDER_EXTENSION, noBackground: boolean): string => {
  const [renderLayers, setRenderLayers] = useState<string>("")

  useEffect(function () {
    asyncRenderImage(layers, type, noBackground, setRenderLayers)
  }, [layers])

  return renderLayers
};



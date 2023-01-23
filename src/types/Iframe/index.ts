import { RefObject } from 'react'
import { EditorConfig } from '../Editor'

export interface IFrameWindowProps extends EditorConfig {
  setVisible: (visible: boolean) => void
  visible: boolean
  setLoad: (loaded: boolean) => void
  frameRef: RefObject<HTMLIFrameElement>
  src: string
  dataWalletStr: string
}

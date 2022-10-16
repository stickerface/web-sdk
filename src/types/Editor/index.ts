import { CSSProperties } from 'react'

export interface IConfig {
  excludedSections?: string | undefined
  selectedSections?: string | undefined
}

export interface EditorConfig {
  layers?: string | null
  config?: IConfig
  size: {
    width: string
    height: string
  }
}

export interface IEditorProps extends EditorConfig {
  onInit: () => void
  onChange: (layers: string) => void
  style?: CSSProperties
  className?: string
}

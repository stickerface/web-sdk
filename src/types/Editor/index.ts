export interface IConfig {
  excludedSections?: string
  selectedSections?: string
}

export interface EditorConfig {
  layers?: string | null
  config?: IConfig
}

export interface IEditorProps extends EditorConfig {
  onInit?: () => void
  className?: string
  showButtonSaveAvatar?: boolean
  onSave?: (layers: string) => void
  onChange?: (layers: string) => void
  dataConnect?: {
    wallet: string
    network: 'mainnet' | 'testnet'
  }
}

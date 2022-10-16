# stickerface-sdk

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/stickerface-sdk.svg)](https://www.npmjs.com/package/stickerface-sdk) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

### npm
```bash
npm install --save stickerface-sdk
```

### yarn
```bash
yarn add stickerface-sdk

yarn add stickerface-sdk@<version>
```

## Usage

### StickerFaceEditor

```tsx
import React, { useState } from 'react'

import { StickerFaceEditor, TransportContextProvider } from 'stickerface-sdk'
import 'stickerface-sdk/dist/index.css'

const App = () => {
  const [layers, setLayers] = useState<string | null>();

  return (
    <div className={'container'}>
      <TransportContextProvider>
        <StickerFaceEditor
          layers={layers}
          size={{
            width: '100%',
            height: '100%',
          }}
          onInit={() => {
            console.log('On init')
          }}
          onChange={(layers) => {
            // @ts-ignore
            setLayers(layers?.data?.data)
          }}
        />
      </TransportContextProvider>
    </div>
  )
}

export default App
```
![alt text](screenshots/stickerfaceEditor.png)

### Params StickerFaceEditor

* layers: string | null
* size: { width: string, height: string }
* onInit: () => void
```tsx
onInit={() => {
  console.log('On init')
}}
```
* onChange: (layers: string) => void
```tsx
onChange={(layers) => {
  // @ts-ignore
  setLayers(layers?.data?.data)
}}
```
* config: IConfig
```tsx
interface IConfig {
  excludedSections?: string | undefined
  selectedSections?: string | undefined
}
```

## License

MIT © [Dimitreee](https://github.com/Dimitreee) | [Thepetruha](https://github.com/thepetruha)

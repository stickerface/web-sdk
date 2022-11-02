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

![Screenshot 2022-10-17 at 00 37 59](https://user-images.githubusercontent.com/50780255/196059525-746aa21f-6351-483f-a258-18e5f034b739.png)

### Params StickerFaceEditor

`layers: string | null`

`size: { width: string, height: string }`

`onInit: () => void`
```tsx
onInit={() => {
  console.log('On init')
}}
```
`onChange: (layers: string) => void`
```tsx
onChange={(layers) => {
  // @ts-ignore
  setLayers(layers?.data?.data)
}}
```
`config: IConfig`
```tsx
interface IConfig {
  excludedSections?: string | undefined
  selectedSections?: string | undefined
}
```

### StickerFaceAvatar

>Add 4 blocks to the top part inside the body

```html
<body>
  <div id="render-canvas-container"></div>
  <div id="render-continer"></div>
  <script type="text/javascript" src="https://stickerface.io/api/init-min.js"></script>
  <script type="text/javascript" src="https://stickerface.io/js/render.js"></script>
...
```

```tsx
import React from 'react'

import { StickerFaceAvatar } from 'stickerface-sdk'

const App = () => {
  const layers = '1;83;73;3412;100;6;219;214;203;7;11;28;68;13;320;2;273;159;160';
  
  return (
    <div className={'container'}>
      <StickerFaceAvatar layers={layers} noBackground={false} />
    </div>
  )
}

export default App
```

### Params StickerFaceAvatar

```tsx
interface IAvatarProps {
  layers: string
  noBackground?: boolean
}
```

## License

MIT © [Dimitreee](https://github.com/Dimitreee) | [Thepetruha](https://github.com/thepetruha)

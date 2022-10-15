import React, { useState } from 'react'

import { StickerFace, TransportContextProvider } from 'stickerface-sdk'
import 'stickerface-sdk/dist/index.css'

const App = () => {
  const [layers, setLayers] = useState<string | null>('1;');

  return (
    <div className={'container'}>
      <TransportContextProvider>
        <StickerFace
          token={'token'}
          layers={layers}
          className={'Help'}
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
          config={{
            selectedSections: 'Hair',
            excludedSections: 'background'
          }}
        />
      </TransportContextProvider>
    </div>
  )
}

export default App

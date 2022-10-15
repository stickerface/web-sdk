import React, { useState } from 'react'

import { StickerFace, TransportContextProvider } from 'stickerface-sdk'
import 'stickerface-sdk/dist/index.css'

const App = () => {
  const [layers, setLayers] = useState<string | null>();

  return (
    <div className={'container'}>
      {/*<img*/}
      {/*  src={`https://beta.stickerface.io/api/section/png/${layers}`}*/}
      {/*  alt=""*/}
      {/*/>*/}
      <TransportContextProvider>
        <StickerFace
          token={'token'}
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

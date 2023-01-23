import React, { useState } from 'react'

import { StickerFaceEditor, TransportContextProvider } from 'stickerface-sdk'
import 'stickerface-sdk/dist/index.css'

const App = () => {
  const [layers, setLayers] = useState<string | null>();
  console.log(layers)

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
          showButtonSaveAvatar
          onSave={(layers) => {
            setLayers(layers)
          }}
          dataConnect={{
            wallet: 'kQDTPT-6EJbwdTjOKXc1zuOJ7AC28wHgmVcvrRvLCAsQqVc5',
            network: 'testnet',
          }}
        />
      </TransportContextProvider>
    </div>
  )
}

export default App
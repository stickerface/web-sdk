import React, { useState } from 'react'

import { StickerFaceEditor, TransportContextProvider } from 'stickerface-sdk'
import 'stickerface-sdk/dist/index.css'
import './app.css'

const App = () => {
  const [layers, setLayers] = useState<string | null>();

  return (
    <div className={'container'}>
      <TransportContextProvider>
        <StickerFaceEditor
          layers={layers}
          showButtonSaveAvatar
          dataConnect={{
            wallet: 'kQDTPT-6EJbwdTjOKXc1zuOJ7AC28wHgmVcvrRvLCAsQqVc5',
            network: 'testnet',
          }}
          onSave={(layer) => {
            setLayers(layer)
          }}
          className={'stickerfaceEditor'}
        />
      </TransportContextProvider>
    </div>
  )
}

export default App
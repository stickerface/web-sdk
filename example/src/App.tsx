import React from 'react'

import { StickerFaceAvatar } from 'stickerface-sdk'

const App = () => {
  return (
    <div className={'container'}>
      <StickerFaceAvatar layer={String('1;83;73;3412;100;6;219;214;203;7;11;28;68;13;320;2;273;159;160')} noBackground={false} />
    </div>
  )
}

export default App

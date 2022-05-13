import React, { useContext } from 'react'
import { FrameController } from './FrameController'

const TransportContext = React.createContext<{ controller?: FrameController }>(
  {}
)

export const useTransport = () => {
  const transport = useContext(TransportContext)

  return transport
}

export const TransportContextProvider: React.FC = (props) => {
  const controller = React.useMemo(() => {
    return new FrameController()
  }, [])

  return (
    <TransportContext.Provider value={{ controller }}>
      {props.children}
    </TransportContext.Provider>
  )
}

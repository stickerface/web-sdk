import React, { useContext } from 'react'
import { FrameController } from './FrameController'

const TransportContext = React.createContext<{ controller?: FrameController }>(
  {}
)

export const useTransport = () => {
  const transport = useContext(TransportContext)

  return transport
}

interface ITransportContextProvider {
  children: JSX.Element | HTMLElement
}

export const TransportContextProvider: React.FC<ITransportContextProvider> = ({
  children
}) => {
  const controller = React.useMemo(() => {
    return new FrameController()
  }, [])

  return (
    <TransportContext.Provider value={{ controller }}>
      {children}
    </TransportContext.Provider>
  )
}

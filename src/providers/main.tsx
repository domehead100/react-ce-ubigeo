import React, { SFC, useState } from 'react'
import context from '../store/context'

const Provider = context.Provider

const MainProider: SFC = function ({ children }) {
  const [ubigeo, setUbigeo] = useState({})

  const providerValue = { ubigeo, setUbigeo }

  return (
    <Provider value={providerValue}>
      { children }
    </Provider>
  )
}

export default MainProider

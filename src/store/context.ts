import React, { Dispatch, SetStateAction } from 'react'

export interface MainContext {
  ubigeo: Record<string, any>
  setUbigeo: Dispatch<SetStateAction<{}>>
}

const contextStructure: MainContext = {
  ubigeo: {},
  setUbigeo() {}
}

const context = React.createContext(contextStructure)

export default context

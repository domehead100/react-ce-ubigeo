import React from 'react'
import MainProvider from '../providers/main'
import Uploader from '../components/uploader'
import './index.css'

const App: React.FC = () => {
  return (
    <MainProvider>
      <div className="App">
        <Uploader />
      </div>
    </MainProvider>
  )
}

export default App

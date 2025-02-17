import { useState } from 'react'
import NumberField from './components/NumberField'
import AppContext from './context/AppContext'
import { ThemeProvider, createTheme } from "@mui/material/styles";



function App() {
  const [cameraOffset, setCameraOffset] = useState({
    x: 0,
    y: 0,
    z: 0,
    roll: 0,
    pitch: 0,
    yaw: 0,
  })

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
    <AppContext.Provider value={{ cameraOffset, setCameraOffset }}>
      <NumberField name="x" value={cameraOffset.x} />
      <NumberField name="y" value={cameraOffset.y} />
      <NumberField name="z" value={cameraOffset.z} />
      <NumberField name="roll" value={cameraOffset.roll} />
      <NumberField name="pitch" value={cameraOffset.pitch} />
      <NumberField name="yaw" value={cameraOffset.yaw} />
    </AppContext.Provider>
    </ThemeProvider>
  )
}

export default App

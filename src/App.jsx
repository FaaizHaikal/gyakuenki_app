import { useState } from 'react'
import NumberField from './components/NumberField'
import AppContext from './context/AppContext'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from '@mui/material/Box';
import SaveButton from './components/SaveButton'
import ReloadButton from './components/ReloadButton'

function App() {
  const [cameraOffset, setCameraOffset] = useState({
    x: 0,
    y: 0,
    z: 0,
    roll: 0,
    pitch: 0,
    yaw: 0,
  })

  const ROS2_HOST = import.meta.env.VITE_ROS2_HOST;
  const ROS2_PORT = import.meta.env.VITE_ROS2_PORT;

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
    <AppContext.Provider value={{ cameraOffset, setCameraOffset, ROS2_HOST, ROS2_PORT }}>
      <Box>
        <NumberField name="x" value={cameraOffset.x} />
        <NumberField name="y" value={cameraOffset.y} />
        <NumberField name="z" value={cameraOffset.z} />
        <NumberField name="roll" value={cameraOffset.roll} />
        <NumberField name="pitch" value={cameraOffset.pitch} />
        <NumberField name="yaw" value={cameraOffset.yaw} />
      </Box>
      <Box>
        <SaveButton />
        <ReloadButton />
      </Box>
    </AppContext.Provider>
    </ThemeProvider>
  )
}

export default App

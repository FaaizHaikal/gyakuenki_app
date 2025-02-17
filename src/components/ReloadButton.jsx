import { useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import { LoadingButton } from '@mui/lab';
import ROSLIB from 'roslib';

function ReloadButton() {
  const [isLoading, setIsLoading] = useState(false);

  const { setCameraOffset, ROS2_HOST, ROS2_PORT } = useContext(AppContext);

  const ros = new ROSLIB.Ros({
    url: `ws://${ROS2_HOST}:${ROS2_PORT}`,
  });

  const handleReload = () => {
    const service = new ROSLIB.Service({
      ros: ros,
      name: 'robot_frames/update_camera_offset',
      serviceType: 'robot_frames_interfaces/srv/UpdateCameraOffset',
    });

    const request = new ROSLIB.ServiceRequest({});

    setIsLoading(true);

    service.callService(request, (result) => {
      setIsLoading(false);
      
      if (result.ok) {
        setCameraOffset({
          x: result.position_x,
          y: result.position_y,
          z: result.position_z,
          roll: result.roll,
          pitch: result.pitch,
          yaw: result.yaw,
        });
      } else {
        console.error('Failed to get camera offset');
      }
    });
  }

  return (
    <LoadingButton
      onClick={handleReload}
      color="warning"
      variant="contained"
      sx={{ margin: 1, top: 5 }}
      loading={isLoading}
    >
      Reload
    </LoadingButton>
  );
}

export default ReloadButton;
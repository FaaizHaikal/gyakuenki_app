import { useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import { LoadingButton } from '@mui/lab';
import ROSLIB from 'roslib';

function SaveButton() {
  const [isLoading, setIsLoading] = useState(false);

  const { cameraOffset, ROS2_HOST, ROS2_PORT } = useContext(AppContext);

  const ros = new ROSLIB.Ros({
    url: `ws://${ROS2_HOST}:${ROS2_PORT}`,
  });

  const handleSave = () => {
    const service = new ROSLIB.Service({
      ros: ros,
      name: 'robot_frames/update_camera_offset',
      serviceType: 'robot_frames_interfaces/srv/UpdateCameraOffset',
    });

    const request = new ROSLIB.ServiceRequest({
      x: cameraOffset.x,
      y: cameraOffset.y,
      z: cameraOffset.z,
      roll: cameraOffset.roll,
      pitch: cameraOffset.pitch,
      yaw: cameraOffset.yaw,
      save: true,
    });

    setIsLoading(true);

    service.callService(request, (result) => {
      setIsLoading(false);
      
      if (result.ok) {
        console.log('Camera offset saved');
      } else {
        console.error('Failed to save camera offset');
      }
    });
  }

  return (
    <LoadingButton
      onClick={handleSave}
      color="primary"
      variant="contained"
      sx={{ margin: 1, top: 5 }}
      loading={isLoading}
    >
      Save
    </LoadingButton>
  );
}

export default SaveButton;
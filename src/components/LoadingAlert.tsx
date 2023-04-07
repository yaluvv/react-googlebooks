import React from 'react';
import { Stack, Alert } from '@mui/material';

interface iLoadingAlertProps {
  onChange: () => void;
}

const LoadingAlert: React.FC<iLoadingAlertProps> = ({ onChange }) => {
  return (
    <Stack
      sx={{
        width: '100%',
        maxWidth: 400,
        position: 'absolute',
        bottom: 30,
        left: 30,
      }}
      spacing={2}
    >
      <Alert onClose={onChange}>Данные успешно загружены!</Alert>
    </Stack>
  );
};

export default LoadingAlert;

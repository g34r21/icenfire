import { Typography } from '@mui/material';
import { Suspense } from 'react';

import Houses from '@/components/HousesTable';

const HousesPage = () => (
  <>
    <Typography variant="h3" sx={{ marginY: 8 }}>Houses</Typography>
    <Suspense>
      <Houses />
    </Suspense>
  </>
);

export default HousesPage;

import { Typography } from '@mui/material';

import Houses from '@/components/HousesTable';

const HousesPage = () => (
  <>
    <Typography variant="h3" sx={{ marginY: 8 }}>Houses</Typography>
    <Houses />
  </>
);

export default HousesPage;

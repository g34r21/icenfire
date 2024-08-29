import {
  Alert,
  AlertTitle,
  AppBar,
  Button,
  Toolbar,
  Typography,
} from '@mui/material';
import type { NextPage } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import HouseMembers from '@/components/HouseMembers';

const HouseMembersPage: NextPage<{ params: { houseId: string } }> = async ({
  params,
}) => {
  const res = await fetch(
    `https://anapioficeandfire.com/api/houses/${params.houseId}`,
  );
  const house: {
    name: string;
    swornMembers: string[];
    ancestralWeapons: string[];
    cadetBranches: string[];
    coatOfArms: string;
    currentLord: string;
    diedOut: string;
    founded: string;
    founder: string;
    heir: string;
    overlord: string;
    region: string;
    seats: string[];
    titles: string[];
    url: string;
    words: string;
  } = await res.json();

  if (!house) {
    notFound();
  }

  return (
    <>
      <AppBar position="absolute" sx={{ width: '100%' }}>
        <Toolbar>
          <Link href="/houses">
            <Button variant="text" sx={{ color: 'white' }}>
              Back
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Typography variant="h3" sx={{ marginTop: 16, marginBottom: 8 }}>
        {house.name}
        {' '}
        Sworn Members
      </Typography>
      {house.swornMembers.length > 0
        ? (
            <HouseMembers membersUrls={house.swornMembers} />
          )
        : (
            <Alert severity="info">
              <AlertTitle><b>Oops!</b></AlertTitle>
              This house has no sworn members
            </Alert>
          )}
    </>
  );
};

export default HouseMembersPage;

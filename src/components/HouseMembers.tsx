'use client';

import {
  Alert,
  AlertTitle,
  Card,
  CardContent,
  Chip,
  Grid2,
  Skeleton,
  Typography,
} from '@mui/material';
import type { FC } from 'react';
import React from 'react';

import useGetHouseMembers from '@/hooks/useGetHouseMembers';

const MembersSkeleton = () => (
  <Grid2 container columns={12} spacing={2} alignItems="stretch">
    {Array.from(Array(12)).map((_, i) => (
      <Grid2
        // eslint-disable-next-line react/no-duplicate-key, react/no-array-index-key
        key={i}
        size={{ md: 4, sm: 6, xs: 12 }}
      >
        <Skeleton variant="rectangular" height={115} width="100%" />
      </Grid2>
    ))}
  </Grid2>
);

const HouseMembers: FC<{ membersUrls: string[] }> = ({ membersUrls }) => {
  const members = useGetHouseMembers({
    membersUrls,
  });

  if (members.isLoading) {
    return <MembersSkeleton />;
  }

  if (members.errors.every(error => error)) {
    return (
      <Typography>There was an error while getting house members</Typography>
    );
  }

  if (!members.data || !members.data.length) {
    return (
      <Alert severity="info">
        <AlertTitle>Oops!</AlertTitle>
        This house has no sworn members
      </Alert>
    );
  }

  return (
    <Grid2 container columns={12} spacing={2} alignItems="stretch">
      {members.data.flatMap((member) => {
        if (!member) {
          return [];
        }

        return [
          <Grid2
            component={Card}
            key={member.id}
            size={{ md: 4, sm: 6, xs: 12 }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" noWrap>
                {member.name}
              </Typography>

              <Chip
                size="small"
                sx={{ marginBottom: 1 }}
                color={member.died ? 'error' : 'success'}
                label={member.died ? 'Dead' : 'Alive'}
              />
              {member.died && (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  <b>Death details: </b>
                  {member.died}
                </Typography>
              )}
            </CardContent>
          </Grid2>,
        ];
      })}
    </Grid2>
  );
};

export default HouseMembers;

'use client';

import {
  Button,
  Pagination,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import useGetHouses from '@/hooks/useGetHouses';

const HousesSkeleton = () => {
  return (
    <>
      {Array.from(Array(12)).map((_, i) => (
        <TableRow
          // eslint-disable-next-line react/no-duplicate-key, react/no-array-index-key
          key={i}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            <Skeleton />
          </TableCell>
          <TableCell align="right">
            <Skeleton />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

const Houses = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const currentPage = Number(searchParams.get('page')) || 1;
  const handlePaginationModelChange = (
    _: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    replace(`${pathname}?${params.toString()}`);
  };
  const { data, isLoading, error } = useGetHouses({
    page: currentPage,
  });

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ marginY: 4 }}>
        <Table>
          <TableBody>
            {isLoading && <HousesSkeleton />}
            {!isLoading
            && data?.pageResults.map(house => (
              <TableRow
                // eslint-disable-next-line react/no-duplicate-key
                key={house.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {house.name}
                </TableCell>
                <TableCell align="right">
                  <Link href={`/houses/${house.id}/members`} role="link">
                    <Button variant="contained" size="medium">
                      members
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        color="primary"
        count={data?.totalCount ? data?.totalCount / 10 : 1}
        page={currentPage}
        onChange={handlePaginationModelChange}
      />
    </>
  );
};

export default Houses;

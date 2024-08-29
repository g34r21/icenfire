'use client';

import { Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import useGetHouses from '@/hooks/useGetHouses';

const Houses = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const currentPage = Number(searchParams.get('page')) || 1;
  const handlePaginationModelChange = ({
    page,
  }: {
    page: number;
    pageSize: number;
  }) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', (page + 1).toString());
    replace(`${pathname}?${params.toString()}`);
  };
  const { data, isLoading, error } = useGetHouses({
    page: currentPage,
  });

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <DataGrid
      rows={data?.pageResults.map(house => ({
        id: house.id,
        name: house.name,
        link: `/houses/${house.id}/members`,
      }))}
      disableRowSelectionOnClick
      disableColumnSelector
      disableColumnSorting
      disableColumnFilter
      disableColumnResize
      disableColumnMenu
      columns={[
        {
          field: 'name',
          renderHeader: () => (
            <Typography variant="h6" fontWeight="bold">
              House name
            </Typography>
          ),
          flex: 3,
        },
        {
          field: 'link',
          flex: 1,
          headerName: '',
          align: 'right',
          renderCell: ({ value }) => (
            <Link href={value} role="link">
              <Button variant="contained" size="medium">
                members
              </Button>
            </Link>
          ),
        },
      ]}
      paginationMode="server"
      rowCount={data?.totalCount || 10}
      pagination
      initialState={{
        pagination: {
          paginationModel: { pageSize: 10, page: currentPage - 1 },
        },
      }}
      loading={isLoading}
      pageSizeOptions={[10]}
      slotProps={{
        loadingOverlay: {
          variant: 'skeleton',
          noRowsVariant: 'skeleton',
        },
      }}
      onPaginationModelChange={handlePaginationModelChange}
    />
  );
};

export default Houses;

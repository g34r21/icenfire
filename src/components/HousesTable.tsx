'use client';

import { Button } from '@mui/material';
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
  const handlePaginationModelChange = ({ page }: { page: number; pageSize: number }) => {
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
      rows={
        data?.pageResults.map(house => ({
          id: house.id,
          name: house.name,
          link: `/houses/${house.id}/members`,
        }))
      }
      disableRowSelectionOnClick
      disableColumnSelector
      disableColumnSorting
      disableColumnFilter
      disableColumnResize
      disableColumnMenu
      columns={[
        { field: 'name', headerName: 'House name', flex: 3 },
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
      loading={isLoading}
      pageSizeOptions={[10]}
      slotProps={{
        loadingOverlay: {
          variant: 'skeleton',
          noRowsVariant: 'skeleton',
        },
      }}
      paginationModel={{ page: currentPage - 1, pageSize: 10 }}
      onPaginationModelChange={handlePaginationModelChange}
    />
  );
};

export default Houses;

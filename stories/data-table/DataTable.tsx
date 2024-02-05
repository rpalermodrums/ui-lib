import { ChangeEvent, useState } from 'react';
import { DollarSignIcon } from 'lucide-react';
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export interface DataTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>;
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]),
    [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]),
    [columnVisibility, setColumnVisibility] = useState<VisibilityState>({}),
    [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      <div className="flex py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            // set filter value
            table.getColumn('email')?.setFilterValue(event.target.value);

            // set search param in url
            if (typeof window !== 'undefined') {
              const { protocol, host, pathname } = window.location;
              const url = new URL(`${protocol}//${host}${pathname}`);
              url.searchParams.append('email', event.target.value);
              window.history.pushState({}, '', url.toString());
            }
          }}
          className="max-w-sm ml-2 mr-2"
        />

        {/* Add status filter select */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-2">
              Filter Status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {['pending', 'processing', 'success', 'failed'].map((status) => {
              return (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={
                    table.getColumn('status')?.getFilterValue() === status
                  }
                  onCheckedChange={(value) =>
                    table
                      .getColumn('status')
                      ?.setFilterValue(value ? status : undefined)
                  }
                >
                  {status}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex ml-4 mr-2 items-center justify-space-between">
          <Input
            icon={() => <DollarSignIcon />}
            type="number"
            placeholder="Min Amount"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const filterValue = table.getColumn('amount')?.getFilterValue();
              const max = Array.isArray(filterValue) ? filterValue[1] : null;
              // set filter value
              table
                .getColumn('amount')
                ?.setFilterValue([event.target.value, max]);
            }}
            className="max-w-sm ml-2 mr-1"
          />
          -
          <Input
            icon={() => <DollarSignIcon />}
            type="number"
            placeholder="Max Amount"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const filterValue = table.getColumn('amount')?.getFilterValue();
              const min = Array.isArray(filterValue) ? filterValue[0] : null;
              // set filter value
              table
                .getColumn('amount')
                ?.setFilterValue([min, event.target.value]);
            }}
            className="max-w-sm ml-1"
          />
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto mb-4 ml-2">
            Columns
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {table.getFilteredSelectedRowModel().rows.length > 0 && (
                  <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{' '}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                  </div>
                )}
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => table.previousPage()}
              aria-disabled={!table.getCanPreviousPage()}
            >
              Previous
            </PaginationPrevious>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => table.nextPage()}
              aria-disabled={!table.getCanNextPage()}
            >
              Next
            </PaginationNext>
          </PaginationItem>
        </Pagination>
      </div>
    </div>
  );
}

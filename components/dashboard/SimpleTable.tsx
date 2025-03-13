/* eslint-disable */

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table'

interface Column {
  header: string;
  accessor: string;
}

interface SimpleTableProps {
  columns: Column[];
  data: Record<string, any>[];
}

function SimpleTable({ columns, data }: SimpleTableProps) {
  return (
    <Table className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
      <TableHead>
        <TableRow>
          {columns.map(column => (
            <TableHeader key={column.accessor}>{column.header}</TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
                {columns.map(column => (
                    <TableCell key={column.accessor}>{row[column.accessor]}</TableCell>
                ))}
            </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
export default SimpleTable;
import React from "react";

const Table = ({ children }) => (
    <table className="w-full rounded-lg">
        {children}
    </table>
);

const TableHeader = ({ children }) => (
    <thead className="rounded-lg">
        {children}
    </thead>
);

const TableBody = ({ children }) => (
    <tbody>
        {children}
    </tbody>
);

const TableRow = ({ children }) => (
    <tr className="hover:bg-gray-50 text-center">
        {children}
    </tr>
);

const TableHead = ({ children }) => (
    <th className="px-4 py-2 text-left font-semibold text-center">
        {children}
    </th>
);

const TableCell = ({ children, colSpan }) => (
    <td className="px-4 py-2" colSpan={colSpan}>
        {children}
    </td>
);

const TableComponent = ({ headers, data }) => {
    return (
        <div className="overflow-x-auto w-full">
            <Table>
                <TableHeader>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableHead key={index}>{header}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <TableCell key={cellIndex}>{cell}</TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={headers.length} className="text-center py-4">
                                No data available
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default TableComponent;
export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };



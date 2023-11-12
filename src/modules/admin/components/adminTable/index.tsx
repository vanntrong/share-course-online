/* eslint-disable @typescript-eslint/no-explicit-any */
import DeleteButton from "@/components/deleteButton";
import {Button, Flex, ScrollArea, Skeleton, Table, TextInputProps,} from "@mantine/core";
import React, {useMemo} from "react";

export interface Column<T> {
    title: string;
    dataIndex: string;
    key: string;
    render?: (value: T) => React.ReactNode;
    disableInEdit?: boolean;
    hideInTable?: boolean;
    renderInEdit?: (props: any, data?: T | null) => React.ReactNode;
    inputProps?: TextInputProps;
    type?: "input" | "textarea" | "file" | "number";
}

interface AdminTableProps<T> {
    columns: Column<T>[];
    data?: T[];
    isLoading?: boolean;
    onUpdate?: (data: T) => void;
    onDelete?: (id: number) => void;
}

const renderSkeleton = <T, >(columns: Array<Column<T>>) => {
    return (
        <>
            {new Array(5).fill(0).map((_, index) => (
                <tr key={index}>
                    {columns.map((column) => (
                        <td key={`column-${column.dataIndex}-${index}`}>
                            <Skeleton height={30}></Skeleton>
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
};

const renderContents = <T, >(columns: Array<Column<T>>, data: Array<T>) => {
    return (
        <>
            {data.map((item, index) => (
                <tr key={index}>
                    {columns.map((column) => (
                        <td
                            key={`column-${column.dataIndex}-${index}`}
                            style={{
                                whiteSpace: "nowrap",
                            }}
                        >
                            {column.render
                                ? column.render(item)
                                : (item as any)[column.dataIndex]}
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
};

const AdminTable = <T extends { id: number }>(props: AdminTableProps<T>) => {
    const {columns, data, isLoading, onUpdate, onDelete} = props;

    const _columns = useMemo(() => {
        return [
            ...(columns.filter(col => !col.hideInTable)),
            {
                title: "Action",
                dataIndex: "action",
                key: "action",
                render: (item) => (
                    <Flex justify={"center"} gap={"md"}>
                        <Button
                            variant="outline"
                            color="blue"
                            onClick={() => onUpdate?.(item)}
                        >
                            Edit
                        </Button>
                        <DeleteButton onConfirm={() => onDelete?.(item.id)}/>
                    </Flex>
                ),
            },
        ];
    }, [columns, onUpdate, onDelete]);

    const isShowSkeleton = !data || isLoading;
    return (
        <>
            <ScrollArea w={"100%"}>
                <Table striped highlightOnHover withBorder withColumnBorders>
                    <thead>
                    {_columns.map((column) => (
                        <th
                            key={`column-title-${column.title}`}
                            style={{
                                whiteSpace: "nowrap",
                            }}
                        >
                            {column.title}
                        </th>
                    ))}
                    </thead>
                    <tbody>
                    {isShowSkeleton
                        ? renderSkeleton(_columns)
                        : renderContents(_columns, data)}
                    </tbody>
                </Table>
            </ScrollArea>
        </>
    );
};

export default AdminTable;

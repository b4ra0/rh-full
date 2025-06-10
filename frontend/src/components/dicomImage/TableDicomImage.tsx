import {useMemo} from "react";
import {MRT_ColumnDef, MRT_Table, useMaterialReactTable} from "material-react-table";
import {DicomImage} from "../../models/DicomImage";
import {MenuItem} from "@mui/material";
import LoadingComponent from "../LoadingComponent";

export default function TableDicomImage({images, loading}: { images: DicomImage[]; loading: boolean; }) {
    const columns = useMemo<MRT_ColumnDef<DicomImage>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
            },
            {
                accessorKey: 'filename',
                header: 'File',
                Cell: ({cell}) => <p>{cell.getValue<string>().replace('exames/', '')}</p>,
            },
            {
                accessorKey: 'createdAt',
                header: 'Criado em:',
                Cell: ({cell}) => <p>{cell.getValue<Date>().toLocaleString()}</p>,
            },
            {
                accessorKey: 'updatedAt',
                header: 'Alterado em:',
                Cell: ({cell}) => <p>{cell.getValue<Date>().toLocaleString()}</p>,
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data: images,
        enableKeyboardShortcuts: false,
        enableColumnActions: false,
        enableColumnFilters: false,
        enablePagination: false,
        enableSorting: false,
        enableRowActions: true,
        positionActionsColumn: "last",
        muiTableBodyRowProps: ({row}) => ({
            onClick: (event) => {
                window.location.href = `/dicom-image/${row.getValue("id")}`;
            },
            sx: {
                cursor: "pointer",
            },
        }),
        renderRowActionMenuItems: ({row}) => [
            <MenuItem
                key="edit"
                onClick={() => window.alert("Edit" + row.getValue("id"))}
            >
                Edit
            </MenuItem>,
            <MenuItem
                key="delete"
                onClick={() => window.alert("Delete" + row.getValue("id"))}
            >
                Delete
            </MenuItem>,
        ],
    });

    if (loading) {
        return <LoadingComponent/>;
    }

    return <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <MRT_Table table={table}/>
    </div>;
}
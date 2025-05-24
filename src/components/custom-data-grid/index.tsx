import React, { memo, Ref } from "react";
import Box from "@mui/material/Box";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import { styled } from "@mui/material";
import SkeletonOverlay from "../SkeletonOverlay";

const StyleCustomGrid = styled(DataGrid)<DataGridProps>(({ theme }) => ({
  ".MuiDataGrid-withBorderColor": {
    outline: "none !important",
  },
  ".MuiDataGrid-selectedRowCount": {
    display: "none",
  },
  ".MuiDataGrid-columnHeaderTitle": {
    textTransform: "capitalize",
    color: theme.palette.primary.main,
  },
}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CustomDataGrid = React.forwardRef(({ loading, ...props }: DataGridProps, ref: Ref<any>) => {
  return (
    <Box sx={{ height: "100%", width: "100%", overflow: "auto" }}>
      <StyleCustomGrid
        {...props}
        loading={loading}
        slots={{
          noRowsOverlay: loading ? SkeletonOverlay : undefined,
          ...props.slots, // preserve user-defined slots
        }}
      />
    </Box>
  );
});

CustomDataGrid.displayName = "CustomDataGrid";

export default memo(CustomDataGrid);

import { GridOverlay } from "@mui/x-data-grid";
import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/material";

const SkeletonOverlay = () => (
  <GridOverlay>
    <Box sx={{ width: "100%", px: 2, py: 2 }}>
      {[...Array(10)].map((_, i) => (
        <Skeleton key={i} variant="rectangular" height={40} animation="wave" sx={{ mb: 1, borderRadius: 2 }} />
      ))}
    </Box>
  </GridOverlay>
);

export default SkeletonOverlay;

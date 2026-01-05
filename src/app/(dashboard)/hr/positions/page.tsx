"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  Handle,
  Position as FlowPosition,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { MdEdit, MdDelete, MdWork } from "react-icons/md";
import dynamic from "next/dynamic";

import fetchApi from "@/utils/fetchApi";
import { CONFIG_API } from "@/configs/api";
import { useSnackbar } from "@/hooks/useSnackbar";

const DialogConfirmDelete = dynamic(() => import("@/components/dialog-confirm-delete"), { ssr: false });

const CustomNode = ({ data }: { data: any }) => {
  return (
    <Box>
      <Handle type="target" position={FlowPosition.Top} style={{ background: "#bbb" }} />
      <Paper
        elevation={3}
        sx={{
          p: 1.5,
          width: 220,
          textAlign: "center",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "#fff",
        }}
      >
        <Typography variant="caption" fontWeight={800} color="primary" sx={{ display: "block", mb: 0.5 }}>
          LEVEL {data.level}
        </Typography>
        <Typography variant="subtitle2" fontWeight={700} noWrap>
          {data.title}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5, mt: 1 }}>
          <IconButton size="small" onClick={() => data.onEdit(data)}>
            <MdEdit size={14} />
          </IconButton>
          <IconButton size="small" color="error" onClick={() => data.onDelete(data._id)}>
            <MdDelete size={14} />
          </IconButton>
        </Box>
      </Paper>
      <Handle type="source" position={FlowPosition.Bottom} style={{ background: "#bbb" }} />
    </Box>
  );
};

export default function PositionLevelPage() {
  const theme = useTheme();
  const { Toast, showToast } = useSnackbar();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [rawPositions, setRawPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [formData, setFormData] = useState({ title: "", description: "", level: 0 });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState<string | null>(null);

  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

  const fetchPositions = async () => {
    try {
      setLoading(true);
      const res = await fetchApi(CONFIG_API.POSITION.INDEX, "GET");
      if (res?.statusCode === 200) setRawPositions(res.data.result);
    } catch {
      showToast("Lỗi tải dữ liệu", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  useEffect(() => {
    if (rawPositions.length === 0) {
      setNodes([]);
      setEdges([]);
      return;
    }

    const nodeWidth = 280;
    const nodeHeight = 200;

    const levelGroups: { [key: number]: any[] } = {};
    rawPositions.forEach((pos: any) => {
      if (!levelGroups[pos.level]) levelGroups[pos.level] = [];
      levelGroups[pos.level].push(pos);
    });

    const sortedLevels = Object.keys(levelGroups)
      .map(Number)
      .sort((a, b) => a - b);

    const newNodes = rawPositions.map((pos: any) => {
      const indexInLevel = levelGroups[pos.level].indexOf(pos);
      const rowWidth = levelGroups[pos.level].length * nodeWidth;
      return {
        id: pos._id,
        type: "customNode",
        data: { ...pos, onEdit: openEdit, onDelete: handleDelete },
        position: {
          x: indexInLevel * nodeWidth - rowWidth / 2,
          y: pos.level * nodeHeight,
        },
      };
    });

    const newEdges: Edge[] = [];
    for (let i = 0; i < sortedLevels.length - 1; i++) {
      const currentLevel = sortedLevels[i];
      const nextLevel = sortedLevels[i + 1];

      levelGroups[currentLevel].forEach((parent) => {
        levelGroups[nextLevel].forEach((child) => {
          newEdges.push({
            id: `e-${parent._id}-${child._id}`,
            source: parent._id,
            target: child._id,
            type: "smoothstep",
            style: { stroke: "#b1b1b7", strokeWidth: 1.5 },
          });
        });
      });
    }

    setNodes(newNodes);
    setEdges(newEdges);
  }, [rawPositions]);

  /* --- CRUD HELPERS --- */
  const openEdit = (p: any) => {
    setEditing(p);
    setFormData({ title: p.title, description: p.description || "", level: p.level });
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    setToDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await fetchApi(CONFIG_API.POSITION.DETAIL(editing._id), "PATCH", formData);
        showToast("Cập nhật thành công", "success");
      } else {
        await fetchApi(CONFIG_API.POSITION.INDEX, "POST", formData);
        showToast("Tạo mới thành công", "success");
      }
      setOpen(false);
      fetchPositions();
    } catch {
      showToast("Có lỗi xảy ra", "error");
    }
  };

  const confirmDelete = async () => {
    if (!toDeleteId) return;
    try {
      await fetchApi(CONFIG_API.POSITION.DETAIL(toDeleteId), "DELETE");
      showToast("Xóa vị trí thành công", "success");
      fetchPositions();
    } catch {
      showToast("Xóa thất bại", "error");
    } finally {
      setDeleteDialogOpen(false);
      setToDeleteId(null);
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", bgcolor: "#fff", borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="h6" fontWeight={700}>
          Organization Levels
        </Typography>
        <Button
          variant="contained"
          startIcon={<FaPlus />}
          onClick={() => {
            setEditing(null);
            setFormData({ title: "", description: "", level: 0 });
            setOpen(true);
          }}
        >
          Thêm vị trí
        </Button>
      </Box>

      <Box sx={{ flex: 1, bgcolor: "#f4f6f8" }}>
        {loading && rawPositions.length === 0 ? (
           <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}><CircularProgress /></Box>
        ) : (
          <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} nodeTypes={nodeTypes} fitView>
            <Background color="#ccc" gap={20} />
            <Controls />
          </ReactFlow>
        )}
      </Box>

      {/* DIALOG FORM */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editing ? "Edit Position" : "Create Position"}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              label="Title"
              margin="dense"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />

            <TextField
              fullWidth
              label="Description"
              margin="dense"
              multiline
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            <TextField
              fullWidth
              label="Level"
              type="number"
              margin="dense"
              inputProps={{ min: 0 }}
              required
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) })}
              helperText="Level 0 là cấp cao nhất"
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editing ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* CONFIRM DELETE */}
      <DialogConfirmDelete
        deleteDialogOpen={deleteDialogOpen}
        titleConfirmDelete="Delete Position"
        descriptionConfirmDelete="Are you sure you want to delete this position?"
        handleConfirmDelete={confirmDelete}
        handleCancelDelete={() => setDeleteDialogOpen(false)}
      />
      <Toast />
    </Box>
  );
}
import React, { useState } from "react"
import Editor from "@monaco-editor/react"
import {
  Button,
  Dialog,
  IconButton,
  Typography,
} from "@mui/material"
import { FiMaximize2, FiMinimize2, FiCheck } from "react-icons/fi"

interface JsonEditorWrapperProps {
  label: string
  value: string
  onChange: (value: string | undefined) => void
  height?: string
}

export const JsonEditorWrapper: React.FC<JsonEditorWrapperProps> = ({
  label,
  value,
  onChange,
  height = "300px",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpen = () => setIsModalOpen(true)
  const handleClose = () => setIsModalOpen(false)

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-[#1e1e1e] shadow-sm">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-[#333]">
        <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-900/50 text-blue-300 border border-blue-800">JSON</span>
        </div>
        <button
          onClick={handleOpen}
          className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/5"
        >
          <FiMaximize2 size={14} />
          <span className="text-xs">Expand</span>
        </button>
      </div>

      {/* Inline Editor */}
      <div className="relative">
        <Editor
          height={height}
          defaultLanguage="json"
          value={value}
          onChange={onChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            scrollBeyondLastLine: false,
            wordWrap: "on",
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
            fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
          }}
        />
      </div>

      {/* Fullscreen Modal */}
      <Dialog
        open={isModalOpen}
        onClose={handleClose}
        fullScreen
        PaperProps={{
          style: {
            backgroundColor: "#1e1e1e",
          },
        }}
      >
        <div className="flex flex-col h-full">
           {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#252526] border-b border-[#333]">
            <div className="flex items-center gap-3">
                 <Typography variant="h6" className="text-white font-bold">
                    {label}
                 </Typography>
                 <span className="text-xs px-2 py-1 rounded-md bg-white/10 text-gray-400 font-mono">Editor Mode</span>
            </div>
            <div className="flex items-center gap-3">
                 <Button
                    onClick={handleClose}
                    variant="contained"
                    startIcon={<FiCheck />}
                    sx={{
                        bgcolor: '#4F46E5',
                        '&:hover': { bgcolor: '#4338CA' },
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontWeight: 600
                    }}
                 >
                    Done
                 </Button>
                 <IconButton onClick={handleClose} className="text-gray-400 hover:text-white">
                    <FiMinimize2 />
                 </IconButton>
            </div>
          </div>
          
          {/* Modal Editor Body */}
          <div className="flex-1 overflow-hidden">
             <Editor
                height="100%"
                defaultLanguage="json"
                value={value}
                onChange={onChange}
                theme="vs-dark"
                options={{
                    minimap: { enabled: true },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    wordWrap: "on",
                    automaticLayout: true,
                    padding: { top: 24, bottom: 24 },
                    fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
                }}
             />
          </div>
        </div>
      </Dialog>
    </div>
  )
}

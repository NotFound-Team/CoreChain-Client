"use client";

import React, { useState, useRef, useEffect, use } from "react";
import { Box, IconButton, Stack, Typography, Avatar, Grid, Tooltip, Paper } from "@mui/material";
import {
  MdMic,
  MdMicOff,
  MdVideocam,
  MdVideocamOff,
  MdScreenShare,
  MdStopScreenShare,
  MdCallEnd,
  MdChat,
  MdPeople,
  MdSettings,
} from "react-icons/md";
import { useRouter } from "next/navigation";

type MeetingPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const MeetingRoom = ({ params }: MeetingPageProps) => {
  const { id } = use(params);
  const router = useRouter();

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const screenShareRef = useRef<HTMLVideoElement>(null);

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);

  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    const initMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        alert("Không thể truy cập Camera/Micro. Vui lòng kiểm tra quyền trình duyệt.");
      }
    };

    initMedia();

    return () => {
      localStream?.getTracks().forEach((track) => track.stop());
      screenStream?.getTracks().forEach((track) => track.stop());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSharing && screenStream && screenShareRef.current) {
      screenShareRef.current.srcObject = screenStream;
    }
  }, [isSharing, screenStream]);

  const toggleMic = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !isMicOn;
      });
      setIsMicOn(!isMicOn);
    }
  };

  const toggleCam = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !isCamOn;
      });
      setIsCamOn(!isCamOn);
    }
  };

  const toggleScreenShare = async () => {
    if (!isSharing) {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });
        setScreenStream(stream);
        setIsSharing(true);

        stream.getVideoTracks()[0].onended = () => {
          handleStopSharing(stream);
        };
      } catch (err) {
      }
    } else {
      handleStopSharing(screenStream);
    }
  };

  const handleStopSharing = (stream: MediaStream | null) => {
    stream?.getTracks().forEach((track) => track.stop());
    setScreenStream(null);
    setIsSharing(false);
  };

  const handleLeaveMeeting = () => {
    if (confirm("Bạn có chắc chắn muốn rời cuộc họp?")) {
      localStream?.getTracks().forEach((track) => track.stop());
      screenStream?.getTracks().forEach((track) => track.stop());
      router.push("/operations/meetings");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "#202124",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
      }}
    >
      {/* KHÔNG GIAN VIDEO CHÍNH */}
      <Box
        sx={{ flexGrow: 1, p: 2, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
      >
        <Grid container spacing={2} sx={{ maxWidth: "1600px", height: "90%", alignItems: "center" }}>
          {/* Màn hình Chia sẻ (Chiếm phần lớn nếu đang bật) */}
          {isSharing && (
            <Grid item xs={12} md={isSharing ? 8 : 0}>
              <Paper
                sx={{
                  height: "100%",
                  bgcolor: "black",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "2px solid #8ab4f8",
                }}
              >
                <video
                  ref={screenShareRef}
                  autoPlay
                  playsInline
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </Paper>
            </Grid>
          )}

          {/* Camera cá nhân */}
          <Grid item xs={12} md={isSharing ? 4 : 8} sx={{ height: "100%" }}>
            <Paper
              sx={{
                height: "100%",
                bgcolor: "#3c4043",
                borderRadius: "12px",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted // Quan trọng: Mute chính mình để không bị vọng âm
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: isCamOn ? "block" : "none",
                  transform: "scaleX(-1)", // Hiệu ứng gương
                }}
              />
              {!isCamOn && <Avatar sx={{ width: 120, height: 120, fontSize: "4rem", bgcolor: "#1a73e8" }}>U</Avatar>}

              <Box
                sx={{
                  position: "absolute",
                  bottom: 16,
                  left: 16,
                  bgcolor: "rgba(0,0,0,0.6)",
                  color: "white",
                  px: 2,
                  py: 0.5,
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography variant="body2">Bạn</Typography>
                {!isMicOn && <MdMicOff color="#ea4335" />}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          height: "80px",
          bgcolor: "#202124",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 4,
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Box>
          <Typography color="white" variant="subtitle2" fontWeight="500">
            Meeting ID: {id}
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <Tooltip title={isMicOn ? "Tắt Mic" : "Mở Mic"}>
            <IconButton
              onClick={toggleMic}
              sx={{
                bgcolor: isMicOn ? "#3c4043" : "#ea4335",
                color: "white",
                "&:hover": { bgcolor: isMicOn ? "#4c5053" : "#d93025" },
              }}
            >
              {isMicOn ? <MdMic size={24} /> : <MdMicOff size={24} />}
            </IconButton>
          </Tooltip>

          <Tooltip title={isCamOn ? "Tắt Cam" : "Mở Cam"}>
            <IconButton
              onClick={toggleCam}
              sx={{
                bgcolor: isCamOn ? "#3c4043" : "#ea4335",
                color: "white",
                "&:hover": { bgcolor: isCamOn ? "#4c5053" : "#d93025" },
              }}
            >
              {isCamOn ? <MdVideocam size={24} /> : <MdVideocamOff size={24} />}
            </IconButton>
          </Tooltip>

          <Tooltip title={isSharing ? "Dừng chia sẻ" : "Chia sẻ màn hình"}>
            <IconButton
              onClick={toggleScreenShare}
              sx={{
                bgcolor: isSharing ? "#8ab4f8" : "#3c4043",
                color: isSharing ? "black" : "white",
                "&:hover": { bgcolor: isSharing ? "#aecbfa" : "#4c5053" },
              }}
            >
              {isSharing ? <MdStopScreenShare size={24} /> : <MdScreenShare size={24} />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Rời cuộc họp">
            <IconButton
              onClick={handleLeaveMeeting}
              sx={{
                bgcolor: "#ea4335",
                color: "white",
                px: 4,
                borderRadius: "25px",
                "&:hover": { bgcolor: "#d93025" },
              }}
            >
              <MdCallEnd size={24} />
            </IconButton>
          </Tooltip>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Tooltip title="Thành viên">
            <IconButton sx={{ color: "white" }}>
              <MdPeople size={22} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Trò chuyện">
            <IconButton sx={{ color: "white" }}>
              <MdChat size={22} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cài đặt">
            <IconButton sx={{ color: "white" }}>
              <MdSettings size={22} />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
    </Box>
  );
};

export default MeetingRoom;

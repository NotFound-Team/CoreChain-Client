import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // Đừng quên import CSS của NProgress

const ProgressBar = () => {
  const location = useLocation();

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    // Kích hoạt NProgress khi route thay đổi
    handleStart();

    // Dừng NProgress khi component được render
    handleStop();

    return () => {
      // Cleanup (nếu cần)
      handleStop();
    };
  }, [location]);

  return null; // Không cần render gì từ component này
};

export default ProgressBar;

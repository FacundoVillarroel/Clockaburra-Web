import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Helper function to detect mobile devices
const isMobileDevice = () => {
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
    navigator.userAgent
  );
};

const ScreenSizeRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResizeOrDeviceCheck = () => {
      const screenWidth = window.innerWidth;
      const isMobile = isMobileDevice();

      // Exclude these routes from redirection
      const excludedRoutes = [
        "/validation",
        "/login",
        "/register",
        "/app-for-employees-link",
      ];

      // Only redirect if the screen width is less than 1024px or on mobile device,
      // and we are not on an excluded route and we are not already at /app-for-employees-link
      if (
        (screenWidth < 1024 || isMobile) &&
        !excludedRoutes.includes(location.pathname)
      ) {
        navigate("/app-for-employees-link", { replace: true });
      }
    };

    // Run the check once on component mount
    handleResizeOrDeviceCheck();

    // Add event listener for window resize
    window.addEventListener("resize", handleResizeOrDeviceCheck);

    // Cleanup event listener on component unmount
    return () =>
      window.removeEventListener("resize", handleResizeOrDeviceCheck);
  }, [location, navigate]);

  return null;
};

export default ScreenSizeRedirect;

import { GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = ({ handleSuccess, handleError }) => {
  return <GoogleLogin onSuccess={handleSuccess} onError={handleError} />;
};

export default GoogleLoginButton;

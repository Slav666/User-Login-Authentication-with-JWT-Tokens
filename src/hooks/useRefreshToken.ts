import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get('/refresh', {
      //I need to check withCredentials? => This allows us to send cookies with our request?
      withCredentials: true,
    });
    setAuth(prv => {
      console.log(
        'previous state from useRefresh token function',
        JSON.stringify(prv),
      );
      console.log(
        'response data access token from use refresh token function',
        response.data.accessToken,
      );
      return { ...prv, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;

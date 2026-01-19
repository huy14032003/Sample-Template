import { useLoginMutation } from "@/features/auth/services/auth.api";
import { LoginFormValues } from "@/features/auth/types/auth.types";
import { useAppDispatch } from "@/stores/hooks";
import { setAccessToken, setRefreshToken } from "@/stores/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export interface ErrorResponse {
  data: {
    detail?: string;
    [key: string]: unknown;
  };
  message: string;
  detail: string;
  success: boolean;
  status: string;
}

const useLogin = () => {
  const [postLogin, { isLoading: loadingLogin }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function formSubmit(data: LoginFormValues) {
    try {
      const response = await postLogin(data).unwrap();
      // Lưu token vào Redux store và Cookies
      dispatch(setAccessToken(response?.data?.accessToken));
      dispatch(setRefreshToken(response?.data?.refreshToken));
      navigate("/");
    } catch {
     
    }
  }
  return {
    formSubmit,
    loadingLogin,
  };
};

export default useLogin;

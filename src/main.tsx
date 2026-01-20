import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AppRoutes } from "@/route";
import { Provider } from "react-redux";
import { store } from "@/stores/store";
import "./index.css";
import { Toaster } from "@/components/ui/sonner";
import ScreenLoading from "@/components/loading/ScreenLoading";
import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";

const primaryColor = "#2bd9d0";
const primaryHoverColor = "#9feeea";

const theme = {
  hashed: false,
  token: {
    colorPrimary: primaryColor,
    colorInfo: primaryColor,
    colorLink: primaryColor,
    colorLinkHover: primaryHoverColor,
    colorPrimaryHover: primaryHoverColor,
  },
  components: {
    Button: {
      colorPrimary: primaryColor,
      colorPrimaryHover: primaryHoverColor,
    },
  },
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <StyleProvider layer>
        <ConfigProvider theme={theme} prefixCls="my-antd">
          <RouterProvider router={AppRoutes} />
          <Toaster />
          <ScreenLoading />
        </ConfigProvider>
      </StyleProvider>
    </Provider>
  </StrictMode>,
);

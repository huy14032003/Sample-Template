import { useAppSelector } from "@/stores/hooks";
import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const AppLayout = () => {
  const navigate = useNavigate();
  const { accessToken } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (!accessToken) {
      navigate("/auth/login");
    }
  }, [accessToken, navigate]);

  //   useEffect(() => {
  //     if (!isAccess && location.pathname !== FORBIDDENERROR) {
  //       navigate(FORBIDDENERROR);
  //     }
  //   }, [isAccess, location.pathname]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const currentKey = useMemo(() => {
    const selected = location.pathname.split("/");
    return selected.filter((n) => n !== "");
  }, [location.pathname]);

  return <div></div>;
};

export default AppLayout;

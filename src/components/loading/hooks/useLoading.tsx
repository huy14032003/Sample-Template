import { useState } from "react";

const useLoading = () => {
  const [isActive, setIsActive] = useState(false);
  const showLoading = () => {
    setIsActive(true);
  };
  const hiddenLoading = () => {
    setIsActive(false);
  };

  return {
    showLoading,
    hiddenLoading,
    isActive,
  };
};

export default useLoading;

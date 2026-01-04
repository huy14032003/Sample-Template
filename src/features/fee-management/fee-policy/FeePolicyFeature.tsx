import useFeePolicy from "@/features/fee-management/fee-policy/hooks/useFeePolicy";
import React from "react";

const FeePolicyFeature = () => {
  const { getPolicy } = useFeePolicy();
  console.log(getPolicy)
  return <div></div>;
};

export default FeePolicyFeature;

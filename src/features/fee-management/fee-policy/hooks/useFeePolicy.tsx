import { useGetFeePoliciesQuery } from "@/features/fee-management/fee-policy/services/feePolicy.api";

const useFeePolicy = () => {
  const { data: getPolicy } = useGetFeePoliciesQuery({});
  return {
    getPolicy,
  };
};

export default useFeePolicy;

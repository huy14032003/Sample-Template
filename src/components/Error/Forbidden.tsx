import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen ">
      <p className=" text-6xl font-bold">403</p>
      <p className="font-normal">You do not have permission to access this URL.</p>
      <Link className="mt-3" to={"/"}>
        <Button variant="outline">Back home</Button>
      </Link>
    </div>
  );
};

export default Forbidden;

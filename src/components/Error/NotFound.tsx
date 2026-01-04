import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen ">
      <p className=" text-6xl font-bold">404</p>
      <p className="font-normal">The requested URL was not found on this server.</p>
      <Link className="mt-3" to={"/"}>
        <Button variant='outline' >Back home</Button>
      </Link>
    </div>
  );
};

export default NotFound;

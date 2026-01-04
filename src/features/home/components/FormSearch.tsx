import React from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
const FormSearch = () => {
  
  return (
    <Card>
      <CardContent>
        <div className=" bg-content-card rounded-2xl  p-10 text-center">
          <h1 className="text-3xl font-bold mb-4">Home Page</h1>
          <p className="mb-6">Chào mừng bạn đến với trang chủ!</p>
          <div className="mt-8">
            <Link to="/dashboard" className="text-blue-500 dark:text-blue-400 hover:underline text-lg">
              Đi đến Dashboard →
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FormSearch;

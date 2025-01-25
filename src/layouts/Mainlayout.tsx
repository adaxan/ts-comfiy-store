import React from "react";
import { Link } from "react-router-dom";
import { ReactNode } from "react";

type MainLayoutProps = {
    children: ReactNode;
  };
const MainLayout: React.FC <MainLayoutProps>= ({children}) => {
  return (
    <div>
      <div className="bg-purple-500  text-white py-2">
        <div className="container mx-auto flex gap-4 justify-end text-sm">
          <Link to="/login" className="hover:underline">
            Sign in / Guest
          </Link>
          <Link to="/register" className="hover:underline">
            Create Account
          </Link>
        </div>
      </div>

      <div className="bg-gray-200 py-4">
        <div className="container mx-auto flex items-center justify-around">
          <Link to="/" className="text-3xl font-bold text-gray-800">
            C
          </Link>

          <div className="flex gap-8 font-medium text-gray-700">
            <Link to="/" className="">
              Home
            </Link>
            <Link to="/about" className="">
              About
            </Link>
            <Link to="/products" className="">
              Products
            </Link>
            <Link to="/card" className="">
              Card
            </Link>
          </div>
        </div>
      </div>
        <div className="">{children}</div>
    </div>
  );
};

export default MainLayout;
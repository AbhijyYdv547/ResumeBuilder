import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "./Button";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1
          className="text-2xl font-bold text-gray-900 cursor-pointer"
          onClick={() => navigate("/")}
        >
          ResumeGen
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4">
          <Button
            text="Login"
            variant="primary"
            fullWidth={false}
            loading={false}
            onClick={() => navigate("/login")}
          />
          <Button
            text="Get Started"
            variant="primary"
            fullWidth={false}
            loading={false}
            onClick={() => navigate("/register")}
          />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
  <XMarkIcon className="w-6 h-6 text-gray-800" />
) : (
  <Bars3Icon className="w-6 h-6 text-gray-800" />
)}

          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Button
            text="Login"
            variant="primary"
            fullWidth={true}
            loading={false}
            onClick={() => {
              navigate("/login");
              setIsOpen(false);
            }}
          />
          <Button
            text="Get Started"
            variant="primary"
            fullWidth={true}
            loading={false}
            onClick={() => {
              navigate("/register");
              setIsOpen(false);
            }}
          />
        </div>
      )}
    </header>
  );
};

import { icons } from "../../../assets/icons/IconProvider";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const sidebarOptions = [
  {
    label: "Inicio",
    icon: icons.home,
    to: "",
  },
  {
    label: "Tableros",
    icon: icons.dashboard,
    to: "",
  },
  {
    label: "Permisos de Trabajo",
    icon: icons.document,
    to: "",
  },
  {
    label: "Anexo 1",
    icon: icons.documentCheck,
    to: "/app/anexo-one",
  },
  {
    label: "Locacion de Permisos",
    icon: icons.location,
    to: "/app/map-view",
  },
  {
    label: "Institucional",
    icon: icons.info,
    to: "",
  },
];

function SideBar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="2xl:relative fixed top-0 left-0 z-20"
      animate={{
        width: isOpen ? "256px" : "0px",
        transition: { duration: 0.5, ease: "easeInOut" },
      }}
    >
      {/* HAMBURGER ICON */}
      <div className="absolute top-2 -right-11 bg-white border-t border-b border-r rounded-r-lg overflow-hidden z-20">
        <motion.button
          className="p-2"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <icons.menu size={28} />
        </motion.button>
      </div>

      <motion.div
        className={`absolute w-64 h-fit min-h-screen top-0 right-0 bg-gradient-to-l from-accent-500 to-accent-600 shadow-custom-right ${
          isOpen ? "shadow-custom-right" : "shadow-none"
        }`}
      >
        <div className="h-16 bg-white p-2">
          <img src="/logo.png" alt="" className="h-full mx-auto" />
        </div>
        <div className="h-32 border-b border-gray-500 flex justify-center items-center p-4 gap-4">
          <img
            src="/user-placeholder-2.jpg"
            alt="user"
            className="rounded-full w-16 h-16"
          />
          <div>
            <p className="text-white">Victor William Ccanchi Vasquez</p>
            <div className="flex gap-4 p-2 text-white">
              <icons.user />
              <icons.logout />
            </div>
          </div>
        </div>
        <div className="y-4">
          {sidebarOptions.map((option) => (
            <Link
              to={option.to}
              key={option.label}
              className={`flex gap-2 p-4 text-white hover:bg-accent-400/90 transition-colors
              ${location.pathname === option.to ? "bg-accent-500" : ""}
              `}
            >
              <option.icon size={24} />
              <p>{option.label}</p>
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default SideBar;

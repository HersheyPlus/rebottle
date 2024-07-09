import { FaHome, FaUser, FaExchangeAlt } from "react-icons/fa";
import { TbReport } from "react-icons/tb";
import { CiLogin, CiLogout } from "react-icons/ci";

export const sideBarItems = [
  { to: "/", icon: FaHome, label: "Home", role: "ALL" },
  { to: "/profile", icon: FaUser, label: "Profile", role: "ALL" },
  {
    to: "/user-report-form",
    icon: TbReport,
    label: "Report Form",
    role: "USER",
  },
  {
    to: "/user-report-list",
    icon: TbReport,
    label: "Report List",
    role: "USER",
  },
  {
    to: "/admin-report-list",
    icon: TbReport,
    label: "Report Received",
    role: "ADMIN",
  },
  {
    to: "/exchanges",
    icon: FaExchangeAlt,
    label: "Exchange Points",
    role: "USER",
  },
  { to: "/login", icon: CiLogin, label: "Login", role: "ALL" },
  { to: "/logout", icon: CiLogout, label: "Logout", role: "ALL" },
];

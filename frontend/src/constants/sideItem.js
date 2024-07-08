import { FaHome, FaUser,FaExchangeAlt } from 'react-icons/fa';
import { TbReport } from 'react-icons/tb';
import { CiLogin, CiLogout } from 'react-icons/ci';

export const sideBarItems = [
  { to: "/", icon: FaHome, label: "Home" },
  { to: "/profile", icon: FaUser, label: "Profile" },
  { to: "/user-report-form", icon: TbReport, label: "Report (User)" },
  { to: "/user-report-list", icon: TbReport, label: "Report List (User)" },
  { to: "/admin-report-form", icon: TbReport, label: "Report Detail (Admin)" },
  { to: "/admin-report-list", icon: TbReport, label: "Report Received (Admin)" },
  { to: "/exchanges", icon: FaExchangeAlt, label: "Exchang Points" },
  { to: "/login", icon: CiLogin, label: "Login" },
  { to: "/logout", icon: CiLogout, label: "Logout" }
];
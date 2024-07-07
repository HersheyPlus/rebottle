import { FaHome, FaUser,FaExchangeAlt } from 'react-icons/fa';
import { TbReport } from 'react-icons/tb';
import { CiLogin, CiLogout } from 'react-icons/ci';

export const sideBarItems = [
  { to: "/", icon: FaHome, label: "Home" },
  { to: "/profile", icon: FaUser, label: "Profile" },
  { to: "/report", icon: TbReport, label: "Report" },
  { to: "/user-report-detail", icon: TbReport, label: "Report Detail (User)" },
  { to: "/admin-report-detail", icon: TbReport, label: "Report Detail (Admin)" },
  { to: "/report-received", icon: TbReport, label: "Report Received (Admin)" },
  { to: "/exchanges", icon: FaExchangeAlt, label: "Exchang Points" },
  { to: "/login", icon: CiLogin, label: "Login" },
  { to: "/logout", icon: CiLogout, label: "Logout" }
];
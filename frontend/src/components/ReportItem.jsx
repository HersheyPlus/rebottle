/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const ReportItem = ({ report, user }) => {
  return (
    <div className="bg-gray-50 flex gap-8 border-2 border-primary p-4 rounded-xl shadow-lg">
      <div className="w-[200px] h-[200px]">
        <img
          src={report.imageUrl || "../../public/vite.svg"}
          alt="Report image"
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 justify-between">
        <div className="text-base space-y-2 ">
          <h1 className="text-lg font-medium">Location</h1>
          <p>Latitude: {report.latitude}</p>
          <p>Longitude: {report.longitude}</p>
        </div>
        <Link
          to={user.role === "ADMIN" ? `/admin-report-detail/${report.id}` : `/user-report-detail/${report.id}`}
          className="text-primary hover:underline hover:underline-offset-2 "
        >
          <button
            type="submit"
            className={`w-36 ${report.status === "PENDING" ? "bg-primary hover:bg-primary/90" : ""} 
              ${report.status === "COLLECTED" ? "bg-green-500 hover:bg-green-500/90" : ""} 
              ${report.status === "CANCELLED" ? "bg-red-500 hover:bg-red-500/90" : ""} 
              text-white p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary`}
          >
            View
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ReportItem;
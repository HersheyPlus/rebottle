import { Link } from "react-router-dom";

const ReportItem = () => {
  return (
    <div className="bg-gray-50 flex gap-8 border-2 border-primary p-4 rounded-xl shadow-lg">
      <div className="w-[200px] h-[200px]">
        <img
          src="../../public/vite.svg"
          alt="img"
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 justify-between">
        <div className="text-base space-y-2 ">
          <h1 className="text-lg font-medium">Location</h1>
          <p>Latitude: 11.111</p>
          <p>Longitude: 313.1313</p>
        </div>
        <Link
          to="/report-detail"
          className="text-primary hover:underline hover:underline-offset-2 "
        >
          <button
            type="submit"
            className="w-36 bg-primary text-white p-3 rounded-2xl hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            View
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ReportItem;

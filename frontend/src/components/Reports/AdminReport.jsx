import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import adminApi from "../../api/admin";
import { Link } from "react-router-dom";

const AdminReport = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await adminApi.getReportById(id);
        setReport(data.report);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchReport();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      await adminApi.updateReport(id, {
        plasticCount: parseInt(data.plastic),
        glassCount: parseInt(data.glass),
        aluminumCount: parseInt(data.aluminum),
        milkCount: parseInt(data.milk),
      });
      navigate('/admin-report-list');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!report) return <p>No report found</p>;

  return (
    <section id="admin-report-detail" className="section-container h-screen">
      <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-lg">
        <h1 className="text-4xl font-medium mb-6">Report Detail</h1>
        <div className="text-gray-600 font-medium">
          <p className="mb-2">report id: {report.id}</p>
          <p className="mb-2">user id: {report.userId}</p>
          <p className="mb-2">latitude: {report.latitude}</p>
          <p className="mb-2">longitude: {report.longitude}</p>
          <p className="mb-14">description: {report.description}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {["plastic", "glass", "aluminum", "milk"].map((bottleType) => (
            <div key={bottleType} className="mb-10">
              <label
                htmlFor={bottleType}
                className="block text-lg font-medium text-primary mb-2"
              >
                {bottleType.charAt(0).toUpperCase() + bottleType.slice(1)}{" "}
                Bottle
              </label>
              <input
                type="number"
                id={bottleType}
                placeholder={`Amount of ${bottleType} bottles`}
                defaultValue={report[`${bottleType}Count`] || 0}
                className={`w-full px-3 py-2 border rounded-md placeholder-secondary focus:outline-none focus:ring-2 ${
                  errors[bottleType]
                    ? "border-red-500 focus:ring-red-500"
                    : "border-secondary focus:ring-secondary"
                }`}
                {...register(bottleType, {
                  required: `${bottleType} bottle amount is required`,
                  min: { value: 0, message: "Amount cannot be negative" },
                  pattern: {
                    value: /^\d+$/,
                    message: "Please enter a valid number",
                  },
                })}
              />
              {errors[bottleType] && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors[bottleType].message}
                </p>
              )}
            </div>
          ))}

          {report.status === "PENDING" && (<button
            type="submit"
            className="w-full bg-primary text-white p-4 rounded-2xl hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-secondary mb-16"
          >
            Collect
          </button>)}
          {report.status === "COLLECTED" && (
            <Link to="/admin-report-list">
            <button
            type="submit"
            className="w-full bg-green-500 text-white p-4 rounded-2xl hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-secondary mb-16"
          >
            Collect
          </button></Link>)}
          {report.status === "CANCELLED" && (
            <Link to="/admin-report-list">
            <button
            type="submit"
            className="w-full bg-red-500 text-white p-4 rounded-2xl hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-secondary mb-16"
          >
            Collect
          </button></Link>
          )}
        </form>
      </div>
    </section>
  );
};

export default AdminReport;
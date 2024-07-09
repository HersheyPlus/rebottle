import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import reportApi from "../../api/report";
import { Link } from "react-router-dom";

const UserReport = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await reportApi.getReportById(id);
        setReport(data.report);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsUpdating(true);
    try {
      const formData = new FormData(event.target);
      const updatedReport = {
        latitude: formData.get("latitude"),
        longitude: formData.get("longitude"),
        description: formData.get("description"),
      };
      if (selectedImage) {
        updatedReport.image = selectedImage;
      }
      await reportApi.updateReport(id, updatedReport);
      alert(`Report id: ${id} updated successfully`);
      navigate("/user-report-list");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = async () => {
    setIsCancelling(true);
    try {
      await reportApi.cancelReport(id);
      alert("Report cancelled successfully");
      navigate("/user-report-list");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsCancelling(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!report) return <p>No report found</p>;

  return (
    <section id="user-report-detail" className="section-container h-screen">
      <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-lg">
        <h1 className="text-4xl font-medium mb-6">Report Detail</h1>
        <div className="text-gray-600 font-medium">
          <p className="mb-2">report id: {report.id}</p>
          <p className="mb-4">user id: {report.userId}</p>
          {report.status === "COLLECTED" && (
            <h1 className="mb-10 text-lg font-semibold text-green-600">
              earn + {report.earnedPoints} points
            </h1>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <label
              htmlFor="latitude"
              className="block text-lg font-medium text-primary mb-2"
            >
              Latitude
            </label>
            <input
              type="text"
              id="latitude"
              name="latitude"
              defaultValue={report.latitude}
              className="w-full px-3 py-2 border border-secondary rounded-md placeholder-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
          <div className="mb-8">
            <label
              htmlFor="longitude"
              className="block text-lg font-medium text-primary mb-2"
            >
              Longitude
            </label>
            <input
              type="text"
              id="longitude"
              name="longitude"
              defaultValue={report.longitude}
              className="w-full px-3 py-2 border border-secondary rounded-md placeholder-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-lg font-medium text-primary mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="5"
              defaultValue={report.description}
              className="w-full p-3 border border-secondary rounded-md placeholder-secondary focus:outline-none focus:ring-2 focus:ring-secondary text-base"
            ></textarea>
          </div>
          <div className="mb-10">
            <label
              htmlFor="image"
              className="block text-lg font-medium text-primary mb-2"
            >
              {report.status === "COLLECTED" ? "" : "Where is you found ?"}
            </label>
            {report.status === "PENDING" && (
                <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-3 border border-secondary rounded-md text-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            ) }
            {selectedImage && (
              <p className="mt-2 text-sm text-gray-600">
                Selected image: {selectedImage.name}
              </p>
            )}
            {(imagePreview || report.imageUrl) && (
              <div className="mt-4">
                <p className="text-sm font-medium text-primary mb-2">
                  Image Preview:
                </p>
                <img
                  src={imagePreview || report.imageUrl}
                  alt="Preview"
                  className="max-w-full h-auto rounded-lg shadow-md"
                />
              </div>
            )}
          </div>

          {report.status === "PENDING" && (
            <>
              <button
                type="submit"
                disabled={isUpdating}
                className={`w-full ${
                  isUpdating ? "bg-gray-400" : "bg-primary hover:bg-primary/90"
                } text-white p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary mb-8 transition-colors duration-200`}
              >
                {isUpdating ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Updating...
                  </span>
                ) : (
                  "Update Report"
                )}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isCancelling}
                className={`w-full ${
                  isCancelling ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
                } text-white p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 mb-8 transition-colors duration-200`}
              >
                {isCancelling ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Cancelling...
                  </span>
                ) : (
                  "Cancel Report"
                )}
              </button>
            </>
          )}
          {report.status === "COLLECTED" && (
            <Link to="/user-report-list">
              <button
                type="button"
                className="w-full bg-green-500 text-white p-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 mb-8"
              >
                Collected
              </button>
            </Link>
          )}
          {report.status === "CANCELLED" && (
            <Link to="/user-report-list">
              <button
                type="button"
                className="w-full bg-red-500 text-white p-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 mb-8"
              >
                Cancelled
              </button>
            </Link>
          )}
        </form>
      </div>
    </section>
  );
};

export default UserReport;

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import reportApi from '../../api/report';
import { Link } from 'react-router-dom';

const UserReport = () => {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
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
        try {
            const formData = new FormData(event.target);
            const updatedReport = {
                latitude: formData.get('latitude'),
                longitude: formData.get('longitude'),
                description: formData.get('description'),
            };
            if (selectedImage) {
                updatedReport.image = selectedImage;
            }
            await reportApi.updateReport(id, updatedReport);
            alert(`Report id: ${id} updated successfully`);
            navigate('/user-report-list');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCancel = async () => {
        try {
            await reportApi.cancelReport(id);
            alert('Report cancelled successfully');
            navigate('/user-report-list');
        } catch (err) {
            setError(err.message);
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
                        <h1 className='mb-10 text-lg font-semibold text-green-600'>earn + {report.earnedPoints} points</h1>
                    )}
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-8">
                        <label htmlFor="latitude" className="block text-lg font-medium text-primary mb-2">
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
                        <label htmlFor="longitude" className="block text-lg font-medium text-primary mb-2">
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
                        <label htmlFor="description" className="block text-lg font-medium text-primary mb-2">
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
                        <label htmlFor="image" className="block text-lg font-medium text-primary mb-2">Where You Found ?</label>
                        <input 
                            type="file" 
                            id="image" 
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full p-3 border border-secondary rounded-md text-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
                        />
                        {selectedImage && (
                            <p className="mt-2 text-sm text-gray-600">
                                Selected image: {selectedImage.name}
                            </p>
                        )}
                        {(imagePreview || report.imageUrl) && (
                            <div className="mt-4">
                                <p className="text-sm font-medium text-primary mb-2">Image Preview:</p>
                                <img src={imagePreview || report.imageUrl} alt="Preview" className="max-w-full h-auto rounded-lg shadow-md" />
                            </div>
                        )}
                    </div>

                   {report.status === "PENDING" && (
                    <>
                     <button
                        type="submit"
                        className="w-full bg-primary text-white p-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-secondary mb-8"
                    >
                        Update Report
                    </button>
                    <button
                    type="button"
                    onClick={handleCancel}
                    className="w-full bg-red-500 text-white p-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-secondary mb-8"
                >
                    Cancel Report
                </button>
                    </>
                   )}
                   {report.status === "COLLECTED" && (
                    <Link
                    to="/user-report-list"
                >
                    <button
                    type="button"
                    className="w-full bg-green-500 text-white p-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-secondary mb-8"
                >
                    Collected
                </button>
                </Link>
                   )}
                   {report.status === "CANCELLED" && (
                    <Link
                    to="/user-report-list"
                >
                    <button
                    type="button"
                    className="w-full bg-red-500 text-white p-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-secondary mb-8"
                >
                    Cancelled
                </button>
                </Link>
                   )}
                </form>
            </div>
        </section>
    );
}

export default UserReport;
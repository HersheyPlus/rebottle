import { useState } from "react";
import { useForm } from "react-hook-form";
import reportApi from "../api/report";
import { useNavigate } from "react-router-dom";

const ReportForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmit = async (data) => {
    setError('');
    setIsLoading(true);
  
    try {
      const formData = new FormData();
      formData.append('latitude', data.latitude);
      formData.append('longitude', data.longitude);
      formData.append('description', data.description);
  
      if (selectedImage) {
        formData.append('image', selectedImage);
      }
  
      await reportApi.createReport(formData);
      navigate('/user-report-list');
      reset();
      setSelectedImage(null);
      setImagePreview(null);
    } catch (error) {
      setError(error.message || 'Failed to submit report. Please try again.');
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="report-form" className="section-container h-screen">
      <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-lg">
        <h2 className="text-2xl font-light mb-8">Welcome To Report !</h2>
        <h1 className="text-4xl font-medium mb-3">Report To Admin</h1>
        <p className="text-gray-600 mb-12 font-light">
          Where did you find the bottles, Let&apos;s us know.
        </p>
        <p className="text-green-600 mb-8 font-medium">
          * You can find latitude and longitude from google maps *
        </p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-8">
            <label htmlFor="latitude" className="block text-lg font-medium text-primary mb-2">
              Latitude
            </label>
            <input
              type="text"
              id="latitude"
              {...register("latitude", { 
                required: "Latitude is required",
                pattern: {
                  message: "Invalid latitude format"
                }
              })}
              placeholder="Enter your latitude location"
              className="w-full px-3 py-2 border border-secondary rounded-md placeholder-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            {errors.latitude && <p className="text-red-500 mt-1">{errors.latitude.message}</p>}
          </div>

          <div className="mb-8">
            <label htmlFor="longitude" className="block text-lg font-medium text-primary mb-2">
              Longitude
            </label>
            <input
              type="text"
              id="longitude"
              {...register("longitude", { 
                required: "Longitude is required",
                pattern: {
                  message: "Invalid longitude format"
                }
              })}
              placeholder="Enter your longitude location"
              className="w-full px-3 py-2 border border-secondary rounded-md placeholder-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            {errors.longitude && <p className="text-red-500 mt-1">{errors.longitude.message}</p>}
          </div>


          <div className="mb-6">
            <label htmlFor="description" className="block text-lg font-medium text-primary mb-2">
              Description
            </label>
            <textarea
              id="description"
              {...register("description", { required: "Description is required" })}
              rows="5"
              placeholder="Enter your description about what you found"
              className="w-full p-3 border border-secondary rounded-md placeholder-secondary focus:outline-none focus:ring-2 focus:ring-secondary text-base"
            ></textarea>
            {errors.description && <p className="text-red-500 mt-1">{errors.description.message}</p>}
          </div>

          <div className="mb-10">
            <label htmlFor="image" className="block text-lg font-medium text-primary mb-2">Where You Found ?</label>
            <input 
              type="file" 
              id="image" 
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 border border-secondary rounded-md text-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            {selectedImage && (
              <p className="mt-2 text-sm text-gray-600">
                Selected image: {selectedImage.name}
              </p>
            )}
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm font-medium text-primary mb-2">Image Preview:</p>
                <img src={imagePreview} alt="Preview" className="max-w-full h-auto rounded-lg shadow-md" />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full ${isLoading ? 'bg-gray-400' : 'bg-primary hover:bg-primary/90'} text-white p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary mb-8 transition-colors duration-200`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Report'
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ReportForm;
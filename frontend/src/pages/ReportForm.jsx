import { useState } from "react";

const ReportForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

        <form action="">
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
              placeholder="Enter your latitude location"
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
              placeholder="Enter your longitude location"
              className="w-full px-3 py-2 border border-secondary rounded-md placeholder-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
          <div className="mb-8">
            <label
              htmlFor="username"
              className="block text-lg font-medium text-primary mb-2"
            >
              Location additional
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter more detail about your location"
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
              rows="5"
              placeholder="Enter your description about what you found"
              className="w-full p-3 border border-secondary rounded-md placeholder-secondary focus:outline-none focus:ring-2 focus:ring-secondary text-base"
            ></textarea>
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
            className="w-full bg-primary text-white p-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-secondary mb-8"
          >
            Submit Report
          </button>
        </form>
      </div>
    </section>
  );
};

export default ReportForm;

import { useState } from 'react';

const UserReport = () => {
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
    <section id="user-report-detail" className="section-container h-screen">
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-medium mb-6">Report Detail</h1>
      <div className="text-gray-600 font-medium">
      <p className="mb-2">report id:441</p>
      <p className="mb-12">user email:da@gmail.com</p>
      </div>

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
              id="text"
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
              id="message"
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
            Update Report
          </button>
        </form>
    </div>
  </section>
  )
}

export default UserReport
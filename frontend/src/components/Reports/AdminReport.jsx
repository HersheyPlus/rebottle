import { useForm } from "react-hook-form";

const AdminReport = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Here you would typically send the collection data to your backend
  };

  return (
    <section id="admin-report-detail" className="section-container h-screen">
      <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-lg">
        <h1 className="text-4xl font-medium mb-6">Report Detail</h1>
        <div className="text-gray-600 font-medium">
          <p className="mb-2">report id: 441</p>
          <p className="mb-2">user id: 411</p>
          <p className="mb-12">user email: da@gmail.com</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {["plastic", "glass", "aluminum", "milk"].map((bottleType) => (
            <div key={bottleType} className="mb-10">
              <label htmlFor={bottleType} className="block text-lg font-medium text-primary mb-2">
                {bottleType.charAt(0).toUpperCase() + bottleType.slice(1)} Bottle
              </label>
              <input 
                type="number" 
                id={bottleType} 
                placeholder={`Amount of ${bottleType} bottles`} 
                className={`w-full px-3 py-2 border rounded-md placeholder-secondary focus:outline-none focus:ring-2 ${errors[bottleType] ? 'border-red-500 focus:ring-red-500' : 'border-secondary focus:ring-secondary'}`}
                {...register(bottleType, { 
                  required: `${bottleType} bottle amount is required`,
                  min: { value: 0, message: "Amount cannot be negative" },
                  pattern: { value: /^\d+$/, message: "Please enter a valid number" }
                })}
              />
              {errors[bottleType] && <p className="mt-1 text-red-500 text-sm">{errors[bottleType].message}</p>}
            </div>
          ))}

          <button 
            type="submit" 
            className="w-full bg-primary text-white p-4 rounded-2xl hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-secondary mb-16"
          >
            Collect
          </button>
        </form>
      </div>
    </section>
  )
}

export default AdminReport;
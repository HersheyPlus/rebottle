

const Points = () => {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="border-primary border p-4 w-[300px] bg-white rounded-2xl h-[150px]">
        <h1 className="text-lg">Total Point</h1>
        <h1 className="font-semibold text-2xl mt-3">10,000 Points</h1>
      </div>
      <div className="border-primary border p-4 w-[300px] bg-[#FFEFEF] rounded-2xl h-[150px]">
        <h1 className="text-lg">Point Remaining</h1>
        <h1 className="font-semibold text-2xl mt-3">10,000 Points</h1>
      </div>
    </div>
  )
}

export default Points
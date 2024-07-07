import { FaStar } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const ExchangeItem = ({rating}) => {
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
          <h1 className="text-xl font-medium">This is awesome reward</h1>
          <p>Points: 60,000 Points</p>
          <p>Type: Private things</p>
          <p className="flex items-center">
            Rating:
            {[...Array(5)].map((star, index) => (
              <FaStar
                key={index}
                className={index < rating ? "ml-1 text-yellow-400" : "ml-1 text-gray-300"}
                size={20}
              />
            ))}
          </p>
        </div>
        <button
          type="submit"
          className="bg-primary text-white p-3 rounded-2xl hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-secondary w-36"
        >
          Exchange
        </button>
      </div>
    </div>
  );
};

export default ExchangeItem;

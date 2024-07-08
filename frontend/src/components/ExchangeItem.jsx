/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FaStar } from "react-icons/fa";
import { pointsApi } from '../api/points';
import { useAuth } from '../contexts/AuthContext';

const formatNumber = (num) => {
  return new Intl.NumberFormat().format(num);
};

const ExchangeItem = ({rating, points, type}) => {
  const [isExchanging, setIsExchanging] = useState(false);
  const [isExchanged, setIsExchanged] = useState(false);
  const [error, setError] = useState(null);
  const { user, setUser } = useAuth();

  const handleExchange = async () => {
    setIsExchanging(true);
    setError(null);
    try {
      const result = await pointsApi.exchangePoints(points);
      setUser({ ...user, currentPoints: result.currentPoint });
      alert("Exchanged successfully");
      setIsExchanged(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsExchanging(false);
    }
  };

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
          <p>Points: {formatNumber(points)} Points</p>
          <p>Type: {type}</p>
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
          onClick={handleExchange}
          disabled={isExchanging || user.currentPoints < points || isExchanged}
          className={`text-white p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary w-36 ${
            isExchanged
              ? 'bg-green-500 cursor-not-allowed'
              : isExchanging || user.currentPoints < points
              ? 'bg-primary opacity-50 cursor-not-allowed'
              : 'bg-primary hover:bg-primary/90'
          }`}
        >
          {isExchanged ? 'Exchanged' : isExchanging ? 'Exchanging...' : 'Exchange'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default ExchangeItem;
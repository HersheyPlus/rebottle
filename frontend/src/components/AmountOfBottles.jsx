import { useState, useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
import reportApi from "../api/report"; // adjust the import path as needed

const AmountOfBottles = () => {
  const [bottleCounts, setBottleCounts] = useState({
    plastic: 0,
    glass: 0,
    aluminum: 0,
    milk: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await reportApi.getReports();
        const reports = data.reports;
        
        const counts = reports.reduce((acc, report) => {
          acc.plastic += report.plasticCount || 0;
          acc.glass += report.glassCount || 0;
          acc.aluminum += report.aluminumCount || 0;
          acc.milk += report.milkCount || 0;
          return acc;
        }, { plastic: 0, glass: 0, aluminum: 0, milk: 0 });

        setBottleCounts(counts);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const bottles = [
    { title: "Plastic", value: bottleCounts.plastic, color: "#5B8FF9" },
    { title: "Glass", value: bottleCounts.glass, color: "#61DDAA" },
    { title: "Aluminium", value: bottleCounts.aluminum, color: "#F6BD16" },
    { title: "Milk", value: bottleCounts.milk, color: "#8543E0" },
  ];

  const totalBottles = bottles.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <section id="chart" className="flex gap-8">
      <div className=" w-[400px] h-[400px]">
        <h1 className="text-2xl font-bold text-center mb-4">
          Bottles Distribution
        </h1>
        <PieChart
          data={bottles}
          animate
          label={({ dataEntry }) => Math.round(dataEntry.percentage) + "%"}
          labelPosition={60}
          labelStyle={{
            fontSize: "6px",
            fill: "#fff",
            pointerEvents: "none",
          }}
        />
      </div>
      <div className="flex flex-col justify-center gap-4">
        {bottles.map((bottle, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="w-6 h-6 mr-2"
              style={{ backgroundColor: bottle.color }}
            ></div>
            <span>
              {bottle.title}: {bottle.value}
            </span>
          </div>
        ))}
        <h1>total: {totalBottles} bottles</h1>
      </div>
    </section>
  );
};

export default AmountOfBottles;
import { PieChart } from "react-minimal-pie-chart";

const AmountOfBottles = () => {
  const bottles = [
    { title: "Plastic", value: 100, color: "#5B8FF9" },
    { title: "Glass", value: 400, color: "#61DDAA" },
    { title: "Aluminium", value: 500, color: "#F6BD16" },
    { title: "Milk", value: 90, color: "#8543E0" },
  ];

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
        <h1>total: {bottles.reduce((acc, cur) => acc + cur.value, 0)} bottles</h1>
      </div>
    </section>
  );
};

export default AmountOfBottles;

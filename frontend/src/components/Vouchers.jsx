
const Vouchers = () => {
  const vouchers = [
    { rewardName: "Get 10% off on all products" },
    { rewardName: "Get 20% off on all products" },
    { rewardName: "Get 30% off on all products" },
  ];
  return (
    <ul className="grid grid-cols-3 gap-5">
      {vouchers.map((voucher, index) => (
        <li
          className="border-primary border rounded-lg shadow-lg p-4 flex flex-col justify-between gap-8 h-[400px]"
          key={index}
        >
          <div className="space-y-2">
            <h1 className="text-lg font-semibold">Voucher {index + 1}</h1>
            <p className="text-primary/95 text-sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptate inventore dolorem mollitia modi reiciendis vero numquam
              quasi, voluptatibus unde sunt porro? Impedit incidunt consequatur
              provident quasi. Ad ea, mollitia harum soluta, autem sunt
              architecto dolore aliquam assumenda voluptates esse repellat.
            </p>
          </div>
          <button className="text-white bg-primary p-4 rounded-2xl hover:bg-primary/90 mt-auto">
            Redeem
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Vouchers;

import Qris from "@/components/qris";
import Details from "@/components/details";

const payment = () => {
  return (
    <div className="p-5">
      <div className="shadow-xl rounded-2xl bg-white p-5">
        <Qris />
        <Details />
      </div>
    </div>
  );
};

export default payment;

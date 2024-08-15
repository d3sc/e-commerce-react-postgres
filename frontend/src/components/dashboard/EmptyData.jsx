import { BsCartPlus } from "react-icons/bs";

export default function EmptyData({ message, icon }) {
  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <div className="grid place-items-center">
        <h2 className="text-4xl text-gray-700">Oh no.. </h2>
        <p className="text-xl text-gray-600">{message}</p>
        <button className="mt-5 inline-block rounded bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700">
          {icon({ size: 25 })}
        </button>
      </div>
    </div>
  );
}

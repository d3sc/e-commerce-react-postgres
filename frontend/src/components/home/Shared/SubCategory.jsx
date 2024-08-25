export default function SubCategory({ icon, text1, text2 }) {
  return (
    <div className="flex gap-5">
      {/* <FaCarSide size={50} className="text-primary" /> */}
      {icon({ size: 50, className: "text-primary" })}

      <div className="">
        <h3 className="text-xl font-bold dark:text-white">{text1}</h3>
        <p className="text-sm text-gray-500">{text2}</p>
      </div>
    </div>
  );
}

import React from "react";

export default function NotFound({
  code = 404,
  message = "Page is Not Found",
}) {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <h1 className="text-center font-bold text-5xl text-gray-950">{code}</h1>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        {message}
      </h2>
    </div>
  );
}

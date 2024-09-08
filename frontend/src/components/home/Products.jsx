import Image1 from "/product/p-1.jpg";
import ProductCard from "./Shared/ProductCard.jsx";
import { useEffect, useState } from "react";
import { ApiProducts } from "../../helpers/api.js";

export default function Products() {
  const [dataProduct, setDataProduct] = useState();
  useEffect(() => {
    ApiProducts.get().then(({ data }) => setDataProduct(data));
  }, []);

  return (
    <div className="container py-16">
      <div className="text-center grid gap-2 mb-8">
        <h1 className="text-4xl dark:text-white font-bold">Our product</h1>
        <p className="text-xs text-gray-400">Explore Our Products</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 overflow-hidden py-6">
        {dataProduct?.map((item, index) => (
          <ProductCard
            key={index}
            productId={item.id}
            image={item.image}
            text={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

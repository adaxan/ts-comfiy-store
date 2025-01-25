import React, { useEffect, useState, FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface ProductAttributes {
  image: string;
  title: string;
  price: number;
  description: string;
  colors: string[];
}

interface Product {
  id: number;
  attributes: ProductAttributes;
}

const Details: FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [color, setColor] = useState<string>("");
  const [count, setCount] = useState<number>(1);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }
    axios
      .get(`https://strapi-store-server.onrender.com/api/products/${id}`)
      .then((response) => {
        if (response.status === 200) {
          const fetchedProduct = response.data.data;
          setProduct(fetchedProduct);
          setColor(fetchedProduct.attributes.colors[0]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id, navigate]);

  const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div className="max-w-7xl mx-auto p-8 mt-6">
      <button onClick={handleBack} className="bg-blue-500 p-3 rounded-md text-white w-20 cursor-pointer mb-5">
        Back
      </button>
      {product && (
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <img
              src={product.attributes.image}
              alt={product.attributes.title}
              className="w-full h-full rounded-lg object-cover shadow-lg"
            />
          </div>
          <div className="flex-1 space-y-6">
            <h1 className="text-3xl font-bold text-black">{product.attributes.title}</h1>
            <h2 className="text-2xl text-gray-600">${product.attributes.price}</h2>
            <p className="text-black">{product.attributes.description}</p>
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Colors</h4>
              <div className="flex gap-2">
                {product.attributes.colors.map((colorProduct) => (
                  <span
                    key={colorProduct}
                    style={{ backgroundColor: colorProduct }}
                    className={`w-8 h-8 rounded-full border cursor-pointer ${
                      color === colorProduct ? "border-black" : "border-gray-300"
                    }`}
                    onClick={() => setColor(colorProduct)}
                  ></span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Amount</h4>
              <select
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-40 py-3 px-2 border border-gray-300 bg-white text-black rounded-lg"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <button className="bg-blue-500 p-3 rounded-md text-white w-40 cursor-pointer">ADD TO BAG</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
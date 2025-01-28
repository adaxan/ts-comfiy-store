import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const Home = () => {
  interface Product {
    id: number;
    attributes: {
      image: string;
      price: string;
      title: string;
    };
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [company, setCompany] = useState("all");
  const [price, setPrice] = useState(100000);
  const [order, setOrder] = useState("z-a");
  const [freeShipping, setFreeShipping] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  const fetchProducts = () => {
    const freeShippingParam = freeShipping ? "&shipping=on" : "";
    axios
      .get(
        `https://strapi-store-server.onrender.com/api/products?search=${search}&category=${category}&company=${company}&order=${order}&price=${price}${freeShippingParam}`
      )
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="container mx-auto px-4">
      <div className="p-6 bg-blue-100 rounded-xl shadow-md mt-8">
        <div className="flex flex-wrap gap-4 justify-between mb-6">
          <input
            type="text"
            placeholder="Search Product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full sm:max-w-xs focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full sm:max-w-xs focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="Tables">Tables</option>
            <option value="Chairs">Chairs</option>
            <option value="Sofas">Sofas</option>
            <option value="Beds">Beds</option>
          </select>
          <select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full sm:max-w-xs focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="Modenza">Modenza</option>
            <option value="Luxora">Luxora</option>
            <option value="Artifex">Artifex</option>
            <option value="Comfora">Comfora</option>
            <option value="Homestead">Homestead</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
          <div>
            <label className="block font-medium mb-1">Price: ${price}</label>
            <input
              type="range"
              min="0"
              max="100000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full sm:max-w-xs"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={freeShipping}
              onChange={(e) => setFreeShipping(e.target.checked)}
              className="w-5 h-5 cursor-pointer"
            />
            <label className="font-medium">Free Shipping</label>
          </div>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full sm:max-w-xs focus:ring-2 focus:ring-blue-500"
          >
            <option value="a-z">a-z</option>
            <option value="z-a">z-a</option>
            <option value="high">High Price</option>
            <option value="low">Low Price</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button
            onClick={fetchProducts}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
          <button
            onClick={() => {
              setSearch("");
              setCategory("all");
              setCompany("all");
              setPrice(100000);
              setOrder("z-a");
              setFreeShipping(false);
              fetchProducts();
            }}
            className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {currentItems.length > 0 &&
          currentItems.map((product) => {
            return (
              <Link
                key={product.id}
                to={`/details/${product.id}`}
                state={{
                  image: product.attributes.image,
                  title: product.attributes.title,
                  price: product.attributes.price,
                }}
                className="group"
              >
                <div className="p-4 flex flex-col rounded-xl shadow-lg hover:shadow-xl bg-white transition-shadow">
                  <img
                    className="w-full h-64 object-cover rounded-xl mb-4"
                    src={product.attributes.image}
                    alt={product.attributes.title}
                  />
                  <h3 className="text-lg font-semibold group-hover:text-blue-500">
                    {product.attributes.title}
                  </h3>
                  <span className="text-gray-600 mt-2 font-medium">
                    ${product.attributes.price}
                  </span>
                </div>
              </Link>
            );
          })}
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< Previous"
        renderOnZeroPageCount={null}
        className="flex justify-center mt-8 gap-2"
        activeClassName="bg-blue-500 text-white"
        pageClassName="px-4 py-2 rounded-md cursor-pointer border border-gray-300 hover:bg-gray-100"
        previousClassName="px-4 py-2 rounded-md cursor-pointer border border-gray-300 hover:bg-gray-100"
        nextClassName="px-4 py-2 rounded-md cursor-pointer border border-gray-300 hover:bg-gray-100"
        disabledClassName="cursor-not-allowed opacity-50"
        pageLinkClassName="text-gray-700 font-medium"
        containerClassName="flex justify-center gap-2"
      />
    </div>
  );
};

export default Home;
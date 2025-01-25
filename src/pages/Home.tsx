import axios from "axios";
import { useEffect, useState, ChangeEvent, FC } from "react";
import { useNavigate } from "react-router-dom";
interface Product {
  id: number;
  attributes: {
    image: string;
    title: string;
    price: number;
  };
}

interface Filters {
  search: string;
  category: string;
}

const Home: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "all",
  });
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [filters, page]);

  const fetchProducts = () => {
    const params = {
      page,
      search: filters.search,
      category: filters.category,
    };

    axios
      .get("https://strapi-store-server.onrender.com/api/products", { params })
      .then((response) => {
        setProducts(response.data.data || []);
        setTotalPages(response.data.meta?.pagination?.pageCount || 1);
      });
  };

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  const handleDetails = (id: number) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <input
            type="text"
            name="search"
            placeholder="Search..."
            value={filters.search}
            onChange={handleFilterChange}
            className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="w-full md:w-1/4 p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleDetails(product.id)}
              className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
            >
              <img
                src={product.attributes.image}
                alt={product.attributes.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {product.attributes.title}
                </h2>
                <p className="mt-2 text-blue-600 font-bold text-lg">
                  ${product.attributes.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page == 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition"
          >
            Previous
          </button>
          <span className="text-gray-700 font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page == totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-white to-indigo-100 p-10 flex flex-col items-center gap-8">
      <h1 className="text-5xl font-extrabold text-indigo-700 drop-shadow-md">
        Dashboard
      </h1>

      <Link to="/add-product" className="w-full max-w-xs">
        <button className="w-full bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600
          text-white font-semibold py-4 rounded-full shadow-xl transition transform hover:scale-105">
          Yeni Ürün Ekle
        </button>
      </Link>

      <Link to="/products" className="w-full max-w-xs">
        <button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800
          text-white font-semibold py-4 rounded-full shadow-xl transition transform hover:scale-105">
          Ürünleri Gör
        </button>
      </Link>
    </div>
  );
}





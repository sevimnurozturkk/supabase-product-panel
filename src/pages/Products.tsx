import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      alert('Ürünler yüklenemedi: ' + error.message);
    } else {
      setProducts(data as Product[]);
    }
    setLoading(false);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-50">
        <p className="text-xl text-indigo-600">Yükleniyor...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-indigo-50 p-10">
      <h2 className="text-4xl font-extrabold mb-8 text-indigo-700 text-center drop-shadow-md">
        Tüm Ürünler
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-indigo-600 text-lg">Henüz ürün eklenmemiş.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-indigo-700 mb-3">
                  {product.name}
                </h3>
                <p className="text-indigo-600 mb-4">{product.description}</p>
                <p className="text-xl font-extrabold text-teal-600">
                  {product.price.toFixed(2)} ₺
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


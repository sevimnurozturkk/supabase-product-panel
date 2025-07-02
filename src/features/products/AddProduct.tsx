import { useForm } from 'react-hook-form';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type FormData = {
  name: string;
  description: string;
  price: number;
  image: FileList;
};

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      const file = data.image[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, file);

      if (uploadError) {
        toast.error('Görsel yükleme hatası: ' + uploadError.message);
        setLoading(false);
        return;
      }

      const { data: publicData } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      const imageUrl = publicData.publicUrl;

      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id;

      const { error: insertError } = await supabase.from('products').insert([
        {
          name: data.name,
          description: data.description,
          price: data.price,
          image_url: imageUrl,
          user_id: userId,
        },
      ]);

      if (insertError) {
        toast.error('Ürün eklenemedi: ' + insertError.message);
      } else {
        toast.success('Ürün başarıyla eklendi!');
        reset();
        navigate('/dashboard');
      }
    } catch {
      toast.error('Beklenmeyen hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 p-10 flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-xl rounded-2xl p-10 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <h2 className="col-span-full text-4xl font-extrabold text-indigo-700 mb-8 text-center drop-shadow-md">
            Yeni Ürün Ekle
          </h2>

          <div className="flex flex-col space-y-6">
            <label className="font-semibold text-gray-700" htmlFor="name">
              Ürün Adı
            </label>
            <input
              id="name"
              {...register('name', { required: 'Ürün adı zorunlu' })}
              placeholder="Ürün Adı"
              className="border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-4 focus:ring-indigo-400"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}

            <label className="font-semibold text-gray-700" htmlFor="price">
              Fiyat (₺)
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              {...register('price', {
                required: 'Fiyat zorunlu',
                min: { value: 0.01, message: 'Fiyat sıfırdan büyük olmalı' },
              })}
              placeholder="Fiyat"
              className="border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-4 focus:ring-indigo-400"
            />
            {errors.price && (
              <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>
            )}
          </div>

          <div className="flex flex-col space-y-6">
            <label className="font-semibold text-gray-700" htmlFor="description">
              Açıklama
            </label>
            <textarea
              id="description"
              {...register('description', { required: 'Açıklama zorunlu' })}
              placeholder="Açıklama"
              rows={6}
              className="border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-4 focus:ring-indigo-400 resize-none"
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
            )}

            <label
              htmlFor="image"
              className="font-semibold text-gray-700 cursor-pointer inline-block mt-3 px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-full shadow-md hover:shadow-lg transition"
            >
              Görsel Seç
            </label>
            <input
              id="image"
              type="file"
              {...register('image', { required: 'Görsel seçimi zorunlu' })}
              accept="image/*"
              className="hidden"
            />
            {errors.image && (
              <p className="text-red-600 text-sm mt-1">{errors.image.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="col-span-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white py-5 rounded-full font-bold shadow-xl transition transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? 'Yükleniyor...' : 'Ürün Ekle'}
          </button>
        </form>
      </div>

      <ToastContainer position="top-center" autoClose={3500} />
    </>
  );
}






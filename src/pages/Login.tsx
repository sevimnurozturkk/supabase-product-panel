import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert('Hata: ' + error.message);
    } else {
      navigate('/dashboard'); // ✅ başarılıysa yönlendir
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-3 p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Giriş Yap</h2>
      <input type="email" placeholder="Email" className="border p-2" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Şifre" className="border p-2" onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-600 text-white p-2 rounded" type="submit">Giriş</button>
    </form>
  );
}


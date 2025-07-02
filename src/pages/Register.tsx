// src/pages/Register.tsx
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
  
    if (error) {
      alert('Kayıt hatası: ' + error.message);
    } else {
      alert('Kayıt başarılı! Şimdi giriş yapın.');
      navigate('/login'); // ✅ kayıt sonrası girişe yönlendir
    }
  };
  

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-3 p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Kayıt Ol</h2>
      <input type="email" placeholder="Email" className="border p-2" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Şifre" className="border p-2" onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-green-600 text-white p-2 rounded" type="submit">Kayıt Ol</button>
    </form>
  );
}

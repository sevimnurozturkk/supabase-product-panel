# Supabase + React Ürün Ekleme Paneli

Bu proje, kullanıcıların e-posta ve şifre ile giriş yaparak Supabase veritabanına ürün ekleyebileceği bir React uygulamasıdır.  
Ürünler, isim, açıklama, fiyat ve görsel içerir. Görseller Supabase Storage’a yüklenir.

## Kullanılan Teknolojiler

- React  
- TypeScript  
- React Router DOM  
- React Hook Form  
- Supabase (Auth, Database, Storage)  
- Tailwind CSS  
- React Toastify (Bildirimler için)

## Proje Özellikleri

- Kullanıcı kayıt ve giriş yapabilir.  
- Giriş yapmadan korumalı sayfalara erişim engellenir.  
- Ürün ekleme formu: isim, açıklama, fiyat ve görsel yükleme.  
- Yüklenen görseller Supabase Storage’a kaydedilir.  
- Ürünler Supabase veritabanına kaydedilir.  
- Başarılı işlemlerde toast bildirimleri gösterilir.

## Kullanım ve Notlar

- `/register` ve `/login` sayfalarından kullanıcı girişi yapılabilir.  
- Giriş yaptıktan sonra dashboard ve ürün ekleme sayfalarına erişilebilir.  
- Supabase projenizde `products` tablosunda şu alanlar olmalıdır:  
  - id (UUID)  
  - name (text)  
  - description (text)  
  - price (numeric)  
  - image_url (text)  
  - user_id (UUID)  
- Supabase Storage’da `product-images` adlı bucket olmalıdır ve herkese okuma izni verilmelidir.  



"use client";

import { useState } from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    title: "دورة تطوير الويب الكاملة",
    description: "تعلم تطوير الويب من الصفر حتى الاحتراف باستخدام React و Node.js",
    price: 299,
    category: "دورات تعليمية",
    image: "📚"
  },
  {
    id: 2,
    title: "قالب موقع تجارة إلكترونية",
    description: "قالب احترافي جاهز للاستخدام مع لوحة تحكم كاملة",
    price: 149,
    category: "قوالب",
    image: "🛒"
  },
  {
    id: 3,
    title: "حزمة أيقونات احترافية",
    description: "أكثر من 500 أيقونة بتصميم حديث وأنيق",
    price: 49,
    category: "تصميم",
    image: "🎨"
  },
  {
    id: 4,
    title: "كتاب إلكتروني: التسويق الرقمي",
    description: "دليل شامل للتسويق الرقمي وإدارة الحملات الإعلانية",
    price: 79,
    category: "كتب",
    image: "📖"
  },
  {
    id: 5,
    title: "إضافةووردبريس متعددة الأغراض",
    description: "إضافة قوية لتحسين أداء موقعك وزيادة سرعته",
    price: 99,
    category: "إضافات",
    image: "🔌"
  },
  {
    id: 6,
    title: "مجموعة خطوط عربية",
    description: "25 خط عربي احترافي للاستخدام التجاري",
    price: 129,
    category: "تصميم",
    image: "✍️"
  }
];

export default function Home() {
  const [cart, setCart] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("الكل");

  const categories = ["الكل", ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = selectedCategory === "الكل"
    ? products
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (id: number) => {
    setCart([...cart, id]);
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, id) => {
      const product = products.find(p => p.id === id);
      return total + (product?.price || 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                🛍️ متجر المنتجات الرقمية
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                منصة شاملة لبيع وشراء المنتجات الرقمية
              </p>
            </div>
            <div className="relative">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all transform hover:scale-105 flex items-center gap-2">
                <span>🛒</span>
                <span>السلة ({cart.length})</span>
              </button>
              {cart.length > 0 && (
                <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 min-w-[300px] z-10">
                  <h3 className="font-bold mb-3 text-lg">المنتجات في السلة:</h3>
                  {cart.map((id, index) => {
                    const product = products.find(p => p.id === id);
                    return (
                      <div key={index} className="flex justify-between items-center mb-2 pb-2 border-b dark:border-gray-700">
                        <span className="text-sm">{product?.title}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-indigo-600 font-semibold">{product?.price} ر.س</span>
                          <button
                            onClick={() => removeFromCart(id)}
                            className="text-red-500 hover:text-red-700 text-xl"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  <div className="mt-3 pt-3 border-t dark:border-gray-700">
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span>المجموع:</span>
                      <span className="text-indigo-600">{getTotalPrice()} ر.س</span>
                    </div>
                    <button className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-all">
                      إتمام الشراء
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Categories Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-3 flex-wrap justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === category
                  ? "bg-indigo-600 text-white shadow-lg transform scale-105"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2"
            >
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 flex items-center justify-center">
                <span className="text-8xl">{product.image}</span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {product.title}
                  </h3>
                  <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-semibold">
                    {product.category}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {product.price} ر.س
                  </span>
                  <button
                    onClick={() => addToCart(product.id)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-md"
                  >
                    أضف للسلة
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-3 text-indigo-600 dark:text-indigo-400">عن المتجر</h4>
              <p className="text-gray-600 dark:text-gray-400">
                منصة رائدة لبيع وشراء المنتجات الرقمية بجودة عالية وأسعار منافسة
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-3 text-indigo-600 dark:text-indigo-400">روابط سريعة</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">الرئيسية</a></li>
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">المنتجات</a></li>
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">من نحن</a></li>
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">اتصل بنا</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-3 text-indigo-600 dark:text-indigo-400">تواصل معنا</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>📧 info@digitalstore.com</li>
                <li>📱 +966 50 123 4567</li>
                <li>📍 الرياض، المملكة العربية السعودية</li>
              </ul>
            </div>
          </div>
          <div className="border-t dark:border-gray-700 mt-8 pt-8 text-center text-gray-600 dark:text-gray-400">
            <p>© 2024 متجر المنتجات الرقمية. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

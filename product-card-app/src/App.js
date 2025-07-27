import React, { useState } from 'react';
import ProductCard from './ProductCard';

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', image: '', discount: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};

    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0)
      errs.price = 'Price must be a positive number.';
    if (!form.image || !form.image.startsWith('http'))
      errs.image = 'Image URL must start with "http".';
    if (form.discount !== '' && (isNaN(form.discount) || form.discount < 0 || form.discount > 100))
      errs.discount = 'Discount must be between 0 and 100.';

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setProducts([
      ...products,
      {
        name: form.name,
        price: Number(form.price),
        image: form.image,
        discount: form.discount !== '' ? Number(form.discount) : undefined,
      },
    ]);

    setForm({ name: '', price: '', image: '', discount: '' });
    setErrors({});
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="grid gap-4 mb-8">
        {['name', 'price', 'image', 'discount'].map((field) => (
          <div key={field}>
            <label className="block font-medium capitalize mb-1">
              {field}
              {field !== 'discount' && <span className="text-red-500">*</span>}
            </label>
            <input
              type={field === 'price' || field === 'discount' ? 'number' : 'text'}
              name={field}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
            {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
          </div>
        ))}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md w-fit">
          Add Product
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Product List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((p, idx) => (
          <ProductCard key={idx} {...p} />
        ))}
      </div>
    </div>
  );
}

export default App;

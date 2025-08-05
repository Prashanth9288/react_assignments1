import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setSortedProducts(data.products);
        const uniqueCategories = ['all', ...new Set(data.products.map(p => p.category))];
        setCategories(uniqueCategories);
      });
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (sortOrder === 'low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setSortedProducts(filtered);
  }, [sortOrder, selectedCategory, products]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Product Store</h2>

      {/* Filter & Sort Controls */}
      <div style={{ marginBottom: '1rem' }}>
        <label>Filter by Category: </label>
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat.toUpperCase()}</option>
          ))}
        </select>

        <label style={{ marginLeft: '2rem' }}>Sort by Price: </label>
        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">Default</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {sortedProducts.map(product => (
          <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
              <img src={product.thumbnail} alt={product.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
              <h3>{product.title}</h3>
              <p>₹{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;

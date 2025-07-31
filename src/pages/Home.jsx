import React, { useEffect, useState } from 'react';
import axios from 'axios';  //npm install axios
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch categories once
  useEffect(() => {
    axios.get('https://fakestoreapi.com/products/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.log("Error loading categories"));
  }, []);
  // Fetch products by category
  useEffect(() => {
    setLoading(true);
    const url = selectedCategory === "all"
      ? 'https://fakestoreapi.com/products'
      : `https://fakestoreapi.com/products/category/${selectedCategory}`;
    axios.get(url)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, [selectedCategory]);

  // Handle search
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Handle sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "lowToHigh") return a.price - b.price;
    if (sortOption === "highToLow") return b.price - a.price;
    return 0;
  });
  if (loading) return <h3>Loading products...</h3>;
  if (error) return <h3>{error}</h3>;
  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>
      {/* Controls */}
      <div style={styles.controls}>
        {/* Category Filter */}
        <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Sort Dropdown */}
        <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
          <option value="default">Sort by</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      {/* Product List */}
      <div style={styles.container}>
        {sortedProducts.length === 0 ? (
          <h4>No products found.</h4>
        ) : (
          sortedProducts.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
            />
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px"
  },
  controls: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    alignItems: "center"
  }
};

export default Home;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
const ProductDetails = () => {
  const { theme } = useContext(ThemeContext);
  const { id } = useParams(); // Get dynamic route param
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const { addToCart } = useContext(CartContext);
  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Product not found.");
        setLoading(false);
      });
  }, [id]);
  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>{error}</h3>;
  return (
<div style={{
  ...styles.container,
  backgroundColor: theme === "dark" ? "#181818" : "#fefefe",
  color: theme === "dark" ? "#fff" : "#000"
}}>
      <img src={product.image} alt={product.title} style={styles.image} />
      <div style={styles.details}>
        <h2>{product.title}</h2>
        <p><strong>₹ {product.price}</strong></p>
        <p>{product.description}</p>
        <p>Category: {product.category}</p>
        <p>Rating: {product.rating?.rate} ⭐ ({product.rating?.count} reviews)</p>
     <button onClick={() => navigate(-1)} style={{
  ...styles.backBtn,
  backgroundColor: theme === "dark" ? "#444" : "#007bff"
}}>
  ← Go Back
</button>

<button onClick={() => {
  addToCart(product);
  alert("Product added to cart!");
  
}} style={{
  ...styles.addBtn,
  backgroundColor: theme === "dark" ? "#28a745" : "green"
}}>
  Add to Cart
</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    gap: "20px",
    padding: "40px",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "#fefefe"
  },
  image: {
    width: "250px",
    height: "300px",
    objectFit: "contain",
    border: "1px solid #ddd",
    padding: "10px",
    backgroundColor: "#fff"
  },
  details: {
    maxWidth: "600px"
  },
  backBtn: {
    marginTop: "20px",
    padding: "8px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  addBtn: {
  marginTop: "15px",
  padding: "10px 20px",
  backgroundColor: "green",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
}
};
export default ProductDetails;

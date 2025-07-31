// src/components/ProductCard.jsx
import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const ProductCard = ({ id, title, image, price }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div style={{ ...styles.card, backgroundColor: theme === "dark" ? "#222" : "#fff", color: theme === "dark" ? "#fff" : "#000" }}>
      <img src={image} alt={title} style={styles.img} />
      <h3>{title.length > 40 ? title.slice(0, 40) + "..." : title}
      </h3>
      <p>₹ {price}</p>
      <Link to={`/product/${id}`}>
        <button style={{
          ...styles.btn,
          backgroundColor: theme === "dark" ? "#444" : "#007bff",
          color: theme === "dark" ? "#fff" : "#fff"
        }}>
          View Details
        </button>
      </Link>
    </div>
  );
};

const styles = {
  card: {
    width: "220px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    margin: "10px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  img: {
    width: "100px",
    height: "100px",
    objectFit: "contain",
    marginBottom: "10px"
  },
  btn: {
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default ProductCard;

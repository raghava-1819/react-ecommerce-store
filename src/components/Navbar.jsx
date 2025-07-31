import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
const { theme, toggleTheme } = useContext(ThemeContext);
  // Count total quantity
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
   <nav style={{ ...styles.nav, background: theme === "dark" ? "#333" : "#f2f2f2" }}>
  <Link to="/" style={{ ...styles.link, color: theme === "dark" ? "#fff" : "#333" }}>Home</Link>
  <Link to="/cart" style={{ ...styles.link, color: theme === "dark" ? "#fff" : "#333" }}>
    🛒 Cart ({totalCount})
  </Link>
  <button onClick={toggleTheme} style={styles.toggleBtn}>
    {theme === "light" ? "🌙 Dark" : "☀️ Light"}
  </button>
</nav>
  );
};

const styles = {
  nav: {
    padding: '1rem',
    background: '#f2f2f2',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '18px'
  },
  link: {
    marginRight: '1rem',
    textDecoration: 'none',
    color: '#333'
  },
  toggleBtn: {
  padding: "5px 10px",
  marginLeft: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  cursor: "pointer"
}
};
export default Navbar;

import React from "react";
import GLogout from "../../authentication/GLogout";

const Home = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Welcome to Our Website!</h1>
        <p>Your one-stop solution for all things amazing.</p>
      </header>

      <section style={styles.section}>
        <h2>About Us</h2>
        <p>
          We specialize in creating incredible experiences for our users. Our team is dedicated to providing 
          the best services to meet your needs.
        </p>
      </section>

      <section style={styles.section}>
        <h2>Features</h2>
        <ul style={styles.list}>
          <li>Interactive UI</li>
          <li>Seamless Navigation</li>
          <li>Modern Design</li>
          <li>Responsive Across Devices</li>
        </ul>
      </section>
        <GLogout/>
      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Our Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Inline styles for demonstration purposes
const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    margin: "0 auto",
    maxWidth: "800px",
    padding: "20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  section: {
    marginBottom: "30px",
  },
  list: {
    listStyleType: "disc",
    paddingLeft: "20px",
  },
  footer: {
    textAlign: "center",
    marginTop: "40px",
    borderTop: "1px solid #ccc",
    paddingTop: "10px",
    color: "#666",
  },
};

export default Home;

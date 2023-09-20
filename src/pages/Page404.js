import React from 'react';

function Page404() {
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Page Not Found</h2>
      <p style={styles.text}>The page you are looking for does not exist.</p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    margin: 'auto',
    padding: '20px',
    maxWidth: '400px',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '10px',
  },
  text: {
    fontSize: '16px',
    color: '#666',
  },
};

export default Page404;

let base_url;

if (process.env.NODE_ENV === 'production') {
  // Production URL
  base_url = 'https://al-arabian-oud-e-commerce.onrender.com/api/';
} else {
  // Development URL
  base_url = 'http://localhost:5000/api/';
}

export { base_url };

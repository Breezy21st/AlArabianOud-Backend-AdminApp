let base_url;

if (process.env.NODE_ENV === 'production') {
  // Use the production URL when running in production
  base_url = 'https://al-arabian-oud.onrender.com/api/';
} else {
  // Use the local URL when running in development
  base_url = 'http://localhost:5000/api/';
}
export {base_url};

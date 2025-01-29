export const musicImages = [
  '/images/abyan-athif-K0U0eSAjFGU-unsplash.jpg',
  '/images/aleksandr-popov-5tsvxCrFi_I-unsplash.jpg',
  '/images/aleksandr-popov-UUJzCuHUfYI-unsplash.jpg',
  '/images/amith-nair-jQAk1lZL5Jk-unsplash.jpg',
  '/images/anders-jilden-AkUR27wtaxs-unsplash.jpg',
  // Add more image paths as needed
];

export const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * musicImages.length);
  return musicImages[randomIndex];
}; 
// lib/images.js
import cloudinary from './cloudinary';

export async function getPortfolioImages() {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'Home/pawan.dev', // Your folder path in Cloudinary
      resource_type: 'image',
      max_results: 100,
      // Optional: Add sorting
      sort_by: { created_at: 'desc' }
    });
    
    return result.resources.map(image => ({
      id: image.public_id,
      url: image.secure_url,
      width: image.width,
      height: image.height,
      format: image.format,
      bytes: image.bytes,
      createdAt: image.created_at,
      // Extract filename from public_id
      name: image.public_id.split('/').pop(),
      // You can add transformations for different sizes
      thumbnail: cloudinary.url(image.public_id, {
        width: 300,
        height: 200,
        crop: 'fill',
        quality: 'auto'
      }),
      large: cloudinary.url(image.public_id, {
        width: 1200,
        crop: 'scale',
        quality: 'auto'
      })
    }));
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error);
    return [];
  }
}
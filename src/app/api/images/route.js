import cloudinary from '../../../../lib/cloudinary';

export async function GET() {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'Portfolio/images',
      resource_type: 'image',
      max_results: 100
    });
    
    const images = result.resources?.map(image => ({
      id: image.public_id,
      url: image.secure_url,
      width: image.width,
      height: image.height,
      name: image.public_id.split('/').pop(),
      format: image.format,
      aspectRatio: image.width / image.height,
      // Generate different sizes for responsive layout
      thumbnail: cloudinary.url(image.public_id, {
        width: 400,
        crop: 'scale',
        quality: 'auto'
      })
    })) || [];

    return Response.json(images);
  } catch (error) {
    console.error('Cloudinary API Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
import cloudinary from '../../../../lib/cloudinary';

export async function GET() {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      
      resource_type: 'image',
      max_results: 50
    });

    const images = result.resources.map(image => ({
      id: image.public_id,
      url: image.secure_url,
      width: image.width,
      height: image.height,
      name: image.public_id.split('/').pop()
    }));

    return Response.json(images);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

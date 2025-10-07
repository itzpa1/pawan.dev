import cloudinary from '../../../../lib/cloudinary';

export async function GET() {
  try {
    // Get ALL images without folder filter
    const result = await cloudinary.api.resources({
      type: 'upload',
      resource_type: 'image',
      max_results: 100
    });

    // Group by folder
    const folders = {};
    result.resources.forEach(image => {
      const pathParts = image.public_id.split('/');
      const folder = pathParts.length > 1 ? pathParts.slice(0, -1).join('/') : 'root';
      
      if (!folders[folder]) {
        folders[folder] = [];
      }
      
      folders[folder].push({
        public_id: image.public_id,
        filename: pathParts.pop(),
        url: image.secure_url
      });
    });

    return Response.json({
      total_images: result.resources.length,
      folders: folders,
      all_public_ids: result.resources.map(img => img.public_id)
    });
  } catch (error) {
    return Response.json({
      error: error.message,
      details: 'Check your Cloudinary credentials'
    }, { status: 500 });
  }
}
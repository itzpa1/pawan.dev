import cloudinary from "../../../../lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder");
    const resourceType = formData.get("resourceType") || "auto";
    const fileName = formData.get("fileName");

    if (!file || !folder) {
      return NextResponse.json(
        { error: "File and folder are required" },
        { status: 400 },
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: resourceType, // Use custom resource type
          public_id: fileName || undefined,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );

      uploadStream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      file: {
        id: result.public_id,
        url: result.secure_url,
        type: result.resource_type,
        format: result.format,
        bytes: result.bytes,
        folder: result.folder,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

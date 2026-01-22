import cloudinary from "../../../../lib/cloudinary";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get("folder") || "Portfolio";
  const limit = parseInt(searchParams.get("limit") || "100");

  try {
    // Use Search API for better filtering and sorting
    const result = await cloudinary.search
      .expression(`folder:${folder}/*`)
      .sort_by("created_at", "desc")
      .max_results(limit)
      .execute();

    const resources =
      result.resources?.map((resource) => {
        const public_id = resource.public_id;
        const format = resource.format?.toLowerCase();

        let category = "recent"; // Default category for sorting

        if (public_id.includes("/logo")) {
          category = "logo";
        } else if (public_id.includes("/thumbnail")) {
          // Handles both /thumbnail and /thumbnails
          category = "thumbnail";
        } else if (public_id.includes("/posters")) {
          category = "poster";
        } else if (public_id.includes("/pdfs") || format === "pdf") {
          category = "pdf";
        }

        return {
          id: public_id,
          url: resource.secure_url,
          width: resource.width,
          height: resource.height,
          name: public_id.split("/").pop(),
          format: format,
          category: category,
          created_at: resource.created_at,
          thumbnail:
            resource.resource_type === "image"
              ? resource.secure_url.replace(
                  "/upload/",
                  "/upload/w_400,c_scale,q_auto/",
                )
              : format === "pdf"
                ? resource.secure_url.replace(/\.pdf$/i, ".jpg")
                : null,
        };
      }) || [];

    return NextResponse.json(resources);
  } catch (error) {
    console.error("Cloudinary Search Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

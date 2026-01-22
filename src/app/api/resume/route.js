import cloudinary from "../../../../lib/cloudinary";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Search for resume in Portfolio/resume folder
    const result = await cloudinary.search
      .expression("folder:Portfolio/resume/*")
      .sort_by("created_at", "desc")
      .max_results(1)
      .execute();

    if (!result.resources || result.resources.length === 0) {
      return NextResponse.json({ error: "No resume found" }, { status: 404 });
    }

    const resume = result.resources[0];

    return NextResponse.json({
      url: resume.secure_url,
      publicId: resume.public_id,
      format: resume.format,
      createdAt: resume.created_at,
    });
  } catch (error) {
    console.error("Error fetching resume:", error);
    return NextResponse.json(
      { error: "Failed to fetch resume" },
      { status: 500 },
    );
  }
}

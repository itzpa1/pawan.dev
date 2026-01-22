import { NextResponse } from "next/server";

export async function GET() {
  const username = "itzpa1";

  try {
    // Fetch repositories
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      },
    );

    if (!reposResponse.ok) {
      throw new Error(`GitHub API returned ${reposResponse.status}`);
    }

    const repos = await reposResponse.json();

    // We'll process a subset of repos to avoid hitting limits too hard in one go
    // though Promise.all helps with concurrency.
    const projects = await Promise.all(
      repos.map(async (repo) => {
        try {
          // Fetch README.md
          const readmeResponse = await fetch(
            `https://api.github.com/repos/${username}/${repo.name}/readme`,
            {
              next: { revalidate: 3600 },
              headers: {
                Accept: "application/vnd.github.v3+json",
              },
            },
          );

          if (!readmeResponse.ok) return null;

          const readmeData = await readmeResponse.json();
          const content = Buffer.from(readmeData.content, "base64").toString(
            "utf-8",
          );

          // Extract image
          const imgRegex = /!\[.*?\]\((.*?)\)|<img.*?src=["'](.*?)["']/i;
          const imgMatch = content.match(imgRegex);
          let image = imgMatch ? imgMatch[1] || imgMatch[2] : null;

          // Only fetch projects that have images in README
          if (!image) return null;

          // Handle relative paths for images by converting to raw github URLs
          if (image && !image.startsWith("http")) {
            const branch = repo.default_branch || "main";
            const cleanPath = image.replace(/^(\.\/|\/)/, "");
            image = `https://raw.githubusercontent.com/${username}/${repo.name}/${branch}/${cleanPath}`;
          }

          // Fetch Tech Stack (Languages)
          const languagesResponse = await fetch(repo.languages_url, {
            next: { revalidate: 3600 },
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          });
          const languagesData = languagesResponse.ok
            ? await languagesResponse.json()
            : {};
          const techStack = Object.keys(languagesData).slice(0, 3);

          // Extract live demo link
          const demoRegex =
            /\[(?:Live Demo|Demo|View Live|Visit App|Link)\]\((https?:\/\/.*?)\)|(?:Live Demo|Demo|Live Link|Visit):\s*(https?:\/\/[^\s\n\)]+)/i;
          const demoMatch = content.match(demoRegex);
          let demoLink = demoMatch
            ? demoMatch[1] || demoMatch[2]
            : repo.homepage;

          if (demoLink) {
            demoLink = demoLink.split(")")[0].split("]")[0].trim();
          }

          return {
            id: repo.id,
            name: repo.name,
            title: repo.name
              .replace(/-/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase()),
            description: repo.description,
            githubLink: repo.html_url,
            demoLink: demoLink || null,
            image: image,
            techStack: techStack,
            updatedAt: repo.updated_at,
          };
        } catch (e) {
          console.error(`Error processing repo ${repo.name}:`, e);
          return null;
        }
      }),
    );

    // Return latest first
    const filteredProjects = projects
      .filter((p) => p !== null)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    return NextResponse.json(filteredProjects);
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

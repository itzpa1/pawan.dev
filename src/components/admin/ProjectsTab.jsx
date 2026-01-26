"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";

import {
  FaGithub,
  FaPlus,
  FaExternalLinkAlt,
  FaEye,
  FaEyeSlash,
  FaTrashAlt,
  FaEdit,
  FaImage,
  FaUpload,
  FaSync,
} from "react-icons/fa";
import { FaX } from "react-icons/fa6";

function ProjectCard({ project, onEdit, onDelete, onToggle }) {
  return (
    <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden flex flex-col group hover:border-white/20 transition-all">
      <div className="relative h-48 w-full bg-zinc-800/50 overflow-hidden">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-white/20">
            <FaImage className="w-12 h-12 mb-2" />
            <span className="text-xs">No Thumbnail</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-4 w-full">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-xl text-white truncate">
                {project.title}
              </h3>
              {project.featured && (
                <span className="px-2 py-1 text-[10px] bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/20 backdrop-blur-md">
                  Featured
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 flex-1 space-y-4">
        <p className="text-white/60 text-sm line-clamp-2 h-10">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.techStack?.map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-[10px] bg-white/5 rounded-md text-white/60 border border-white/5"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white/5 p-4 border-t border-white/10 flex items-center justify-between gap-2">
        <div className="flex gap-2">
          <button
            onClick={() => onToggle({ id: project._id })}
            className={`p-2 rounded-lg transition-colors ${project.visible ? "text-green-400 hover:bg-green-400/10" : "text-white/30 hover:bg-white/10"}`}
            title={project.visible ? "Visible" : "Hidden"}
          >
            {project.visible ? (
              <FaEye className="w-5 h-5" />
            ) : (
              <FaEyeSlash className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={() => onEdit(project)}
            className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
            title="Edit"
          >
            <FaEdit className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this project?")) {
                onDelete({ id: project._id });
              }
            }}
            className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
            title="Delete"
          >
            <FaTrashAlt className="w-5 h-5" />
          </button>
        </div>
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-white/40 hover:text-white flex items-center gap-1"
          >
            Demo <FaExternalLinkAlt className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}

function ProjectListItem({ project, onEdit, onDelete, onToggle }) {
  return (
    <div className="bg-white/5 p-3 rounded-xl border border-white/10 hover:border-white/20 transition-all flex items-center gap-4 group">
      <div className="w-16 h-12 bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/10">
            <FaImage className="w-6 h-6" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-white truncate">{project.title}</h3>
          {project.featured && (
            <span className="px-1.5 py-0.5 text-[8px] bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/20">
              Featured
            </span>
          )}
        </div>
        <p className="text-white/40 text-[11px] truncate">
          {project.description}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onToggle({ id: project._id })}
          className={`p-2 rounded-lg transition-colors ${project.visible ? "text-green-400 hover:bg-green-400/10" : "text-white/30 hover:bg-white/10"}`}
        >
          {project.visible ? (
            <FaEye className="w-4 h-4" />
          ) : (
            <FaEyeSlash className="w-4 h-4" />
          )}
        </button>
        <button
          onClick={() => onEdit(project)}
          className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
        >
          <FaEdit className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            if (confirm("Are you sure you want to delete this project?")) {
              onDelete({ id: project._id });
            }
          }}
          className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
        >
          <FaTrashAlt className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function ProjectsTab() {
  const projects = useQuery(api.projects.get) || [];
  const addProject = useMutation(api.projects.add);
  const updateProject = useMutation(api.projects.update);
  const deleteProject = useMutation(api.projects.remove);
  const toggleVisibility = useMutation(api.projects.toggleVisibility);

  // GitHub Sync State
  const [githubUsername, setGithubUsername] = useState("");
  const [githubRepos, setGithubRepos] = useState([]);
  const [isLoadingGithub, setIsLoadingGithub] = useState(false);

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    repoUrl: "",
    demoUrl: "",
    techStack: "",
    thumbnail: "",
    visible: true,
    featured: false,
  });

  const fetchGithubRepos = async () => {
    if (!githubUsername) return;
    setIsLoadingGithub(true);
    try {
      const res = await fetch(
        `https://api.github.com/users/${githubUsername}/repos?sort=updated`,
      );
      const data = await res.json();
      if (Array.isArray(data)) {
        setGithubRepos(data);
      } else {
        alert("User not found or API limit reached");
      }
    } catch (error) {
      console.error("Error fetching repos:", error);
    } finally {
      setIsLoadingGithub(false);
    }
  };

  const getGithubSocialPreview = (repoUrl) => {
    if (!repoUrl) return "";
    try {
      const url = new URL(repoUrl);
      if (url.hostname === "github.com") {
        const parts = url.pathname.split("/").filter(Boolean);
        if (parts.length >= 2) {
          return `https://opengraph.githubassets.com/1/${parts[0]}/${parts[1]}`;
        }
      }
    } catch (e) {
      return "";
    }
    return "";
  };

  const handleImport = (repo) => {
    const socialPreview = getGithubSocialPreview(repo.html_url);
    setFormData({
      title: repo.name.replace(/-/g, " ").replace(/_/g, " "),
      description: repo.description || "",
      repoUrl: repo.html_url,
      demoUrl: repo.homepage || "",
      techStack: repo.language ? repo.language : "",
      thumbnail: socialPreview,
      visible: true,
      featured: false,
    });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      description: project.description || "",
      repoUrl: project.repoUrl || "",
      demoUrl: project.demoUrl || "",
      techStack: project.techStack ? project.techStack.join(", ") : "",
      thumbnail: project.thumbnail || "",
      visible: project.visible,
      featured: project.featured,
    });
    setEditingId(project._id);
    setIsModalOpen(true);
  };

  const handleManualAdd = () => {
    setFormData({
      title: "",
      description: "",
      repoUrl: "",
      demoUrl: "",
      techStack: "",
      thumbnail: "",
      visible: true,
      featured: false,
    });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("folder", "Projects");
    uploadFormData.append("fileName", `project_${Date.now()}`);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const data = await response.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, thumbnail: data.file.url }));
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFetchGithubThumbnail = () => {
    const preview = getGithubSocialPreview(formData.repoUrl);
    if (preview) {
      setFormData((prev) => ({ ...prev, thumbnail: preview }));
    } else {
      alert("Invalid GitHub URL");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const techStackArray = formData.techStack
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");

    const payload = {
      ...formData,
      techStack: techStackArray,
    };

    try {
      if (editingId) {
        await updateProject({ id: editingId, ...payload });
      } else {
        await addProject(payload);
      }
      setIsModalOpen(false);
      setGithubRepos([]);
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  return (
    <div className="space-y-8">
      {/* GitHub Sync Section */}
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaGithub className="w-6 h-6" /> Sync from GitHub
        </h2>
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="GitHub Username"
            value={githubUsername}
            onChange={(e) => setGithubUsername(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-white/5 border border-white/20 focus:border-blue-500 focus:outline-none transition-colors"
          />
          <button
            onClick={fetchGithubRepos}
            disabled={isLoadingGithub}
            className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {isLoadingGithub ? "Fetching..." : "Fetch Repos"}
          </button>
        </div>

        {githubRepos.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
            {githubRepos.map((repo) => (
              <div
                key={repo.id}
                className="bg-white/5 p-4 rounded-lg border border-white/10 hover:border-white/30 transition-colors flex flex-col justify-between group"
              >
                <div>
                  <h3 className="font-bold text-lg truncate" title={repo.name}>
                    {repo.name}
                  </h3>
                  <p className="text-sm text-white/50 line-clamp-2 mt-1 mb-3 h-10">
                    {repo.description || "No description provided."}
                  </p>
                </div>
                <button
                  onClick={() => handleImport(repo)}
                  className="w-full mt-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white py-2 rounded-md transition-all text-sm font-medium"
                >
                  Import Project
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Projects List Section */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">Portfolio Projects</h2>
            <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-md transition-all ${viewMode === "grid" ? "bg-blue-600 text-white shadow-lg" : "text-white/40 hover:text-white"}`}
                title="Grid View"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-md transition-all ${viewMode === "list" ? "bg-blue-600 text-white shadow-lg" : "text-white/40 hover:text-white"}`}
                title="List View"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
          <button
            onClick={handleManualAdd}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <FaPlus className="w-5 h-5" /> Add Manual
          </button>
        </div>

        {viewMode === "grid" ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onEdit={handleEdit}
                onDelete={deleteProject}
                onToggle={toggleVisibility}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project) => (
              <ProjectListItem
                key={project._id}
                project={project}
                onEdit={handleEdit}
                onDelete={deleteProject}
                onToggle={toggleVisibility}
              />
            ))}
          </div>
        )}

        {projects.length === 0 && (
          <div className="col-span-full py-12 text-center text-white/40 border-2 border-dashed border-white/10 rounded-xl">
            <p>No projects yet. Sync from GitHub or add manually.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0f0f0f] w-full max-w-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-xl font-bold">
                {editingId ? "Edit Project" : "Add Project"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white/50 hover:text-white transition-colors"
              >
                <FaX className="w-6 h-6" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-6 max-h-[85vh] overflow-y-auto custom-scrollbar"
            >
              {/* Thumbnail Section */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-white/70">
                  Project Thumbnail
                </label>
                <div className="flex gap-4 items-start">
                  <div className="relative w-40 h-24 bg-white/5 rounded-lg border border-white/10 overflow-hidden flex-shrink-0">
                    {formData.thumbnail ? (
                      <img
                        src={formData.thumbnail}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/10">
                        <FaImage className="w-8 h-8" />
                      </div>
                    )}
                    {isUploading && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex gap-2">
                      <label className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all px-4 py-2 rounded-lg cursor-pointer text-sm font-medium">
                        <FaUpload className="w-4 h-4 text-blue-400" />
                        <span>Upload Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      {formData.repoUrl?.includes("github.com") && (
                        <button
                          type="button"
                          onClick={handleFetchGithubThumbnail}
                          className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all px-4 py-2 rounded-lg text-sm font-medium"
                          title="Fetch from GitHub Social Preview"
                        >
                          <FaSync className="w-4 h-4 text-green-400" />
                          <span>Fetch GH</span>
                        </button>
                      )}
                    </div>
                    <input
                      type="url"
                      placeholder="Or paste image URL"
                      value={formData.thumbnail}
                      onChange={(e) =>
                        setFormData({ ...formData, thumbnail: e.target.value })
                      }
                      className="w-full p-2 text-xs rounded-md bg-black/20 border border-white/10 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1 text-white/70">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full p-3 rounded-lg bg-black/20 border border-white/10 focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1 text-white/70">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full p-3 rounded-lg bg-black/20 border border-white/10 focus:border-blue-500 focus:outline-none h-24"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-white/70">
                    Repository URL
                  </label>
                  <input
                    type="url"
                    value={formData.repoUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, repoUrl: e.target.value })
                    }
                    className="w-full p-3 rounded-lg bg-black/20 border border-white/10 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-white/70">
                    Demo URL
                  </label>
                  <input
                    type="url"
                    value={formData.demoUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, demoUrl: e.target.value })
                    }
                    className="w-full p-3 rounded-lg bg-black/20 border border-white/10 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1 text-white/70">
                    Tech Stack (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.techStack}
                    onChange={(e) =>
                      setFormData({ ...formData, techStack: e.target.value })
                    }
                    placeholder="React, Tailwind, Node.js"
                    className="w-full p-3 rounded-lg bg-black/20 border border-white/10 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${formData.visible ? "bg-blue-600 border-blue-600" : "border-white/20 bg-white/5 group-hover:border-white/40"}`}
                  >
                    {formData.visible && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.visible}
                    onChange={(e) =>
                      setFormData({ ...formData, visible: e.target.checked })
                    }
                    className="hidden"
                  />
                  <span className="text-sm">Visible</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer group">
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${formData.featured ? "bg-yellow-500 border-yellow-500" : "border-white/20 bg-white/5 group-hover:border-white/40"}`}
                  >
                    {formData.featured && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="hidden"
                  />
                  <span className="text-sm">Featured</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all font-medium border border-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
                >
                  {editingId ? "Update Project" : "Add Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}

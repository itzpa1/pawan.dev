"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import {
  FaThLarge,
  FaList,
  FaRegFilePdf,
  FaImage,
  FaTrashAlt,
  FaExternalLinkAlt,
  FaEye,
  FaEyeSlash,
  FaFileAlt,
} from "react-icons/fa";

export default function MediaTab() {
  const media = useQuery(api.media.get) || [];
  const deleteMedia = useMutation(api.media.remove);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"

  const formatFileSize = (bytes) => {
    if (!bytes) return "N/A";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-12">
      {/* Upload Section */}
      <section>
        <FileUpload />
      </section>

      {/* Library Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white">Media Library</h2>
            <p className="text-white/40 text-sm">
              Manage your uploaded assets across the platform
            </p>
          </div>

          <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-all ${viewMode === "grid" ? "bg-blue-600 text-white shadow-lg" : "text-white/40 hover:text-white"}`}
              title="Grid View"
            >
              <FaThLarge className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-all ${viewMode === "list" ? "bg-blue-600 text-white shadow-lg" : "text-white/40 hover:text-white"}`}
              title="List View"
            >
              <FaList className="w-4 h-4" />
            </button>
          </div>
        </div>

        {media.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {media.map((item) => (
                <div
                  key={item._id}
                  className="group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden aspect-square hover:border-white/30 transition-all shadow-lg"
                >
                  {item.type === "image" ? (
                    <img
                      src={item.secureUrl}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-zinc-900/50">
                      <FaRegFilePdf className="w-10 h-10 text-red-500 mb-2" />
                      <span className="text-[10px] text-white/40 uppercase font-black truncate w-full text-center">
                        {item.format || "PDF"}
                      </span>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => deleteMedia({ id: item._id })}
                        className="p-1.5 bg-red-500/20 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-all"
                        title="Delete"
                      >
                        <FaTrashAlt className="w-3 h-3" />
                      </button>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-white truncate mb-1">
                        {item.name}
                      </p>
                      <a
                        href={item.secureUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-[9px] text-blue-400 hover:text-blue-300 transition-colors uppercase font-bold"
                      >
                        Raw URL <FaExternalLinkAlt className="w-2 h-2" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-xl">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-6 py-4 font-bold text-white/40 uppercase tracking-widest text-[10px]">
                      Preview
                    </th>
                    <th className="px-6 py-4 font-bold text-white/40 uppercase tracking-widest text-[10px]">
                      Name
                    </th>
                    <th className="px-6 py-4 font-bold text-white/40 uppercase tracking-widest text-[10px]">
                      Type
                    </th>
                    <th className="px-6 py-4 font-bold text-white/40 uppercase tracking-widest text-[10px]">
                      Pool
                    </th>
                    <th className="px-6 py-4 font-bold text-white/40 uppercase tracking-widest text-[10px] text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {media.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-white/5 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="w-12 h-10 rounded-md overflow-hidden bg-zinc-800 border border-white/10 flex items-center justify-center">
                          {item.type === "image" ? (
                            <img
                              src={item.secureUrl}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FaRegFilePdf className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-white max-w-[200px] truncate">
                          {item.name}
                        </div>
                        <div className="text-[10px] text-white/30 truncate max-w-[200px]">
                          {item.publicId}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${item.type === "image" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"}`}
                        >
                          {item.format || item.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white/40 text-[11px] font-mono">
                          {item.category || "Root"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <a
                            href={item.secureUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all"
                            title="Open Link"
                          >
                            <FaExternalLinkAlt className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => deleteMedia({ id: item._id })}
                            className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                            title="Delete"
                          >
                            <FaTrashAlt className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          <div className="py-20 text-center bg-white/5 rounded-2xl border-2 border-dashed border-white/10 shadow-inner">
            <FaFileAlt className="w-16 h-16 text-white/5 mx-auto mb-4" />
            <p className="text-white/20 font-medium">
              Your library is empty. Start by uploading some assets.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

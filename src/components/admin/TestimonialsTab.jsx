"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import {
  FaUserCircle,
  FaQuoteLeft,
  FaTrashAlt,
  FaEye,
  FaEyeSlash,
  FaPlus,
  FaVenusMars,
  FaTags,
} from "react-icons/fa";

export default function TestimonialsTab() {
  const testimonials = useQuery(api.testimonials.get) || [];
  const addTestimonial = useMutation(api.testimonials.add);
  const deleteTestimonial = useMutation(api.testimonials.remove);
  const toggleVisibility = useMutation(api.testimonials.toggleVisibility);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    message: "",
    avatarUrl: "",
    gender: "male",
    category: "tech",
  });

  const [selectedCategory, setSelectedCategory] = useState("tech");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTestimonial({
      ...formData,
      visible: true,
    });
    setFormData({
      name: "",
      role: "",
      message: "",
      avatarUrl: "",
      gender: "male",
      category: "tech",
    });
  };

  const displayedTestimonials = testimonials.filter(
    (t) => (t.category || "tech") === selectedCategory,
  );

  const getAutoAvatar = (name, gender) => {
    const seed = name.toLowerCase().split(" ")[0] || "user";
    return `https://tapback.co/api/avatar/${seed}-${gender}.webp`;
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center border-b border-white/10 pb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white">Testimonial Engine</h2>
          <p className="text-white/40 text-sm">
            Manage social proof across your portfolio
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 sticky top-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <FaPlus className="text-blue-400 w-4 h-4" /> Add Testimonial
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Client Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium text-sm"
                  required
                />
                <input
                  type="text"
                  placeholder="Role (e.g. CEO @ TechCorp)"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium text-sm"
                  required
                />
                <textarea
                  placeholder="Testimonial Message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium text-sm h-32 resize-none"
                  required
                ></textarea>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-white/40 ml-1 flex items-center gap-1">
                      <FaVenusMars className="w-2.5 h-2.5" /> Gender
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none transition-all cursor-pointer"
                    >
                      <option value="male" className="bg-zinc-900">
                        Male
                      </option>
                      <option value="female" className="bg-zinc-900">
                        Female
                      </option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-white/40 ml-1 flex items-center gap-1">
                      <FaTags className="w-2.5 h-2.5" /> Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none transition-all cursor-pointer"
                    >
                      <option value="tech" className="bg-zinc-900">
                        Technology
                      </option>
                      <option value="marketing" className="bg-zinc-900">
                        Marketing
                      </option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="text-[10px] uppercase font-bold text-white/40 ml-1 mb-2 block">
                    Avatar URL (Optional)
                  </label>
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 rounded-full border border-white/10 bg-black/40 overflow-hidden flex-shrink-0">
                      <img
                        src={
                          formData.avatarUrl ||
                          getAutoAvatar(formData.name, formData.gender)
                        }
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <input
                      type="url"
                      placeholder="Paste image link..."
                      value={formData.avatarUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, avatarUrl: e.target.value })
                      }
                      className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-xs"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white py-4 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/20 active:scale-95"
              >
                Launch Testimonial
              </button>
            </form>
          </div>
        </div>

        {/* Display Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 w-fit">
            <button
              onClick={() => setSelectedCategory("tech")}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${selectedCategory === "tech" ? "bg-white/10 text-white shadow-lg" : "text-white/40 hover:text-white"}`}
            >
              Technology
            </button>
            <button
              onClick={() => setSelectedCategory("marketing")}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${selectedCategory === "marketing" ? "bg-white/10 text-white shadow-lg" : "text-white/40 hover:text-white"}`}
            >
              Marketing
            </button>
          </div>

          <div className="grid gap-4">
            {displayedTestimonials.length > 0 ? (
              displayedTestimonials.map((t) => (
                <div
                  key={t._id}
                  className="group relative bg-[#1a1a1a] p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all shadow-xl flex flex-col gap-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full border-2 border-white/5 overflow-hidden ring-4 ring-black/20">
                        <img
                          src={t.avatarUrl || getAutoAvatar(t.name, t.gender)}
                          alt={t.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-white leading-tight">
                          {t.name}
                        </h4>
                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-0.5">
                          {t.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleVisibility({ id: t._id })}
                        className={`p-2 rounded-lg transition-all ${t.visible ? "text-green-400 bg-green-400/10" : "text-white/20 bg-white/5"}`}
                        title={t.visible ? "Public" : "Hidden"}
                      >
                        {t.visible ? (
                          <FaEye className="w-3.5 h-3.5" />
                        ) : (
                          <FaEyeSlash className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        onClick={() => deleteTestimonial({ id: t._id })}
                        className="p-2 text-red-400 bg-red-400/10 rounded-lg hover:bg-red-400 hover:text-white transition-all"
                        title="Delete"
                      >
                        <FaTrashAlt className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    <FaQuoteLeft className="absolute -top-1 -left-1 text-white/5 w-8 h-8 -z-0" />
                    <p className="text-sm text-white/70 italic relative z-10 pl-2 border-l border-white/10">
                      "{t.message}"
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-auto pt-2">
                    <span className="text-[9px] px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md font-bold uppercase">
                      Stored in Convex
                    </span>
                    {t.gender && (
                      <span className="text-[9px] px-2 py-0.5 bg-white/5 text-white/40 border border-white/10 rounded-md font-bold uppercase">
                        {t.gender}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center bg-white/5 rounded-2xl border border-dashed border-white/10">
                <FaQuoteLeft className="w-12 h-12 text-white/5 mx-auto mb-4" />
                <p className="text-white/20 font-medium italic">
                  No social proof found for this category.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

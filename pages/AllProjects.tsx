import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/LandingPage';
import { cms, ProjectItem } from '../lib/cms';
import { SEO } from '../lib/seo';
import { ArrowUpRight, ArrowRight, Search, FileCode } from 'lucide-react';

const AllProjects = () => {
    const [projects, setProjects] = useState<ProjectItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const loadData = async () => {
            const data = await cms.getAllProjects();
            setProjects(data);
            setLoading(false);
        }
        loadData();
    }, []);

    // Extract unique categories
    const categories = useMemo(() => {
        const cats = new Set(projects.map(p => p.category).filter(Boolean));
        return ['All', ...Array.from(cats)];
    }, [projects]);

    // Filter projects based on search and category
    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch =
                project.name.toLowerCase().includes(searchLower) ||
                project.description.toLowerCase().includes(searchLower) ||
                project.category?.toLowerCase().includes(searchLower);

            return matchesCategory && matchesSearch;
        });
    }, [projects, searchQuery, selectedCategory]);

    // Helper to extract plain text (first sentence) or truncate description
    const truncate = (str: string, length: number) => {
        if (!str) return '';
        if (str.length <= length) return str;
        return str.slice(0, length) + '...';
    };

    return (
        <div className="min-h-screen bg-[#030014] text-white font-sans selection:bg-blue-500/30 font-['Stack_Sans_Notch']">
            <Navbar />

            <SEO
                title="Our Projects"
                description="Explore our portfolio of custom web applications, SaaS landing pages, and corporate websites built for speed and conversion."
                url="https://www.getwebfast.online/projects"
            />

            {/* Header */}
            <div className="pt-32 pb-12 px-6 text-center max-w-7xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold mb-6"
                >
                    All <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Projects</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-slate-400 text-xl max-w-2xl mx-auto mb-12"
                >
                    A comprehensive collection of our work, featuring custom web applications, responsive websites, and digital solutions.
                </motion.p>

                {/* Search and Filter Controls */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-4xl mx-auto flex flex-col items-center gap-8"
                >
                    {/* Search Bar */}
                    <div className="relative w-full max-w-md group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-20 group-hover:opacity-40 transition duration-300 blur-sm"></div>
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search projects by name, description, or category..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#0A0A12] border border-white/10 rounded-full py-4 pl-12 pr-6 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all font-medium"
                            />
                        </div>
                    </div>

                    {/* Category Pills */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${selectedCategory === cat
                                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/25 scale-105'
                                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white hover:border-white/20'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Projects Grid */}
            <main className="max-w-7xl mx-auto px-6 pb-32">
                {loading ? (
                    <div className="text-center text-slate-500 py-20 flex flex-col items-center gap-4">
                        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p>Loading Projects...</p>
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-slate-500 py-20"
                    >
                        <FileCode size={48} className="mx-auto mb-4 text-slate-700" />
                        <h3 className="text-xl font-medium text-white mb-2">No projects found</h3>
                        <p className="max-w-md mx-auto">
                            We couldn't find any projects matching "{searchQuery}" in the {selectedCategory} category.
                        </p>
                        <button
                            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                            className="mt-6 text-blue-400 hover:text-blue-300 font-medium"
                        >
                            Clear filters
                        </button>
                    </motion.div>
                ) : (
                    <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {filteredProjects.map((project) => (
                                <motion.div
                                    layout
                                    key={project.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A12] flex flex-col h-full hover:border-blue-500/30 transition-all duration-500"
                                >
                                    <Link to={`/projects/${project.slug || '#'}`} className="flex flex-col h-full">
                                        <div className={`h-64 ${project.bg_class || 'bg-slate-800'} relative overflow-hidden shrink-0`}>
                                            <img
                                                src={project.image}
                                                alt={project.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                    <ArrowUpRight size={24} />
                                                </div>
                                            </div>

                                            {/* Category Tag on Image */}
                                            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{project.category}</span>
                                            </div>
                                        </div>

                                        <div className="p-8 flex flex-col flex-grow">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">{project.name}</h3>
                                                </div>
                                            </div>
                                            <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                                                {truncate(project.description, 120)}
                                            </p>
                                            <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:underline decoration-blue-500 underline-offset-4 mt-auto">
                                                View Case Study <ArrowRight size={16} className="text-blue-500 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </main>
        </div>
    );
};

export default AllProjects;

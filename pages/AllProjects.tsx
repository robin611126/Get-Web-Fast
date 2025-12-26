import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/LandingPage';
import { cms, ProjectItem } from '../lib/cms';
import { SEO } from '../lib/seo';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

const AllProjects = () => {
    const [projects, setProjects] = useState<ProjectItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const data = await cms.getAllProjects();
            setProjects(data);
            setLoading(false);
        }
        loadData();
    }, []);

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
            />

            {/* Header */}
            <div className="pt-32 pb-20 px-6 text-center max-w-7xl mx-auto">
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
                    className="text-slate-400 text-xl max-w-2xl mx-auto"
                >
                    A comprehensive collection of our work, featuring custom web applications, responsive websites, and digital solutions.
                </motion.p>
            </div>

            {/* Projects Grid */}
            <main className="max-w-7xl mx-auto px-6 pb-32">
                {loading ? (
                    <div className="text-center text-slate-500 py-20">Loading Projects...</div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A12] flex flex-col h-full"
                            >
                                <Link to={`/projects/${project.slug || '#'}`} className="flex flex-col h-full">
                                    <div className={`h-64 ${project.bg_class || 'bg-slate-800'} relative overflow-hidden shrink-0`}>
                                        <img
                                            src={project.image}
                                            alt={project.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full text-white">
                                                <ArrowUpRight size={24} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2 block">{project.category}</span>
                                                <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">{project.name}</h3>
                                            </div>
                                        </div>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                                            {truncate(project.description, 120)}
                                        </p>
                                        <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:underline decoration-blue-500 underline-offset-4 mt-auto">
                                            View Case Study <ArrowRight size={16} className="text-blue-500" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default AllProjects;

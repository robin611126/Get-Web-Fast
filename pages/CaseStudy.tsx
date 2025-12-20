import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { cms, ProjectItem } from '../lib/cms';
import { Navbar } from '../components/LandingPage';
import { ArrowLeft, ExternalLink, Code2, Layers, Cpu, CheckCircle, Calendar, User } from 'lucide-react';

const CaseStudy = () => {
    const { slug } = useParams();
    const [project, setProject] = useState<ProjectItem | null | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            cms.getProjectBySlug(slug).then(p => {
                setProject(p || null);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [slug]);

    if (loading) return <div className="min-h-screen bg-[#030014] text-white flex items-center justify-center">Loading Case Study...</div>;

    if (!project) return (
        <div className="min-h-screen bg-[#030014] text-white flex items-center justify-center flex-col">
            <h1 className="text-4xl font-bold mb-4 font-['Stack_Sans_Notch']">404</h1>
            <p className="text-slate-400 mb-8">Case study not found.</p>
            <Link to="/" className="text-blue-400 hover:underline">Back to Home</Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#030014] text-white font-sans selection:bg-blue-500/30 font-['Stack_Sans_Notch']">
            <Navbar />

            {/* Hero Section */}
            <div className={`relative min-h-[60vh] flex items-end pt-32 pb-20 px-6 ${project.bg_class || 'bg-[#0A0A12]'}`}>
                {/* Background Image / Overlay */}
                <div className="absolute inset-0 z-0">
                    {project.image && (
                        <>
                            <img src={project.image} className="w-full h-full object-cover opacity-20 blur-sm" alt="Background" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/80 to-transparent"></div>
                        </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#030014]"></div>
                </div>

                <div className="max-w-7xl mx-auto w-full relative z-10">
                    <Link to="/#projects" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors text-sm font-medium tracking-wide uppercase">
                        <ArrowLeft size={16} /> Back to Work
                    </Link>

                    <div className="flex flex-col lg:flex-row gap-12 items-end justify-between">
                        <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-700">
                            <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-blue-500/20">
                                {project.category}
                            </span>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[0.9] tracking-tight">
                                {project.name}
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl font-light">
                                {project.description}
                            </p>
                        </div>

                        {project.live_url && (
                            <a href={project.live_url} target="_blank" rel="noopener noreferrer"
                                className="hidden lg:flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-slate-200 transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                                Visit Live Site <ExternalLink size={20} />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <main className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid lg:grid-cols-12 gap-16">

                    {/* Left Sidebar: Sticky Project Info */}
                    <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-32 h-fit order-2 lg:order-1">

                        {project.live_url && (
                            <a href={project.live_url} target="_blank" rel="noopener noreferrer"
                                className="lg:hidden w-full flex items-center justify-center gap-2 bg-white text-black px-6 py-4 rounded-xl font-bold hover:bg-slate-200 transition-colors mb-8">
                                Visit Live Site <ExternalLink size={18} />
                            </a>
                        )}

                        <div className="bg-[#0F0E1F]/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 space-y-8">
                            <div>
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <User size={14} /> Client
                                </h3>
                                <div className="text-xl font-bold text-white">{project.client_name || 'Confidential'}</div>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Calendar size={14} /> Timeline
                                </h3>
                                <div className="text-lg text-white">4 Weeks (Est.)</div>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Code2 size={14} /> Technologies
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech_stack?.map(tech => (
                                        <span key={tech} className="bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg text-sm text-slate-300 transition-colors cursor-default">
                                            {tech}
                                        </span>
                                    ))}
                                    {(!project.tech_stack || project.tech_stack.length === 0) && <span className="text-slate-500 italic">Not specified</span>}
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-center relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
                            <h3 className="font-bold text-2xl mb-3 relative z-10">Start Your Project</h3>
                            <p className="text-blue-100 mb-8 relative z-10">Ready to build something similar? Let's discuss your vision.</p>
                            <Link to="/#contact" className="inline-flex w-full justify-center bg-white text-blue-900 font-bold py-4 rounded-xl hover:bg-blue-50 transition-all shadow-lg relative z-10">
                                Get a Quote
                            </Link>
                        </div>
                    </aside>

                    {/* Right Column: Narrative Content */}
                    <div className="lg:col-span-8 space-y-24 order-1 lg:order-2">
                        {/* Main Image */}
                        <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
                            <img src={project.image} alt={project.name} className="w-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#030014] to-transparent opacity-50"></div>
                        </div>

                        {/* Story Sections */}
                        <div className="space-y-16">
                            {project.challenge && (
                                <section className="relative pl-8 border-l-2 border-white/10 hover:border-blue-500/50 transition-colors">
                                    <h2 className="text-3xl font-black mb-6 flex items-center gap-4 text-white">
                                        The Challenge
                                    </h2>
                                    <p className="text-slate-300 leading-8 text-lg md:text-xl whitespace-pre-wrap font-light">{project.challenge}</p>
                                </section>
                            )}

                            {project.solution && (
                                <section className="relative pl-8 border-l-2 border-white/10 hover:border-blue-500/50 transition-colors">
                                    <h2 className="text-3xl font-black mb-6 flex items-center gap-4 text-white">
                                        Our Approach
                                    </h2>
                                    <p className="text-slate-300 leading-8 text-lg md:text-xl whitespace-pre-wrap font-light">{project.solution}</p>
                                </section>
                            )}

                            {project.results && (
                                <section className="relative pl-8 border-l-2 border-white/10 hover:border-green-500/50 transition-colors">
                                    <h2 className="text-3xl font-black mb-6 flex items-center gap-4 text-white">
                                        The Results
                                    </h2>
                                    <p className="text-slate-300 leading-8 text-lg md:text-xl whitespace-pre-wrap font-light">{project.results}</p>
                                </section>
                            )}
                        </div>

                        {/* Gallery Grid */}
                        {project.gallery_images && project.gallery_images.length > 0 && (
                            <section className="space-y-10 pt-10 border-t border-white/10">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-3xl font-black text-white">Project Gallery</h2>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {project.gallery_images.map((img, idx) => (
                                        <div key={idx} className={`rounded-2xl overflow-hidden border border-white/10 group ${idx % 3 === 0 ? 'md:col-span-2' : ''}`}>
                                            <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 hover:brightness-110" />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
};

export default CaseStudy;

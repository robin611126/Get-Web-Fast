import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { cms, ProjectItem } from '../lib/cms';
import { Navbar } from '../components/LandingPage';
import { ArrowLeft, ExternalLink, Code2, Layers, Cpu, CheckCircle } from 'lucide-react';

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
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-slate-400 mb-8">Case study not found.</p>
            <Link to="/" className="text-blue-400 hover:underline">Back to Home</Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#030014] text-white font-sans selection:bg-blue-500/30">
            <Navbar />

            {/* Hero */}
            <header className={`relative pt-32 pb-20 px-6 overflow-hidden ${project.bg_class || 'bg-[#0A0A12]'}`}>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0"></div>
                <div className="max-w-6xl mx-auto relative z-10">
                    <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors">
                        <ArrowLeft size={16} /> Back to Projects
                    </Link>

                    <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
                        <div className="max-w-3xl">
                            <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-blue-500/30">
                                {project.category}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">{project.name}</h1>
                            <p className="text-xl text-slate-200 leading-relaxed max-w-2xl">{project.description}</p>
                        </div>

                        {project.live_url && (
                            <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors">
                                Visit Live Site <ExternalLink size={18} />
                            </a>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-6 py-20">
                <div className="grid lg:grid-cols-3 gap-16">
                    {/* Left Column: Narrative */}
                    <div className="lg:col-span-2 space-y-16">
                        {/* Cover Image */}
                        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                            <img src={project.image} alt={project.name} className="w-full object-cover" />
                        </div>

                        {/* Challenge */}
                        {project.challenge && (
                            <section>
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
                                    <div className="p-2 bg-red-500/20 rounded-lg text-red-500"><Layers size={24} /></div>
                                    The Challenge
                                </h2>
                                <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-wrap">{project.challenge}</p>
                            </section>
                        )}

                        {/* Solution */}
                        {project.solution && (
                            <section>
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
                                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-500"><Cpu size={24} /></div>
                                    The Solution
                                </h2>
                                <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-wrap">{project.solution}</p>
                            </section>
                        )}

                        {/* Results */}
                        {project.results && (
                            <section>
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
                                    <div className="p-2 bg-green-500/20 rounded-lg text-green-500"><CheckCircle size={24} /></div>
                                    The Results
                                </h2>
                                <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-wrap">{project.results}</p>
                            </section>
                        )}

                        {/* Gallery */}
                        {project.gallery_images && project.gallery_images.length > 0 && (
                            <section className="space-y-6">
                                <h2 className="text-2xl font-bold text-white">Project Gallery</h2>
                                <div className="grid gap-6">
                                    {project.gallery_images.map((img, idx) => (
                                        <div key={idx} className="rounded-xl overflow-hidden border border-white/10">
                                            <img src={img} alt={`Gallery ${idx + 1}`} className="w-full" />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">
                        {/* Client Info */}
                        <div className="bg-[#0F0E1F] border border-white/10 rounded-2xl p-6">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Client</h3>
                            <div className="text-xl font-bold text-white">{project.client_name || 'Confidential'}</div>
                        </div>

                        {/* Tech Stack */}
                        <div className="bg-[#0F0E1F] border border-white/10 rounded-2xl p-6">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Code2 size={16} /> Tech Stack
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tech_stack?.map(tech => (
                                    <span key={tech} className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-sm text-slate-300">
                                        {tech}
                                    </span>
                                ))}
                                {(!project.tech_stack || project.tech_stack.length === 0) && <span className="text-slate-500 italic">Not specified</span>}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-center">
                            <h3 className="font-bold text-xl mb-2">Want a site like this?</h3>
                            <p className="text-blue-100 text-sm mb-6">Let's build something amazing together.</p>
                            <Link to="/" className="inline-block w-full bg-white text-blue-900 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors">
                                Book a Call
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CaseStudy;

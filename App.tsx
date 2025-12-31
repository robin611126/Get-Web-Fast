import { Routes, Route, useLocation } from 'react-router-dom';
import { LandingPage, Footer } from './components/LandingPage';
import PublicBlog from './pages/PublicBlog';
import SinglePost from './pages/SinglePost';
import CaseStudy from './pages/CaseStudy';
import AllProjects from './pages/AllProjects';
import Admin from './pages/admin/Admin';

const App = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/blog" element={<PublicBlog />} />
        <Route path="/blog/:slug" element={<SinglePost />} />
        <Route path="/projects/:slug" element={<CaseStudy />} />
        <Route path="/projects" element={<AllProjects />} />


        {/* Private Admin Route */}
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
      {!isAdmin && <Footer />}
    </>
  );
};

export default App;
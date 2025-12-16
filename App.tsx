import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import PublicBlog from './pages/PublicBlog';
import SinglePost from './pages/SinglePost';
import Admin from './pages/admin/Admin';

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/blog" element={<PublicBlog />} />
      <Route path="/blog/:slug" element={<SinglePost />} />
      
      {/* Private Admin Route */}
      <Route path="/admin/*" element={<Admin />} />
    </Routes>
  );
};

export default App;
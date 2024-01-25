import { Routes, Route } from "react-router-dom"
import HomePage from './pages/home';
import MissionPage from './pages/mission';
import GalleryPage from './pages/gallery';
import ContributePage from './pages/contribute';
import BlogPage from './pages/blog';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="/mission" element={ <MissionPage/> } />
        <Route path="/gallery" element={ <GalleryPage/> } />
        <Route path="/contribute" element={ <ContributePage/> } />
        <Route path="/blog" element={ <BlogPage/> } />
      </Routes>
    </div>
  )
}
export default App
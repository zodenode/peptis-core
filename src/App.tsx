import { Route, Routes } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { GuideArticlePage } from './pages/GuideArticlePage'
import { GuidesIndexPage } from './pages/GuidesIndexPage'
import { HomePage } from './pages/HomePage'

function App() {
  return (
    <div className="site">
      <ScrollToTop />
      <SiteHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/guides" element={<GuidesIndexPage />} />
        <Route path="/guides/:slug" element={<GuideArticlePage />} />
      </Routes>
      <SiteFooter />
    </div>
  )
}

export default App

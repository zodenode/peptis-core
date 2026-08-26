import { Route, Routes } from 'react-router-dom'
import { BlogArticlePage } from './pages/BlogArticlePage'
import { BlogIndexPage } from './pages/BlogIndexPage'
import { LandingPage } from './pages/LandingPage'
import { QuizPage } from './pages/QuizPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/blog" element={<BlogIndexPage />} />
      <Route path="/blog/:slug" element={<BlogArticlePage />} />
    </Routes>
  )
}

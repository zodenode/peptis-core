import { Route, Routes } from 'react-router-dom'
import { BlogArticlePage } from './pages/BlogArticlePage'
import { BlogIndexPage } from './pages/BlogIndexPage'
import { CancelPage } from './pages/CancelPage'
import { HealthDataNoticePage } from './pages/HealthDataNoticePage'
import { LandingPage } from './pages/LandingPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { QuizPage } from './pages/QuizPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/blog" element={<BlogIndexPage />} />
      <Route path="/blog/:slug" element={<BlogArticlePage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/health-data" element={<HealthDataNoticePage />} />
      <Route path="/cancel" element={<CancelPage />} />
    </Routes>
  )
}

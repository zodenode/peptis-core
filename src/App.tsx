import { Route, Routes } from 'react-router-dom'
import { BlogArticlePage } from './pages/BlogArticlePage'
import { BlogIndexPage } from './pages/BlogIndexPage'
import { CancelPage } from './pages/CancelPage'
import { HealthDataNoticePage } from './pages/HealthDataNoticePage'
import { GoLandingPage } from './pages/GoLandingPage'
import { LandingPage } from './pages/LandingPage'
import { OfferingsPage } from './pages/OfferingsPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { QuizPage } from './pages/QuizPage'
import { TrainingPlanPage } from './pages/TrainingPlanPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/go/:slug" element={<GoLandingPage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/plan" element={<TrainingPlanPage />} />
      <Route path="/offerings" element={<OfferingsPage />} />
      <Route path="/blog" element={<BlogIndexPage />} />
      <Route path="/blog/:slug" element={<BlogArticlePage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/privacy-policy" element={<PrivacyPage />} />
      <Route path="/health-data" element={<HealthDataNoticePage />} />
      <Route path="/cancel" element={<CancelPage />} />
    </Routes>
  )
}

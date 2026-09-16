import { Route, Routes } from 'react-router-dom'
import { BlogArticlePage } from './pages/BlogArticlePage'
import { BlogIndexPage } from './pages/BlogIndexPage'
import { CancelPage } from './pages/CancelPage'
import { HealthDataNoticePage } from './pages/HealthDataNoticePage'
import { LandingPage } from './pages/LandingPage'
import { OfferingsPage } from './pages/OfferingsPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { QuizPage } from './pages/QuizPage'
import { TermsPage } from './pages/TermsPage'
import { TrainingPlanPage } from './pages/TrainingPlanPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/plan" element={<TrainingPlanPage />} />
      <Route path="/offerings" element={<OfferingsPage />} />
      <Route path="/blog" element={<BlogIndexPage />} />
      <Route path="/blog/:slug" element={<BlogArticlePage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/privacy-policy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/terms-of-use" element={<TermsPage />} />
      <Route path="/health-data" element={<HealthDataNoticePage />} />
      <Route path="/cancel" element={<CancelPage />} />
    </Routes>
  )
}

import { Navigate, Route, Routes } from 'react-router-dom'
import { BlogArticleRedirect, BlogIndexRedirect } from './pages/BlogRedirects'
import { CancelPage } from './pages/CancelPage'
import { HealthDataNoticePage } from './pages/HealthDataNoticePage'
import { GoLandingPage } from './pages/GoLandingPage'
import { LandingPage } from './pages/LandingPage'
import { OfferingsPage } from './pages/OfferingsPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { PublicationArticlePage } from './pages/PublicationArticlePage'
import { PublicationCategoryPage } from './pages/PublicationCategoryPage'
import { PublicationHomePage } from './pages/PublicationHomePage'
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
      <Route path="/publication" element={<PublicationHomePage />} />
      <Route path="/publication/partners" element={<Navigate to="/publication" replace />} />
      <Route path="/publication/:category/:slug" element={<PublicationArticlePage />} />
      <Route path="/publication/:category" element={<PublicationCategoryPage />} />
      <Route path="/blog" element={<BlogIndexRedirect />} />
      <Route path="/blog/:slug" element={<BlogArticleRedirect />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/privacy-policy" element={<PrivacyPage />} />
      <Route path="/health-data" element={<HealthDataNoticePage />} />
      <Route path="/cancel" element={<CancelPage />} />
    </Routes>
  )
}

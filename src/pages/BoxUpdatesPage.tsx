import { useEffect } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { LeadCapture } from '../components/landing/LeadCapture'
export function BoxUpdatesPage() {
  useEffect(() => { document.title = 'Nutrition box updates | Peptis' }, [])
  return <div className="site"><Header variant="quiz" /><main className="notice-page"><section className="section"><div className="notice-inner">
    <p className="eyebrow">Lean Mass nutrition box</p><h1>Be first to hear when it’s ready</h1>
    <p>We’re preparing a box with complete protein, creatine, electrolytes and foundational micronutrients.</p>
    <p>The target price is $59/month. Contents, final price and launch date are still being confirmed. Joining this list creates no order, subscription or price guarantee.</p>
    <LeadCapture source="box_updates" purpose="box_updates" buttonLabel="Keep me posted" />
  </div></section></main><Footer /></div>
}

import { Link, Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import RouteScroll from './components/layout/RouteScroll.jsx'
import { legacySections } from './data/landing.js'

export default function App() {
  return <><RouteScroll /><Routes><Route path="/" element={<LandingPage />} />{Object.entries(legacySections).map(([path,id])=><Route key={path} path={path} element={<Navigate replace to={`/#${id}`} />} />)}<Route path="*" element={<main className="p-8 font-sans"><h1 className="text-2xl font-semibold">Page not found</h1><Link className="mt-4 inline-block underline" to="/#home">Return to VAILYF AI</Link></main>} /></Routes></>
}

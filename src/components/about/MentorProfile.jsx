import { Video } from 'lucide-react'
import Container from '../ui/Container.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import { mentor } from '../../data/mentor.js'

export default function MentorProfile({ showIntroduction = true }) {
  const videoApproved = mentor.introductionVideo.approved && mentor.introductionVideo.src
  return (
    <section className="about-section mentor-profile" aria-labelledby="mentor-profile-title">
      <Container className="mentor-profile-grid">
        <div data-about-reveal><SectionHeading eyebrow="THE PERSON BEHIND THE APPROACH" id="mentor-profile-title" title={showIntroduction ? <>Meet{' '}<br />{mentor.name}.</> : 'Professional profile'} description={showIntroduction ? mentor.introduction : 'Approved biography and credentials will appear here once supplied.'} /><p className="body-copy mentor-bio">{mentor.biography || 'Professional biography will be added after client approval.'}</p></div>
        <div className="mentor-profile-details" data-about-reveal>
          <GlassCard className="mentor-facts"><dl>{[['Qualifications', mentor.qualifications], ['Experience', mentor.experience], ['Areas of expertise', mentor.expertise]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value || 'Pending client confirmation'}</dd></div>)}</dl></GlassCard>
          {videoApproved ? <div className="mentor-video"><video controls preload="none" poster={mentor.introductionVideo.poster || undefined} aria-label={`Introduction to ${mentor.name}`}><source src={mentor.introductionVideo.src} />{mentor.introductionVideo.captions && <track kind="captions" src={mentor.introductionVideo.captions} srcLang="en" label="English" />}Your browser does not support this video.</video></div> : <GlassCard className="mentor-video-placeholder"><Video size={21} aria-hidden="true" /><div><h3>Meet your mentor on video</h3><p className="small-copy">Introduction video pending client approval.</p></div></GlassCard>}
        </div>
      </Container>
    </section>
  )
}


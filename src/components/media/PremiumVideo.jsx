import { useEffect, useRef } from 'react'

export default function PremiumVideo({ src, poster, label = 'Webinar introduction' }) {
  const player = useRef(null)
  useEffect(() => {
    const video = player.current
    return () => video?.pause()
  }, [])
  function handlePlay(event) {
    // The inline introduction and hero modal share one file and one active stream.
    document.querySelectorAll('video').forEach(video => {
      if (video !== event.currentTarget && !video.paused) video.pause()
    })
  }
  return <div className="premium-video"><video ref={player} aria-label={label} src={src} poster={poster} controls playsInline preload="metadata" onPlay={handlePlay}>Your browser does not support HTML5 video. <a href={src}>Download the introduction</a>.</video></div>
}

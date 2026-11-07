// Edit this record with client-approved content only. null fields deliberately
// render as pending rather than implying unverified professional credentials.
export const mentor = {
  name: 'Dr. Vaishnavi Jayawant',
  introduction: 'Dr. Vaishnavi Jayawant introduces a structured self-reflection approach that helps participants explore their current life balance, identify priorities and gain clarity about the direction they want to take.',
  biography: null,
  qualifications: null,
  experience: null,
  expertise: null,
  portrait: { src: null, alt: 'Dr. Vaishnavi Jayawant', approved: false },
  introductionVideo: { src: null, poster: null, captions: null, approved: false },
  pendingConfirmations: [
    'Approved professional biography and verification of qualifications, experience and expertise.',
    'Official portrait, image rights and approval to publish.',
    'Introduction video, captions/transcript and publication approval.',
    'Client-approved design reference image.',
  ],
}

export const approachSteps = [
  { title: 'Understand Where You Are', description: 'Reflect on your current life situation.' },
  { title: 'Discover Where You Want to Go', description: 'Identify priorities and meaningful goals.' },
  { title: 'Build Clarity for Your Next Steps', description: 'Explore a structured way to move forward.' },
]

export const mentorDimensions = [
  { id: 'health', description: 'Explore routines and everyday wellness priorities.' },
  { id: 'wealth', description: 'Reflect on financial goals, priorities and habits.' },
  { id: 'relationships', description: 'Consider communication, connection and quality time.' },
  { id: 'spiritual-bliss', description: 'Explore inner peace, gratitude and self-awareness.' },
]

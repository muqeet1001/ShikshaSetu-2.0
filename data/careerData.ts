export interface CareerPath {
  id: string;
  name: string;
  icon: string;
  iconFamily: 'MaterialCommunityIcons' | 'MaterialIcons';
  description: string;
  for10th: boolean;
  for12th: boolean;
  streams?: string[];
  duration?: string;
  pros: string[];
  cons: string[];
  pathways: CareerPathway[];
}

export interface CareerPathway {
  id: string;
  name: string;
  description: string;
  duration: string;
  eligibility: string[];
  exams?: string[];
  colleges: string[];
  averageSalary: string;
  pros: string[];
  cons: string[];
  steps: PathwayStep[];
}

export interface PathwayStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  requirements?: string[];
}

export const CAREER_INTERESTS: CareerPath[] = [
  {
    id: 'medical',
    name: '🩺 Medical',
    icon: 'medical-bag',
    iconFamily: 'MaterialCommunityIcons',
    description: 'Save lives & heal people',
    for10th: true,
    for12th: true,
    streams: ['PCB', 'PCMB'],
    duration: '5.5-11 years',
    pros: [
      'High social status',
      'Excellent income potential',
      'Job security',
      'Respect in society',
      'Opportunity to save lives'
    ],
    cons: [
      'Extremely high competition',
      'Long study duration',
      'High stress',
      'Expensive education'
    ],
    pathways: [
      {
        id: 'mbbs',
        name: 'MBBS/BDS',
        description: 'Bachelor of Medicine and Bachelor of Surgery',
        duration: '5.5 years',
        eligibility: ['12th PCB with 50%+', 'NEET qualification'],
        exams: ['NEET'],
        colleges: ['AIIMS', 'Government Medical Colleges', 'Private Medical Colleges'],
        averageSalary: '₹6-15 LPA',
        pros: [
          'High earning potential',
          'Prestigious career',
          'Job satisfaction',
          'Global opportunities'
        ],
        cons: [
          'Very competitive entrance',
          'Long study duration',
          'High study pressure'
        ],
        steps: [
          {
            id: 'class12',
            title: 'Complete 12th with PCB',
            description: 'Score 85%+ in Physics, Chemistry, Biology',
            duration: '2 years',
            requirements: ['Strong foundation in sciences']
          },
          {
            id: 'neet_prep',
            title: 'NEET Preparation',
            description: 'Prepare for National Eligibility cum Entrance Test',
            duration: '1-2 years',
            requirements: ['Join coaching or self-study', 'Practice tests']
          },
          {
            id: 'neet_exam',
            title: 'Clear NEET',
            description: 'Score minimum qualifying marks in NEET',
            duration: '1 day',
            requirements: ['Valid NEET score']
          },
          {
            id: 'counseling',
            title: 'Counseling & Admission',
            description: 'Participate in medical counseling for seat allocation',
            duration: '1-2 months'
          },
          {
            id: 'mbbs_study',
            title: 'MBBS Course',
            description: 'Complete 4.5 years study + 1 year internship',
            duration: '5.5 years'
          }
        ]
      },
      {
        id: 'nursing',
        name: 'B.Sc Nursing',
        description: 'Bachelor of Science in Nursing',
        duration: '4 years',
        eligibility: ['12th PCB with 45%+'],
        exams: ['Various Nursing Entrance Exams'],
        colleges: ['Government Nursing Colleges', 'Private Nursing Colleges'],
        averageSalary: '₹2.5-8 LPA',
        pros: [
          'Good job opportunities',
          'Less competitive than MBBS',
          'Noble profession'
        ],
        cons: [
          'Night shifts',
          'Physical demands'
        ],
        steps: [
          {
            id: 'class12_nursing',
            title: 'Complete 12th with PCB',
            description: 'Score 45%+ in Physics, Chemistry, Biology',
            duration: '2 years'
          },
          {
            id: 'nursing_entrance',
            title: 'Nursing Entrance Exam',
            description: 'Clear state/national nursing entrance exams',
            duration: '1 day'
          },
          {
            id: 'bsc_nursing',
            title: 'B.Sc Nursing Course',
            description: 'Complete 4-year nursing degree with practical training',
            duration: '4 years'
          }
        ]
      }
    ]
  },
  {
    id: 'engineering',
    name: '⚙️ Engineering',
    icon: 'cog',
    iconFamily: 'MaterialCommunityIcons',
    description: 'Build the future with tech',
    for10th: true,
    for12th: true,
    streams: ['PCM', 'PCMB'],
    duration: '4-6 years',
    pros: [
      'High salary potential',
      'Innovation opportunities',
      'Global job market',
      'Problem-solving career'
    ],
    cons: [
      'High competition',
      'Continuous learning required',
      'Math-heavy subjects'
    ],
    pathways: [
      {
        id: 'btech',
        name: 'B.Tech/B.E.',
        description: 'Bachelor of Technology/Engineering',
        duration: '4 years',
        eligibility: ['12th PCM with 50%+', 'JEE Main/Advanced'],
        exams: ['JEE Main', 'JEE Advanced', 'State CETs'],
        colleges: ['IITs', 'NITs', 'IIITs', 'State Engineering Colleges'],
        averageSalary: '₹4-25 LPA',
        pros: [
          'Excellent placement opportunities',
          'High starting salaries',
          'Diverse specializations'
        ],
        cons: [
          'Very competitive entrance',
          'Heavy coursework'
        ],
        steps: [
          {
            id: 'class12_eng',
            title: 'Complete 12th with PCM',
            description: 'Score 75%+ in Physics, Chemistry, Mathematics',
            duration: '2 years',
            requirements: ['Strong math and physics foundation']
          },
          {
            id: 'jee_prep',
            title: 'JEE Preparation',
            description: 'Prepare for Joint Entrance Examination',
            duration: '1-2 years',
            requirements: ['Join coaching or self-study', 'Practice tests']
          },
          {
            id: 'jee_exam',
            title: 'Clear JEE',
            description: 'Score qualifying marks in JEE Main/Advanced',
            duration: '2 days'
          },
          {
            id: 'btech_study',
            title: 'B.Tech Course',
            description: 'Complete 4-year engineering degree',
            duration: '4 years'
          }
        ]
      },
      {
        id: 'diploma',
        name: 'Diploma in Engineering',
        description: 'Polytechnic Diploma',
        duration: '3 years',
        eligibility: ['10th with 50%+'],
        exams: ['State Polytechnic Entrance Exams'],
        colleges: ['Government Polytechnics', 'Private Polytechnics'],
        averageSalary: '₹2-6 LPA',
        pros: [
          'Earlier entry into workforce',
          'Practical skills focus',
          'Lower education cost'
        ],
        cons: [
          'Lower salary initially',
          'Limited growth without higher education'
        ],
        steps: [
          {
            id: 'class10_diploma',
            title: 'Complete 10th',
            description: 'Score 50%+ in 10th standard',
            duration: '1 year'
          },
          {
            id: 'polytechnic_entrance',
            title: 'Polytechnic Entrance',
            description: 'Clear state polytechnic entrance exam',
            duration: '1 day'
          },
          {
            id: 'diploma_study',
            title: 'Diploma Course',
            description: 'Complete 3-year diploma with practical training',
            duration: '3 years'
          }
        ]
      }
    ]
  },
  {
    id: 'teaching',
    name: 'Teaching',
    icon: 'school',
    iconFamily: 'MaterialIcons',
    description: 'Educate and inspire the next generation',
    for10th: true,
    for12th: true,
    streams: ['Any'],
    duration: '3-5 years',
    pros: [
      'Job security',
      'Holidays and breaks',
      'Social respect',
      'Personal satisfaction'
    ],
    cons: [
      'Moderate salary',
      'Work pressure',
      'Continuous evaluation'
    ],
    pathways: [
      {
        id: 'bed',
        name: 'B.Ed (Bachelor of Education)',
        description: 'Teaching degree after graduation',
        duration: '2 years',
        eligibility: ['Graduation in any subject', '50%+ marks'],
        exams: ['B.Ed Entrance Exams'],
        colleges: ['Education Colleges', 'Universities'],
        averageSalary: '₹3-8 LPA',
        pros: [
          'Government job opportunities',
          'Stable career',
          'Summer vacations'
        ],
        cons: [
          'Moderate pay scale',
          'High responsibility'
        ],
        steps: [
          {
            id: 'graduation',
            title: 'Complete Graduation',
            description: 'Any bachelor degree with 50%+',
            duration: '3 years'
          },
          {
            id: 'bed_entrance',
            title: 'B.Ed Entrance',
            description: 'Clear B.Ed entrance examination',
            duration: '1 day'
          },
          {
            id: 'bed_study',
            title: 'B.Ed Course',
            description: 'Complete teaching methodology and practice',
            duration: '2 years'
          }
        ]
      }
    ]
  },
  {
    id: 'business',
    name: 'Business',
    icon: 'business',
    iconFamily: 'MaterialIcons',
    description: 'Manage, lead, and create enterprises',
    for10th: true,
    for12th: true,
    streams: ['Commerce', 'Any'],
    duration: '3-5 years',
    pros: [
      'High earning potential',
      'Leadership opportunities',
      'Entrepreneurship options',
      'Diverse career paths'
    ],
    cons: [
      'High competition',
      'Market risks',
      'Pressure and stress'
    ],
    pathways: [
      {
        id: 'bba',
        name: 'BBA (Bachelor of Business Administration)',
        description: 'Undergraduate business degree',
        duration: '3 years',
        eligibility: ['12th in any stream with 50%+'],
        exams: ['Various BBA Entrance Exams'],
        colleges: ['Business Schools', 'Universities'],
        averageSalary: '₹3-12 LPA',
        pros: [
          'Management skills',
          'Leadership development',
          'Industry exposure'
        ],
        cons: [
          'Requires further studies for higher positions'
        ],
        steps: [
          {
            id: 'class12_bba',
            title: 'Complete 12th',
            description: 'Any stream with 50%+ marks',
            duration: '2 years'
          },
          {
            id: 'bba_entrance',
            title: 'BBA Entrance',
            description: 'Clear BBA entrance examinations',
            duration: '1 day'
          },
          {
            id: 'bba_study',
            title: 'BBA Course',
            description: 'Study management, finance, marketing',
            duration: '3 years'
          }
        ]
      }
    ]
  },
  {
    id: 'design',
    name: 'Design',
    icon: 'palette',
    iconFamily: 'MaterialIcons',
    description: 'Create beautiful and functional designs',
    for10th: true,
    for12th: true,
    streams: ['Any'],
    duration: '3-4 years',
    pros: [
      'Creative expression',
      'Growing industry',
      'Flexible work options',
      'Good earning potential'
    ],
    cons: [
      'Competitive field',
      'Client dependency',
      'Irregular income initially'
    ],
    pathways: [
      {
        id: 'design_degree',
        name: 'Bachelor in Design',
        description: 'Graphic Design, Product Design, Fashion Design',
        duration: '4 years',
        eligibility: ['12th with 50%+', 'Portfolio/Entrance Test'],
        exams: ['NIFT', 'NID', 'UCEED'],
        colleges: ['NIFT', 'NID', 'Private Design Colleges'],
        averageSalary: '₹3-15 LPA',
        pros: [
          'Creative career',
          'High demand in digital age',
          'Freelancing opportunities'
        ],
        cons: [
          'Portfolio-based selection',
          'Subjective evaluation'
        ],
        steps: [
          {
            id: 'class12_design',
            title: 'Complete 12th',
            description: 'Any stream, develop creative portfolio',
            duration: '2 years'
          },
          {
            id: 'design_entrance',
            title: 'Design Entrance',
            description: 'Clear design entrance with portfolio',
            duration: '1 day'
          },
          {
            id: 'design_study',
            title: 'Design Course',
            description: 'Study design principles and practical work',
            duration: '4 years'
          }
        ]
      }
    ]
  }
];

export const getCareerPathsForClass = (className: '10th' | '12th'): CareerPath[] => {
  if (className === '10th') {
    return CAREER_INTERESTS.filter(path => path.for10th);
  } else {
    return CAREER_INTERESTS.filter(path => path.for12th);
  }
};

export const getCareerPathById = (id: string): CareerPath | undefined => {
  return CAREER_INTERESTS.find(path => path.id === id);
};
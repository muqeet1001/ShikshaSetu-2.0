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
  gradient: [string, string]; // For gradient backgrounds
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

export const MODERN_CAREER_INTERESTS: CareerPath[] = [
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
    gradient: ['#FF6B6B', '#FF8E88'],
    pros: [
      'High social status',
      'Excellent income potential',
      'Job security',
      'Respect in society',
      'Save lives daily'
    ],
    cons: [
      'Extremely high competition',
      'Long study duration',
      'High stress levels',
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
        averageSalary: '₹6-25 LPA',
        pros: ['High earning potential', 'Prestigious career', 'Job satisfaction'],
        cons: ['Very competitive entrance', 'Long study duration'],
        steps: [
          {
            id: 'class12',
            title: 'Complete 12th with PCB',
            description: 'Score 85%+ in Physics, Chemistry, Biology',
            duration: '2 years'
          },
          {
            id: 'neet_prep',
            title: 'NEET Preparation',
            description: 'Prepare for National Eligibility cum Entrance Test',
            duration: '1-2 years'
          },
          {
            id: 'mbbs_study',
            title: 'MBBS Course',
            description: 'Complete 4.5 years study + 1 year internship',
            duration: '5.5 years'
          }
        ]
      }
    ]
  },
  {
    id: 'technology',
    name: '💻 Technology',
    icon: 'laptop',
    iconFamily: 'MaterialCommunityIcons',
    description: 'Code the future & build apps',
    for10th: true,
    for12th: true,
    streams: ['PCM', 'Any'],
    duration: '3-4 years',
    gradient: ['#4ECDC4', '#44A08D'],
    pros: [
      'High salary packages',
      'Work from anywhere',
      'Constant innovation',
      'Global opportunities',
      'Startup possibilities'
    ],
    cons: [
      'Rapidly changing field',
      'Long working hours',
      'Screen time issues'
    ],
    pathways: [
      {
        id: 'software_dev',
        name: 'Software Development',
        description: 'Build apps, websites, and software systems',
        duration: '3-4 years',
        eligibility: ['12th PCM/Any with 50%+', 'Programming skills'],
        exams: ['JEE', 'Various IT entrance exams'],
        colleges: ['IITs', 'NITs', 'IIIT', 'Private Engineering Colleges'],
        averageSalary: '₹8-50 LPA',
        pros: ['Remote work', 'High salaries', 'Creative problem solving'],
        cons: ['Continuous learning', 'Tight deadlines'],
        steps: [
          {
            id: 'learn_programming',
            title: 'Learn Programming',
            description: 'Master Python, Java, or JavaScript',
            duration: '6 months'
          },
          {
            id: 'degree',
            title: 'Get Degree',
            description: 'B.Tech CS/IT or BCA',
            duration: '3-4 years'
          },
          {
            id: 'build_portfolio',
            title: 'Build Portfolio',
            description: 'Create projects and contribute to open source',
            duration: '1 year'
          }
        ]
      }
    ]
  },
  {
    id: 'creative',
    name: '🎨 Creative Arts',
    icon: 'palette',
    iconFamily: 'MaterialIcons',
    description: 'Express & create beautiful things',
    for10th: true,
    for12th: true,
    streams: ['Any'],
    duration: '3-4 years',
    gradient: ['#A8E6CF', '#7FCDCD'],
    pros: [
      'Creative expression',
      'Flexible work hours',
      'Personal satisfaction',
      'Growing digital market',
      'Freelancing opportunities'
    ],
    cons: [
      'Income uncertainty',
      'High competition',
      'Client dependencies'
    ],
    pathways: [
      {
        id: 'graphic_design',
        name: 'Graphic Design',
        description: 'Visual communication through design',
        duration: '3-4 years',
        eligibility: ['12th Any with 50%+', 'Creative portfolio'],
        exams: ['NIFT', 'NID', 'College-specific tests'],
        colleges: ['NIFT', 'NID', 'Pearl Academy'],
        averageSalary: '₹3-15 LPA',
        pros: ['Creative freedom', 'Digital demand', 'Portfolio-based work'],
        cons: ['Portfolio pressure', 'Client revisions'],
        steps: [
          {
            id: 'learn_tools',
            title: 'Learn Design Tools',
            description: 'Master Photoshop, Illustrator, Figma',
            duration: '6 months'
          },
          {
            id: 'build_portfolio',
            title: 'Build Portfolio',
            description: 'Create diverse design projects',
            duration: '1 year'
          },
          {
            id: 'get_clients',
            title: 'Get Clients',
            description: 'Start freelancing or join agency',
            duration: 'Ongoing'
          }
        ]
      }
    ]
  },
  {
    id: 'business',
    name: '💼 Business',
    icon: 'business',
    iconFamily: 'MaterialIcons',
    description: 'Lead companies & build empires',
    for10th: true,
    for12th: true,
    streams: ['Commerce', 'Any'],
    duration: '3-5 years',
    gradient: ['#FFB347', '#FFCC5C'],
    pros: [
      'High earning potential',
      'Leadership opportunities',
      'Entrepreneurship options',
      'Networking benefits',
      'Decision-making power'
    ],
    cons: [
      'High pressure',
      'Market risks',
      'Long working hours'
    ],
    pathways: [
      {
        id: 'mba',
        name: 'MBA',
        description: 'Master of Business Administration',
        duration: '2 years',
        eligibility: ['Graduation with 50%+', 'Work experience preferred'],
        exams: ['CAT', 'XAT', 'GMAT'],
        colleges: ['IIMs', 'ISB', 'FMS', 'XLRI'],
        averageSalary: '₹15-50 LPA',
        pros: ['Leadership skills', 'High salaries', 'Network building'],
        cons: ['Expensive education', 'High competition'],
        steps: [
          {
            id: 'graduation',
            title: 'Complete Graduation',
            description: 'Any bachelor degree with good grades',
            duration: '3 years'
          },
          {
            id: 'work_experience',
            title: 'Gain Work Experience',
            description: 'Work for 2-3 years in any industry',
            duration: '2-3 years'
          },
          {
            id: 'mba_prep',
            title: 'Prepare for MBA',
            description: 'Clear CAT/XAT and get into top B-schools',
            duration: '2 years'
          }
        ]
      }
    ]
  },
  {
    id: 'content_creator',
    name: '📱 Content Creator',
    icon: 'camera',
    iconFamily: 'MaterialIcons',
    description: 'Influence millions & go viral',
    for10th: true,
    for12th: true,
    streams: ['Any'],
    duration: '1-3 years',
    gradient: ['#FF6B9D', '#C44569'],
    pros: [
      'Global reach',
      'Creative freedom',
      'Multiple income streams',
      'Fame and recognition',
      'Work from anywhere'
    ],
    cons: [
      'Inconsistent income',
      'Algorithm dependency',
      'Public scrutiny',
      'Burnout risk'
    ],
    pathways: [
      {
        id: 'youtuber',
        name: 'YouTuber/Influencer',
        description: 'Create content and build audience',
        duration: '1-3 years',
        eligibility: ['Creative skills', 'Consistency', 'Unique content'],
        colleges: ['Self-taught', 'Mass Communication courses'],
        averageSalary: '₹2-100 LPA (highly variable)',
        pros: ['Creative control', 'Global audience', 'Multiple revenue streams'],
        cons: ['Algorithm changes', 'Income uncertainty', 'Public pressure'],
        steps: [
          {
            id: 'choose_niche',
            title: 'Choose Your Niche',
            description: 'Gaming, Tech, Comedy, Education, etc.',
            duration: '1 month'
          },
          {
            id: 'create_content',
            title: 'Create Consistent Content',
            description: 'Post regularly and engage with audience',
            duration: '6 months - 2 years'
          },
          {
            id: 'monetize',
            title: 'Monetize Your Channel',
            description: 'Ads, sponsorships, merchandise, courses',
            duration: 'Ongoing'
          }
        ]
      }
    ]
  },
  {
    id: 'gaming',
    name: '🎮 Gaming Industry',
    icon: 'gamepad-variant',
    iconFamily: 'MaterialCommunityIcons',
    description: 'Turn gaming passion into career',
    for10th: true,
    for12th: true,
    streams: ['Any'],
    duration: '2-4 years',
    gradient: ['#667eea', '#764ba2'],
    pros: [
      'Follow your passion',
      'Booming industry',
      'Creative work',
      'Global opportunities',
      'Multiple career paths'
    ],
    cons: [
      'Highly competitive',
      'Long development cycles',
      'Irregular income initially'
    ],
    pathways: [
      {
        id: 'game_developer',
        name: 'Game Developer',
        description: 'Create amazing games and interactive experiences',
        duration: '3-4 years',
        eligibility: ['12th with 50%+', 'Programming skills', 'Creative thinking'],
        colleges: ['Gaming institutes', 'Computer Science colleges'],
        averageSalary: '₹4-25 LPA',
        pros: ['Creative coding', 'Growing industry', 'International opportunities'],
        cons: ['Long development cycles', 'Crunch time pressure'],
        steps: [
          {
            id: 'learn_programming',
            title: 'Learn Game Programming',
            description: 'Master Unity, Unreal Engine, C#',
            duration: '1 year'
          },
          {
            id: 'make_games',
            title: 'Create Small Games',
            description: 'Build portfolio with indie games',
            duration: '1-2 years'
          },
          {
            id: 'join_studio',
            title: 'Join Gaming Studio',
            description: 'Work on commercial game projects',
            duration: 'Career'
          }
        ]
      }
    ]
  },
  {
    id: 'finance',
    name: '💰 Finance',
    icon: 'chart-line',
    iconFamily: 'MaterialCommunityIcons',
    description: 'Manage money & build wealth',
    for10th: true,
    for12th: true,
    streams: ['Commerce', 'PCM'],
    duration: '3-5 years',
    gradient: ['#11998e', '#38ef7d'],
    pros: [
      'High salary potential',
      'Job security',
      'Analytical skills',
      'Global opportunities',
      'Prestige'
    ],
    cons: [
      'High pressure',
      'Long working hours',
      'Market volatility stress'
    ],
    pathways: [
      {
        id: 'investment_banking',
        name: 'Investment Banking',
        description: 'Help companies raise capital and make deals',
        duration: '4-6 years',
        eligibility: ['12th Commerce/PCM', 'Strong analytical skills'],
        exams: ['CA', 'CFA', 'FRM'],
        colleges: ['Commerce colleges', 'IIMs', 'ISB'],
        averageSalary: '₹8-50 LPA',
        pros: ['Very high salaries', 'Deal-making excitement', 'Fast career growth'],
        cons: ['Extremely long hours', 'High stress', 'Work-life imbalance'],
        steps: [
          {
            id: 'commerce_degree',
            title: 'Commerce/Finance Degree',
            description: 'B.Com, BBA Finance, or Economics',
            duration: '3 years'
          },
          {
            id: 'internships',
            title: 'Finance Internships',
            description: 'Gain experience in banks or financial firms',
            duration: '1-2 years'
          },
          {
            id: 'certifications',
            title: 'Professional Certifications',
            description: 'CA, CFA, or MBA from top college',
            duration: '2-3 years'
          }
        ]
      }
    ]
  },
  {
    id: 'space_tech',
    name: '🚀 Space Technology',
    icon: 'rocket',
    iconFamily: 'MaterialCommunityIcons',
    description: 'Explore space & reach the stars',
    for10th: false,
    for12th: true,
    streams: ['PCM', 'PCMB'],
    duration: '4-6 years',
    gradient: ['#232526', '#414345'],
    pros: [
      'Cutting-edge technology',
      'Contribute to humanity',
      'Prestigious field',
      'Global collaboration',
      'Future-oriented'
    ],
    cons: [
      'Very specialized',
      'Limited job opportunities',
      'High educational requirements'
    ],
    pathways: [
      {
        id: 'aerospace_engineer',
        name: 'Aerospace Engineer',
        description: 'Design spacecraft and satellite systems',
        duration: '4-6 years',
        eligibility: ['12th PCM with 75%+', 'JEE Advanced'],
        exams: ['JEE Advanced', 'GATE'],
        colleges: ['IIT Bombay', 'IIT Madras', 'IIST'],
        averageSalary: '₹6-25 LPA',
        pros: ['Work on space missions', 'High-tech environment', 'Research opportunities'],
        cons: ['Very competitive', 'Long project cycles', 'Specialized field'],
        steps: [
          {
            id: 'engineering',
            title: 'Aerospace Engineering',
            description: 'B.Tech in Aerospace from IIT/IIST',
            duration: '4 years'
          },
          {
            id: 'specialization',
            title: 'Specialize',
            description: 'M.Tech in specific area like propulsion',
            duration: '2 years'
          },
          {
            id: 'join_isro',
            title: 'Join Space Organization',
            description: 'ISRO, private space companies, research',
            duration: 'Career'
          }
        ]
      }
    ]
  },
  {
    id: 'cybersecurity',
    name: '🛡️ Cyber Security',
    icon: 'shield-check',
    iconFamily: 'MaterialCommunityIcons',
    description: 'Protect digital world from hackers',
    for10th: true,
    for12th: true,
    streams: ['PCM', 'Any'],
    duration: '3-4 years',
    gradient: ['#FF0000', '#8B0000'],
    pros: [
      'High demand field',
      'Excellent salaries',
      'Job security',
      'Constantly evolving',
      'Work with latest tech'
    ],
    cons: [
      'High responsibility',
      '24/7 threat monitoring',
      'Continuous learning required'
    ],
    pathways: [
      {
        id: 'ethical_hacker',
        name: 'Ethical Hacker',
        description: 'Find vulnerabilities before bad guys do',
        duration: '3-5 years',
        eligibility: ['12th PCM/Any', 'Programming knowledge', 'Security mindset'],
        colleges: ['Computer Science colleges', 'Specialized security institutes'],
        averageSalary: '₹6-30 LPA',
        pros: ['High salaries', 'Exciting challenges', 'Help protect systems'],
        cons: ['High pressure', 'Constant learning', 'Responsibility'],
        steps: [
          {
            id: 'learn_basics',
            title: 'Learn Cybersecurity Basics',
            description: 'Networking, programming, security concepts',
            duration: '1 year'
          },
          {
            id: 'certifications',
            title: 'Get Certifications',
            description: 'CEH, CISSP, CompTIA Security+',
            duration: '2 years'
          },
          {
            id: 'practice_hacking',
            title: 'Practice Ethical Hacking',
            description: 'Bug bounties, penetration testing',
            duration: 'Ongoing'
          }
        ]
      }
    ]
  },
  {
    id: 'food_industry',
    name: '👨‍🍳 Food Industry',
    icon: 'chef-hat',
    iconFamily: 'MaterialCommunityIcons',
    description: 'Cook amazing food & run restaurants',
    for10th: true,
    for12th: true,
    streams: ['Any'],
    duration: '2-4 years',
    gradient: ['#FFA726', '#FF7043'],
    pros: [
      'Creative expression',
      'Growing food industry',
      'Entrepreneurship opportunities',
      'Cultural exchange',
      'Immediate job availability'
    ],
    cons: [
      'Long working hours',
      'Physical demands',
      'Initial low pay'
    ],
    pathways: [
      {
        id: 'chef',
        name: 'Professional Chef',
        description: 'Master culinary arts and lead kitchens',
        duration: '2-4 years',
        eligibility: ['10th/12th pass', 'Passion for cooking'],
        colleges: ['Culinary institutes', 'Hotel management colleges'],
        averageSalary: '₹2-15 LPA',
        pros: ['Creative cooking', 'Celebrity chef potential', 'Own restaurant dreams'],
        cons: ['Long hours', 'High pressure kitchen', 'Physical demands'],
        steps: [
          {
            id: 'culinary_school',
            title: 'Culinary Training',
            description: 'Learn cooking techniques and food safety',
            duration: '1-2 years'
          },
          {
            id: 'apprenticeship',
            title: 'Kitchen Apprenticeship',
            description: 'Work under experienced chefs',
            duration: '2-3 years'
          },
          {
            id: 'head_chef',
            title: 'Become Head Chef',
            description: 'Lead kitchen operations or start own restaurant',
            duration: '5-10 years'
          }
        ]
      }
    ]
  },
  {
    id: 'sports',
    name: '⚽ Sports',
    icon: 'soccer',
    iconFamily: 'MaterialCommunityIcons',
    description: 'Turn athletic passion into profession',
    for10th: true,
    for12th: true,
    streams: ['Any'],
    duration: '2-10 years',
    gradient: ['#00C9FF', '#92FE9D'],
    pros: [
      'Follow your passion',
      'Fame and recognition',
      'Fitness and health',
      'Travel opportunities',
      'Inspiring others'
    ],
    cons: [
      'Career uncertainty',
      'Injury risks',
      'Short career span',
      'Intense competition'
    ],
    pathways: [
      {
        id: 'professional_athlete',
        name: 'Professional Athlete',
        description: 'Compete at national/international level',
        duration: '5-15 years',
        eligibility: ['Athletic talent', 'Dedication', 'Physical fitness'],
        colleges: ['Sports universities', 'Sports academies'],
        averageSalary: '₹1-50 LPA (highly variable)',
        pros: ['Fame', 'High earnings potential', 'Represent country'],
        cons: ['Injury risks', 'Short career', 'Intense pressure'],
        steps: [
          {
            id: 'choose_sport',
            title: 'Choose Your Sport',
            description: 'Cricket, Football, Badminton, etc.',
            duration: 'Early childhood'
          },
          {
            id: 'intensive_training',
            title: 'Intensive Training',
            description: 'Join academy, get professional coaching',
            duration: '5-10 years'
          },
          {
            id: 'compete',
            title: 'Professional Competition',
            description: 'State, national, international levels',
            duration: '10-15 years'
          }
        ]
      }
    ]
  },
  {
    id: 'aviation',
    name: '✈️ Aviation',
    icon: 'airplane',
    iconFamily: 'MaterialCommunityIcons',
    description: 'Fly high & explore the world',
    for10th: false,
    for12th: true,
    streams: ['PCM'],
    duration: '2-4 years',
    gradient: ['#2196F3', '#21CBF3'],
    pros: [
      'Travel the world',
      'High salary packages',
      'Prestige and respect',
      'Excellent benefits',
      'Adventure'
    ],
    cons: [
      'Expensive training',
      'Irregular schedules',
      'Away from family',
      'High responsibility'
    ],
    pathways: [
      {
        id: 'commercial_pilot',
        name: 'Commercial Pilot',
        description: 'Fly commercial aircraft for airlines',
        duration: '3-4 years',
        eligibility: ['12th PCM with 50%+', 'Medical fitness', 'English proficiency'],
        exams: ['DGCA exams', 'Medical tests'],
        colleges: ['Flying schools', 'Aviation academies'],
        averageSalary: '₹15-80 LPA',
        pros: ['World travel', 'Very high salaries', 'Prestige'],
        cons: ['Expensive training (₹20-50 lakh)', 'Time away from home'],
        steps: [
          {
            id: 'ground_school',
            title: 'Ground School Training',
            description: 'Learn aviation theory and regulations',
            duration: '6 months'
          },
          {
            id: 'flying_hours',
            title: 'Build Flying Hours',
            description: 'Get required flight experience',
            duration: '2-3 years'
          },
          {
            id: 'airline_job',
            title: 'Join Airlines',
            description: 'Get hired by commercial airlines',
            duration: 'Career'
          }
        ]
      }
    ]
  }
];

export const getCareerPathsForClass = (className: '10th' | '12th'): CareerPath[] => {
  if (className === '10th') {
    return MODERN_CAREER_INTERESTS.filter(path => path.for10th);
  } else {
    return MODERN_CAREER_INTERESTS.filter(path => path.for12th);
  }
};

export const getCareerPathById = (id: string): CareerPath | undefined => {
  return MODERN_CAREER_INTERESTS.find(path => path.id === id);
};
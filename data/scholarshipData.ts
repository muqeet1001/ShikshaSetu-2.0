export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  amount: string;
  category: 'Government' | 'Private' | 'Institution' | 'International';
  eligibility: {
    class?: string[];
    income?: string;
    caste?: string[];
    gender?: string;
    state?: string[];
    percentage?: string;
    subjects?: string[];
    other?: string[];
  };
  applicationPeriod: string;
  documents: string[];
  benefits: string[];
  website: string;
  description: string;
  icon: string;
  iconFamily: 'MaterialCommunityIcons' | 'MaterialIcons';
  color: string;
}

export const SCHOLARSHIPS: Scholarship[] = [
  // Government Scholarships
  {
    id: 'pre_matric_sc',
    name: 'Pre-Matric Scholarship (SC)',
    provider: 'Ministry of Social Justice & Empowerment',
    amount: '₹1,000-17,000/year',
    category: 'Government',
    eligibility: {
      class: ['1st to 10th'],
      income: 'Family income ≤ ₹2.5 LPA',
      caste: ['SC'],
      percentage: '55% in previous class'
    },
    applicationPeriod: 'July - September',
    documents: [
      'Caste Certificate',
      'Income Certificate',
      'Previous year marksheet',
      'Bank account details',
      'Aadhaar Card'
    ],
    benefits: [
      'Tuition fee reimbursement',
      'Maintenance allowance',
      'Book allowance',
      'Stationery allowance'
    ],
    website: 'scholarships.gov.in',
    description: 'Financial assistance for SC students from class 1-10',
    icon: 'school',
    iconFamily: 'MaterialIcons',
    color: '#2196F3'
  },
  {
    id: 'post_matric_sc',
    name: 'Post-Matric Scholarship (SC)',
    provider: 'Ministry of Social Justice & Empowerment',
    amount: '₹2,000-12,000/year',
    category: 'Government',
    eligibility: {
      class: ['11th', '12th', 'Graduate', 'Post-Graduate'],
      income: 'Family income ≤ ₹2.5 LPA',
      caste: ['SC'],
      percentage: '55% in 10th/previous exam'
    },
    applicationPeriod: 'July - November',
    documents: [
      'Caste Certificate',
      'Income Certificate',
      '10th/12th Marksheet',
      'College admission proof',
      'Bank account details'
    ],
    benefits: [
      'Tuition fee payment',
      'Maintenance allowance',
      'Study tour allowance',
      'Thesis typing/printing charges'
    ],
    website: 'scholarships.gov.in',
    description: 'Higher education support for SC students after 10th',
    icon: 'school',
    iconFamily: 'MaterialIcons',
    color: '#2196F3'
  },
  {
    id: 'pre_matric_st',
    name: 'Pre-Matric Scholarship (ST)',
    provider: 'Ministry of Tribal Affairs',
    amount: '₹1,000-17,000/year',
    category: 'Government',
    eligibility: {
      class: ['1st to 10th'],
      income: 'Family income ≤ ₹2.5 LPA',
      caste: ['ST'],
      percentage: '50% in previous class'
    },
    applicationPeriod: 'July - September',
    documents: [
      'Tribal Certificate',
      'Income Certificate',
      'Previous year marksheet',
      'Bank account details',
      'Aadhaar Card'
    ],
    benefits: [
      'Tuition fee reimbursement',
      'Maintenance allowance',
      'Book allowance',
      'Stationery allowance'
    ],
    website: 'scholarships.gov.in',
    description: 'Financial assistance for ST students from class 1-10',
    icon: 'school',
    iconFamily: 'MaterialIcons',
    color: '#4CAF50'
  },
  {
    id: 'post_matric_st',
    name: 'Post-Matric Scholarship (ST)',
    provider: 'Ministry of Tribal Affairs',
    amount: '₹2,000-12,000/year',
    category: 'Government',
    eligibility: {
      class: ['11th', '12th', 'Graduate', 'Post-Graduate'],
      income: 'Family income ≤ ₹2.5 LPA',
      caste: ['ST'],
      percentage: '50% in 10th/previous exam'
    },
    applicationPeriod: 'July - November',
    documents: [
      'Tribal Certificate',
      'Income Certificate',
      '10th/12th Marksheet',
      'College admission proof',
      'Bank account details'
    ],
    benefits: [
      'Tuition fee payment',
      'Maintenance allowance',
      'Study tour allowance',
      'Equipment allowance'
    ],
    website: 'scholarships.gov.in',
    description: 'Higher education support for ST students after 10th',
    icon: 'school',
    iconFamily: 'MaterialIcons',
    color: '#4CAF50'
  },
  {
    id: 'obc_scholarship',
    name: 'OBC Pre & Post Matric Scholarship',
    provider: 'Ministry of Social Justice & Empowerment',
    amount: '₹1,000-12,000/year',
    category: 'Government',
    eligibility: {
      class: ['1st to Post-Graduate'],
      income: 'Family income ≤ ₹1 LPA',
      caste: ['OBC'],
      percentage: '50% in previous exam'
    },
    applicationPeriod: 'July - November',
    documents: [
      'OBC Certificate (Non-creamy layer)',
      'Income Certificate',
      'Previous marksheet',
      'Admission proof',
      'Bank details'
    ],
    benefits: [
      'Tuition fee support',
      'Maintenance allowance',
      'Book allowance',
      'Hostel fees (if applicable)'
    ],
    website: 'scholarships.gov.in',
    description: 'Educational support for OBC students',
    icon: 'school',
    iconFamily: 'MaterialIcons',
    color: '#FF9800'
  },
  {
    id: 'minority_scholarship',
    name: 'Minority Scholarship (Pre & Post Matric)',
    provider: 'Ministry of Minority Affairs',
    amount: '₹1,000-12,000/year',
    category: 'Government',
    eligibility: {
      class: ['1st to Post-Graduate'],
      income: 'Family income ≤ ₹2 LPA',
      other: ['Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Parsi'],
      percentage: '50% in previous exam'
    },
    applicationPeriod: 'August - December',
    documents: [
      'Minority Certificate',
      'Income Certificate',
      'Previous marksheet',
      'Admission proof',
      'Bank account details'
    ],
    benefits: [
      'Tuition fee reimbursement',
      'Maintenance charges',
      'Study materials',
      'Hostel subsidy'
    ],
    website: 'scholarships.gov.in',
    description: 'Support for students from minority communities',
    icon: 'diversity-3',
    iconFamily: 'MaterialIcons',
    color: '#9C27B0'
  },
  {
    id: 'merit_scholarship',
    name: 'National Merit Scholarship',
    provider: 'Department of Higher Education',
    amount: '₹12,000/year',
    category: 'Government',
    eligibility: {
      class: ['12th', 'Graduate'],
      income: 'Family income ≤ ₹6 LPA',
      percentage: 'Top 1% in 12th board exam'
    },
    applicationPeriod: 'June - August',
    documents: [
      '12th Marksheet',
      'Income Certificate',
      'College admission proof',
      'Bank account details',
      'Merit certificate'
    ],
    benefits: [
      '₹1,000/month for graduation',
      'Recognition certificate',
      'Priority in further scholarships'
    ],
    website: 'scholarships.gov.in',
    description: 'Merit-based scholarship for top performing students',
    icon: 'emoji-events',
    iconFamily: 'MaterialIcons',
    color: '#FFD700'
  },
  {
    id: 'inspire_scholarship',
    name: 'INSPIRE Scholarship',
    provider: 'Department of Science & Technology',
    amount: '₹80,000/year',
    category: 'Government',
    eligibility: {
      class: ['12th'],
      subjects: ['Science (PCM/PCB)'],
      percentage: 'Top 1% in 12th or KVPY/JEE/NEET qualified',
      other: ['Pursuing BSc/BTech/Integrated MSc']
    },
    applicationPeriod: 'June - September',
    documents: [
      '12th Science Marksheet',
      'JEE/NEET/KVPY score card',
      'College admission proof',
      'Bank account details'
    ],
    benefits: [
      '₹80,000/year for 5 years',
      'Summer research internship',
      'Mentorship program',
      'Research opportunities'
    ],
    website: 'inspire-dst.gov.in',
    description: 'Attract talent to science stream',
    icon: 'science',
    iconFamily: 'MaterialIcons',
    color: '#00BCD4'
  },
  {
    id: 'girl_child_scholarship',
    name: 'Girl Child Education Scholarship',
    provider: 'Various State Governments',
    amount: '₹500-5,000/year',
    category: 'Government',
    eligibility: {
      class: ['1st to 12th'],
      gender: 'Female',
      income: 'Family income ≤ ₹2 LPA',
      percentage: '60% in previous class'
    },
    applicationPeriod: 'April - August',
    documents: [
      'Birth Certificate',
      'Income Certificate',
      'Previous marksheet',
      'School enrollment proof',
      'Bank account details'
    ],
    benefits: [
      'Educational expenses',
      'Books and uniform',
      'Nutrition support',
      'Transportation allowance'
    ],
    website: 'State Education Portals',
    description: 'Encourage girl child education',
    icon: 'female',
    iconFamily: 'MaterialIcons',
    color: '#E91E63'
  },
  {
    id: 'disability_scholarship',
    name: 'Scholarship for Disabled Students',
    provider: 'Department of Empowerment of PWD',
    amount: '₹1,000-12,000/year',
    category: 'Government',
    eligibility: {
      class: ['1st to Post-Graduate'],
      income: 'Family income ≤ ₹2.5 LPA',
      other: ['40% or more disability'],
      percentage: '40% in previous exam'
    },
    applicationPeriod: 'July - October',
    documents: [
      'Disability Certificate',
      'Income Certificate',
      'Previous marksheet',
      'Medical certificate',
      'Bank account details'
    ],
    benefits: [
      'Tuition fee waiver',
      'Maintenance allowance',
      'Equipment allowance',
      'Reader allowance'
    ],
    website: 'scholarships.gov.in',
    description: 'Support disabled students in education',
    icon: 'accessible',
    iconFamily: 'MaterialIcons',
    color: '#795548'
  },
  // Private/Corporate Scholarships
  {
    id: 'tata_scholarship',
    name: 'Tata Scholarship Program',
    provider: 'Tata Trusts',
    amount: '₹50,000-2,00,000/year',
    category: 'Private',
    eligibility: {
      class: ['12th', 'Graduate'],
      income: 'Family income ≤ ₹4 LPA',
      percentage: '60% in 12th/previous exam',
      other: ['Academic excellence', 'Leadership qualities']
    },
    applicationPeriod: 'May - July',
    documents: [
      'Academic transcripts',
      'Income certificate',
      'Essays and SOP',
      'Recommendation letters',
      'Extracurricular certificates'
    ],
    benefits: [
      'Full tuition fee',
      'Living allowance',
      'Mentorship program',
      'Internship opportunities'
    ],
    website: 'tatatrusts.org',
    description: 'Comprehensive support for deserving students',
    icon: 'business',
    iconFamily: 'MaterialIcons',
    color: '#1976D2'
  },
  {
    id: 'reliance_scholarship',
    name: 'Reliance Foundation Scholarship',
    provider: 'Reliance Foundation',
    amount: '₹2,00,000/year',
    category: 'Private',
    eligibility: {
      class: ['Graduate', 'Post-Graduate'],
      income: 'Family income ≤ ₹6 LPA',
      percentage: '80% in previous exam',
      other: ['Indian citizens only']
    },
    applicationPeriod: 'March - May',
    documents: [
      'Academic marksheets',
      'Income proof',
      'Personal statement',
      'Project portfolio',
      'Character certificate'
    ],
    benefits: [
      'Complete education cost',
      'Laptop/equipment',
      'Industry mentorship',
      'Job opportunities'
    ],
    website: 'reliancefoundation.org',
    description: 'Empowering bright minds for future',
    icon: 'business',
    iconFamily: 'MaterialIcons',
    color: '#FF5722'
  },
  {
    id: 'kishore_vaigyanik',
    name: 'Kishore Vaigyanik Protsahan Yojana (KVPY)',
    provider: 'Indian Institute of Science',
    amount: '₹5,000-7,000/month',
    category: 'Government',
    eligibility: {
      class: ['11th', '12th', '1st year BSc/BTech'],
      subjects: ['Science and Mathematics'],
      percentage: '60% in Science & Math',
      other: ['Clear KVPY exam']
    },
    applicationPeriod: 'June - September',
    documents: [
      '10th/12th Marksheet',
      'KVPY application form',
      'Passport size photos',
      'Category certificate (if applicable)'
    ],
    benefits: [
      'Monthly fellowship',
      'Annual contingency grant',
      'Summer camp participation',
      'Research exposure'
    ],
    website: 'kvpy.iisc.ernet.in',
    description: 'Encourage research in science',
    icon: 'biotech',
    iconFamily: 'MaterialIcons',
    color: '#009688'
  },
  // State-specific Scholarships
  {
    id: 'up_scholarship',
    name: 'UP Scholarship (Pre & Post Matric)',
    provider: 'Government of Uttar Pradesh',
    amount: '₹1,500-15,000/year',
    category: 'Government',
    eligibility: {
      class: ['1st to Post-Graduate'],
      state: ['Uttar Pradesh'],
      income: 'Family income ≤ ₹2 LPA',
      percentage: '50% in previous exam'
    },
    applicationPeriod: 'July - December',
    documents: [
      'UP Domicile Certificate',
      'Income Certificate',
      'Caste Certificate',
      'Previous marksheet',
      'Bank details'
    ],
    benefits: [
      'Tuition fee reimbursement',
      'Examination fee',
      'Maintenance allowance',
      'Book allowance'
    ],
    website: 'scholarship.up.nic.in',
    description: 'Educational support for UP residents',
    icon: 'location-city',
    iconFamily: 'MaterialIcons',
    color: '#607D8B'
  },
  {
    id: 'maharashtra_scholarship',
    name: 'Maharashtra Scholarship',
    provider: 'Government of Maharashtra',
    amount: '₹1,000-12,000/year',
    category: 'Government',
    eligibility: {
      class: ['1st to Post-Graduate'],
      state: ['Maharashtra'],
      income: 'Family income ≤ ₹2.5 LPA',
      percentage: '60% in previous exam'
    },
    applicationPeriod: 'August - November',
    documents: [
      'Maharashtra Domicile',
      'Income Certificate',
      'Caste Certificate',
      'Previous marksheet',
      'College/School certificate'
    ],
    benefits: [
      'Tuition fee waiver',
      'Maintenance charges',
      'Book allowance',
      'Hostel fees'
    ],
    website: 'mahadbt.maharashtra.gov.in',
    description: 'Support for Maharashtra students',
    icon: 'location-city',
    iconFamily: 'MaterialIcons',
    color: '#FF5722'
  }
];

// Helper functions
export const getScholarshipsByCategory = (category: string): Scholarship[] => {
  return SCHOLARSHIPS.filter(scholarship => scholarship.category === category);
};

export const getScholarshipsByClass = (className: string): Scholarship[] => {
  return SCHOLARSHIPS.filter(scholarship => 
    scholarship.eligibility.class?.includes(className) || 
    scholarship.eligibility.class?.some(c => c.includes(className))
  );
};

export const getScholarshipsByCaste = (caste: string): Scholarship[] => {
  return SCHOLARSHIPS.filter(scholarship => 
    scholarship.eligibility.caste?.includes(caste)
  );
};

export const getScholarshipsByIncome = (income: number): Scholarship[] => {
  return SCHOLARSHIPS.filter(scholarship => {
    if (!scholarship.eligibility.income) return true;
    
    const incomeLimit = scholarship.eligibility.income;
    if (incomeLimit.includes('₹1 LPA') && income <= 100000) return true;
    if (incomeLimit.includes('₹2 LPA') && income <= 200000) return true;
    if (incomeLimit.includes('₹2.5 LPA') && income <= 250000) return true;
    if (incomeLimit.includes('₹4 LPA') && income <= 400000) return true;
    if (incomeLimit.includes('₹6 LPA') && income <= 600000) return true;
    
    return false;
  });
};

export const getEligibleScholarships = (criteria: {
  class?: string;
  caste?: string;
  income?: number;
  gender?: string;
  state?: string;
  percentage?: number;
  subjects?: string[];
}): Scholarship[] => {
  return SCHOLARSHIPS.filter(scholarship => {
    // Check class eligibility
    if (criteria.class && scholarship.eligibility.class) {
      const classMatch = scholarship.eligibility.class.some(c => 
        c === criteria.class || 
        c.includes(criteria.class!) ||
        (criteria.class === '12th' && (c.includes('12th') || c.includes('Graduate'))) ||
        (criteria.class === '10th' && (c.includes('10th') || c.includes('11th')))
      );
      if (!classMatch) return false;
    }

    // Check caste eligibility
    if (criteria.caste && scholarship.eligibility.caste) {
      if (!scholarship.eligibility.caste.includes(criteria.caste)) return false;
    }

    // Check income eligibility
    if (criteria.income && scholarship.eligibility.income) {
      const incomeLimit = scholarship.eligibility.income;
      let eligible = false;
      
      if (incomeLimit.includes('₹1 LPA') && criteria.income <= 100000) eligible = true;
      if (incomeLimit.includes('₹2 LPA') && criteria.income <= 200000) eligible = true;
      if (incomeLimit.includes('₹2.5 LPA') && criteria.income <= 250000) eligible = true;
      if (incomeLimit.includes('₹4 LPA') && criteria.income <= 400000) eligible = true;
      if (incomeLimit.includes('₹6 LPA') && criteria.income <= 600000) eligible = true;
      
      if (!eligible) return false;
    }

    // Check gender eligibility
    if (criteria.gender && scholarship.eligibility.gender) {
      if (scholarship.eligibility.gender !== criteria.gender) return false;
    }

    // Check state eligibility
    if (criteria.state && scholarship.eligibility.state) {
      if (!scholarship.eligibility.state.includes(criteria.state)) return false;
    }

    return true;
  });
};
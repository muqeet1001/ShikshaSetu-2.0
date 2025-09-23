export interface Resource {
  id: string;
  title: string;
  category: string;
  examType?: string[];
  subject?: string[];
  description: string;
  fileType: 'PDF' | 'Video' | 'Quiz' | 'Notes' | 'Link';
  size?: string;
  downloadCount?: number;
  rating?: number;
  uploadDate: string;
  featured?: boolean;
  icon: string;
  iconFamily: 'MaterialCommunityIcons' | 'MaterialIcons';
  color: string;
  url?: string;
}

export interface ExamInfo {
  id: string;
  name: string;
  fullName: string;
  category: 'Engineering' | 'Medical' | 'Law' | 'Defence' | 'Management' | 'Arts' | 'Other';
  description: string;
  icon: string;
  color: string;
  subjects: string[];
  pattern: {
    duration: string;
    questions: number;
    marking: string;
  };
  eligibility: string[];
  examDates: string;
  applicationDates: string;
}

export interface StudyProgress {
  totalExamsAttempted: number;
  averageAccuracy: number;
  strongSubjects: string[];
  weakSubjects: string[];
  suggestedTopics: string[];
  studyStreak: number;
  hoursStudied: number;
}

// Sample study progress data
export const STUDY_PROGRESS: StudyProgress = {
  totalExamsAttempted: 15,
  averageAccuracy: 76.5,
  strongSubjects: ['Mathematics', 'Physics'],
  weakSubjects: ['Organic Chemistry', 'English'],
  suggestedTopics: ['Aldehydes and Ketones', 'Reading Comprehension', 'Thermodynamics'],
  studyStreak: 12,
  hoursStudied: 145
};

// Exam information database
export const EXAM_INFO: ExamInfo[] = [
  {
    id: 'neet',
    name: 'NEET',
    fullName: 'National Eligibility cum Entrance Test',
    category: 'Medical',
    description: 'National level entrance exam for MBBS/BDS admissions',
    icon: 'medical-bag',
    color: '#E53E3E',
    subjects: ['Physics', 'Chemistry', 'Biology'],
    pattern: {
      duration: '3 hours 20 minutes',
      questions: 200,
      marking: '+4 for correct, -1 for incorrect'
    },
    eligibility: ['12th with PCB', '50% for General', '40% for SC/ST/OBC'],
    examDates: 'May 2025',
    applicationDates: 'December 2024 - January 2025'
  },
  {
    id: 'jee',
    name: 'JEE',
    fullName: 'Joint Entrance Examination',
    category: 'Engineering',
    description: 'Premier entrance exam for IIT, NIT, IIIT admissions',
    icon: 'calculator',
    color: '#3182CE',
    subjects: ['Mathematics', 'Physics', 'Chemistry'],
    pattern: {
      duration: '3 hours',
      questions: 90,
      marking: '+4 for correct, -1 for incorrect'
    },
    eligibility: ['12th with PCM', '75% in 12th or top 20 percentile'],
    examDates: 'January & April 2025',
    applicationDates: 'November 2024 - January 2025'
  },
  {
    id: 'cuet',
    name: 'CUET',
    fullName: 'Common University Entrance Test',
    category: 'Arts',
    description: 'Central entrance test for undergraduate admissions',
    icon: 'school',
    color: '#805AD5',
    subjects: ['Language', 'Domain Subjects', 'General Test'],
    pattern: {
      duration: '2-3 hours',
      questions: 150,
      marking: '+5 for correct, -1 for incorrect'
    },
    eligibility: ['12th in relevant subjects', 'No age limit'],
    examDates: 'May-June 2025',
    applicationDates: 'February - March 2025'
  },
  {
    id: 'clat',
    name: 'CLAT',
    fullName: 'Common Law Admission Test',
    category: 'Law',
    description: 'National level law entrance examination',
    icon: 'gavel',
    color: '#D69E2E',
    subjects: ['English', 'GK', 'Legal Reasoning', 'Logical Reasoning', 'Mathematics'],
    pattern: {
      duration: '2 hours',
      questions: 120,
      marking: '+1 for correct, -0.25 for incorrect'
    },
    eligibility: ['12th with 45% for General', '40% for SC/ST'],
    examDates: 'December 2024',
    applicationDates: 'August - October 2024'
  },
  {
    id: 'nda',
    name: 'NDA',
    fullName: 'National Defence Academy',
    category: 'Defence',
    description: 'Entrance exam for Army, Navy, Air Force training',
    icon: 'shield',
    color: '#38A169',
    subjects: ['Mathematics', 'General Ability Test'],
    pattern: {
      duration: '5 hours',
      questions: 270,
      marking: '+2.5 for Math, +4 for GAT'
    },
    eligibility: ['12th PCM for Army/Navy', '12th PCB/PCM for Air Force', 'Unmarried males'],
    examDates: 'April & September 2025',
    applicationDates: 'January - February 2025'
  },
  {
    id: 'upsc',
    name: 'UPSC',
    fullName: 'Union Public Service Commission',
    category: 'Other',
    description: 'Civil Services Examination for IAS, IPS, IFS',
    icon: 'account-tie',
    color: '#E53E3E',
    subjects: ['General Studies', 'Optional Subject', 'Essay'],
    pattern: {
      duration: '3 stages - Prelims, Mains, Interview',
      questions: 200,
      marking: '+2 for correct, -0.66 for incorrect'
    },
    eligibility: ['Graduation', 'Age 21-32 (General)', 'Indian citizenship'],
    examDates: 'June 2025 (Prelims)',
    applicationDates: 'February - March 2025'
  }
];

// Resources database
export const RESOURCES: Resource[] = [
  // NCERT Books & Notes
  {
    id: 'ncert_physics_12',
    title: 'NCERT Physics Class 12 - Complete Book',
    category: 'NCERT Books',
    examType: ['NEET', 'JEE'],
    subject: ['Physics'],
    description: 'Official NCERT Physics textbook for Class 12 with all chapters',
    fileType: 'PDF',
    size: '45.2 MB',
    downloadCount: 125000,
    rating: 4.8,
    uploadDate: '2024-01-15',
    featured: true,
    icon: 'book-open-page-variant',
    iconFamily: 'MaterialCommunityIcons',
    color: '#3182CE',
    url: 'https://ncert.nic.in/textbook/pdf/leph1dd.zip'
  },
  {
    id: 'ncert_chemistry_11',
    title: 'NCERT Chemistry Class 11 - Part 1 & 2',
    category: 'NCERT Books',
    examType: ['NEET', 'JEE'],
    subject: ['Chemistry'],
    description: 'Complete NCERT Chemistry books for Class 11 - both parts included',
    fileType: 'PDF',
    size: '52.8 MB',
    downloadCount: 98000,
    rating: 4.7,
    uploadDate: '2024-01-10',
    featured: true,
    icon: 'flask',
    iconFamily: 'MaterialCommunityIcons',
    color: '#38A169'
  },
  {
    id: 'ncert_biology_12',
    title: 'NCERT Biology Class 12 - Complete Notes',
    category: 'NCERT Books',
    examType: ['NEET'],
    subject: ['Biology'],
    description: 'Comprehensive NCERT Biology Class 12 with chapter-wise notes',
    fileType: 'PDF',
    size: '38.5 MB',
    downloadCount: 87000,
    rating: 4.9,
    uploadDate: '2024-02-01',
    icon: 'leaf',
    iconFamily: 'MaterialCommunityIcons',
    color: '#68D391'
  },
  {
    id: 'ncert_math_12',
    title: 'NCERT Mathematics Class 12 - All Chapters',
    category: 'NCERT Books',
    examType: ['JEE', 'CUET'],
    subject: ['Mathematics'],
    description: 'Complete NCERT Mathematics Class 12 with solved examples',
    fileType: 'PDF',
    size: '41.2 MB',
    downloadCount: 105000,
    rating: 4.6,
    uploadDate: '2024-01-20',
    icon: 'calculator-variant',
    iconFamily: 'MaterialCommunityIcons',
    color: '#805AD5'
  },

  // Previous Year Papers
  {
    id: 'neet_2024_paper',
    title: 'NEET 2024 Question Paper with Solutions',
    category: 'Previous Year Papers',
    examType: ['NEET'],
    subject: ['Physics', 'Chemistry', 'Biology'],
    description: 'Complete NEET 2024 question paper with detailed solutions',
    fileType: 'PDF',
    size: '15.2 MB',
    downloadCount: 156000,
    rating: 4.9,
    uploadDate: '2024-05-10',
    featured: true,
    icon: 'file-document-edit',
    iconFamily: 'MaterialCommunityIcons',
    color: '#E53E3E'
  },
  {
    id: 'jee_main_2024',
    title: 'JEE Main 2024 - All Shifts Papers',
    category: 'Previous Year Papers',
    examType: ['JEE'],
    subject: ['Mathematics', 'Physics', 'Chemistry'],
    description: 'JEE Main 2024 papers from all shifts with answer keys',
    fileType: 'PDF',
    size: '28.5 MB',
    downloadCount: 142000,
    rating: 4.8,
    uploadDate: '2024-04-15',
    featured: true,
    icon: 'file-multiple',
    iconFamily: 'MaterialCommunityIcons',
    color: '#3182CE'
  },
  {
    id: 'cuet_2023_papers',
    title: 'CUET 2023 Previous Year Papers - All Domains',
    category: 'Previous Year Papers',
    examType: ['CUET'],
    subject: ['English', 'Mathematics', 'General Test'],
    description: 'CUET 2023 papers covering all domain subjects',
    fileType: 'PDF',
    size: '35.8 MB',
    downloadCount: 78000,
    rating: 4.5,
    uploadDate: '2023-08-20',
    icon: 'file-outline',
    iconFamily: 'MaterialCommunityIcons',
    color: '#805AD5'
  },
  {
    id: 'clat_2024_paper',
    title: 'CLAT 2024 Question Paper with Analysis',
    category: 'Previous Year Papers',
    examType: ['CLAT'],
    subject: ['English', 'Legal Reasoning', 'Logical Reasoning'],
    description: 'CLAT 2024 paper with detailed section-wise analysis',
    fileType: 'PDF',
    size: '12.5 MB',
    downloadCount: 45000,
    rating: 4.7,
    uploadDate: '2024-01-05',
    icon: 'gavel',
    iconFamily: 'MaterialCommunityIcons',
    color: '#D69E2E'
  },

  // Video Lectures
  {
    id: 'organic_chemistry_basics',
    title: 'Organic Chemistry Basics - Complete Playlist',
    category: 'Video Lectures',
    examType: ['NEET', 'JEE'],
    subject: ['Chemistry'],
    description: '50+ hours of organic chemistry lectures covering all basic concepts',
    fileType: 'Video',
    downloadCount: 89000,
    rating: 4.6,
    uploadDate: '2024-03-01',
    featured: true,
    icon: 'play-circle',
    iconFamily: 'MaterialCommunityIcons',
    color: '#E53E3E',
    url: 'https://youtube.com/playlist?list=organic-chemistry'
  },
  {
    id: 'physics_mechanics',
    title: 'Physics Mechanics - JEE Level',
    category: 'Video Lectures',
    examType: ['JEE'],
    subject: ['Physics'],
    description: 'Complete mechanics course for JEE Main and Advanced',
    fileType: 'Video',
    downloadCount: 67000,
    rating: 4.8,
    uploadDate: '2024-02-15',
    icon: 'video-outline',
    iconFamily: 'MaterialCommunityIcons',
    color: '#3182CE'
  },
  {
    id: 'biology_genetics',
    title: 'Genetics and Evolution - NEET Special',
    category: 'Video Lectures',
    examType: ['NEET'],
    subject: ['Biology'],
    description: 'Detailed genetics and evolution lectures for NEET preparation',
    fileType: 'Video',
    downloadCount: 54000,
    rating: 4.7,
    uploadDate: '2024-01-25',
    icon: 'dna',
    iconFamily: 'MaterialCommunityIcons',
    color: '#38A169'
  },

  // Mock Tests & Quizzes
  {
    id: 'neet_mock_2025',
    title: 'NEET 2025 Mock Test Series - 50 Tests',
    category: 'Mock Tests',
    examType: ['NEET'],
    subject: ['Physics', 'Chemistry', 'Biology'],
    description: 'Comprehensive mock test series based on latest NEET pattern',
    fileType: 'Quiz',
    downloadCount: 125000,
    rating: 4.9,
    uploadDate: '2024-06-01',
    featured: true,
    icon: 'clipboard-check',
    iconFamily: 'MaterialCommunityIcons',
    color: '#E53E3E'
  },
  {
    id: 'jee_practice_tests',
    title: 'JEE Main Practice Tests - Chapter Wise',
    category: 'Mock Tests',
    examType: ['JEE'],
    subject: ['Mathematics', 'Physics', 'Chemistry'],
    description: 'Chapter-wise practice tests for JEE Main preparation',
    fileType: 'Quiz',
    downloadCount: 98000,
    rating: 4.7,
    uploadDate: '2024-05-20',
    icon: 'quiz',
    iconFamily: 'MaterialCommunityIcons',
    color: '#3182CE'
  },
  {
    id: 'cuet_mock_english',
    title: 'CUET English Mock Tests - Domain Specific',
    category: 'Mock Tests',
    examType: ['CUET'],
    subject: ['English'],
    description: 'Domain-specific English mock tests for CUET preparation',
    fileType: 'Quiz',
    downloadCount: 43000,
    rating: 4.4,
    uploadDate: '2024-04-10',
    icon: 'book-alphabet',
    iconFamily: 'MaterialCommunityIcons',
    color: '#805AD5'
  },

  // Strategy & Tips
  {
    id: 'neet_strategy_2025',
    title: 'NEET 2025 Preparation Strategy by Toppers',
    category: 'Strategy & Tips',
    examType: ['NEET'],
    subject: ['General'],
    description: 'Complete preparation strategy shared by NEET toppers',
    fileType: 'PDF',
    size: '8.5 MB',
    downloadCount: 87000,
    rating: 4.8,
    uploadDate: '2024-07-01',
    featured: true,
    icon: 'lightbulb',
    iconFamily: 'MaterialCommunityIcons',
    color: '#D69E2E'
  },
  {
    id: 'jee_time_management',
    title: 'JEE Time Management & Exam Strategy',
    category: 'Strategy & Tips',
    examType: ['JEE'],
    subject: ['General'],
    description: 'Effective time management techniques for JEE exam',
    fileType: 'PDF',
    size: '6.2 MB',
    downloadCount: 65000,
    rating: 4.6,
    uploadDate: '2024-06-15',
    icon: 'clock-outline',
    iconFamily: 'MaterialCommunityIcons',
    color: '#3182CE'
  },

  // Formula Sheets
  {
    id: 'physics_formulas',
    title: 'Physics Formula Sheet - Complete JEE/NEET',
    category: 'Formula Sheets',
    examType: ['JEE', 'NEET'],
    subject: ['Physics'],
    description: 'All important physics formulas for JEE and NEET in one place',
    fileType: 'PDF',
    size: '4.2 MB',
    downloadCount: 156000,
    rating: 4.9,
    uploadDate: '2024-03-10',
    featured: true,
    icon: 'sigma',
    iconFamily: 'MaterialCommunityIcons',
    color: '#3182CE'
  },
  {
    id: 'chemistry_formulas',
    title: 'Chemistry Formula & Reaction Sheet',
    category: 'Formula Sheets',
    examType: ['JEE', 'NEET'],
    subject: ['Chemistry'],
    description: 'Important chemistry formulas and reactions compilation',
    fileType: 'PDF',
    size: '5.8 MB',
    downloadCount: 134000,
    rating: 4.8,
    uploadDate: '2024-03-05',
    icon: 'flask-outline',
    iconFamily: 'MaterialCommunityIcons',
    color: '#38A169'
  },
  {
    id: 'math_formulas',
    title: 'Mathematics Formula Handbook - JEE',
    category: 'Formula Sheets',
    examType: ['JEE'],
    subject: ['Mathematics'],
    description: 'Complete mathematics formulas handbook for JEE preparation',
    fileType: 'PDF',
    size: '7.1 MB',
    downloadCount: 98000,
    rating: 4.7,
    uploadDate: '2024-02-28',
    icon: 'sigma',
    iconFamily: 'MaterialCommunityIcons',
    color: '#805AD5'
  },

  // Success Stories
  {
    id: 'aiims_topper_story',
    title: 'AIIMS Delhi Topper Success Story 2024',
    category: 'Success Stories',
    examType: ['NEET'],
    subject: ['General'],
    description: 'Journey and strategies of AIIMS Delhi topper',
    fileType: 'PDF',
    size: '3.2 MB',
    downloadCount: 78000,
    rating: 4.9,
    uploadDate: '2024-08-01',
    icon: 'trophy',
    iconFamily: 'MaterialCommunityIcons',
    color: '#D69E2E'
  },
  {
    id: 'iit_bombay_topper',
    title: 'IIT Bombay CSE Topper Interview & Tips',
    category: 'Success Stories',
    examType: ['JEE'],
    subject: ['General'],
    description: 'Exclusive interview with IIT Bombay CSE topper',
    fileType: 'Video',
    downloadCount: 92000,
    rating: 4.8,
    uploadDate: '2024-07-20',
    icon: 'account-star',
    iconFamily: 'MaterialCommunityIcons',
    color: '#3182CE'
  }
];

// Helper functions
export const getResourcesByCategory = (category: string): Resource[] => {
  return RESOURCES.filter(resource => resource.category === category);
};

export const getResourcesByExam = (examType: string): Resource[] => {
  return RESOURCES.filter(resource => 
    resource.examType?.includes(examType)
  );
};

export const getFeaturedResources = (): Resource[] => {
  return RESOURCES.filter(resource => resource.featured);
};

export const getResourcesBySubject = (subject: string): Resource[] => {
  return RESOURCES.filter(resource => 
    resource.subject?.includes(subject)
  );
};

export const searchResources = (query: string): Resource[] => {
  const lowercaseQuery = query.toLowerCase();
  return RESOURCES.filter(resource => 
    resource.title.toLowerCase().includes(lowercaseQuery) ||
    resource.description.toLowerCase().includes(lowercaseQuery) ||
    resource.category.toLowerCase().includes(lowercaseQuery) ||
    resource.subject?.some(subject => subject.toLowerCase().includes(lowercaseQuery)) ||
    resource.examType?.some(exam => exam.toLowerCase().includes(lowercaseQuery))
  );
};

export const RESOURCE_CATEGORIES = [
  {
    id: 'ncert',
    name: 'NCERT Books',
    icon: 'book-open-page-variant',
    color: '#3182CE',
    count: RESOURCES.filter(r => r.category === 'NCERT Books').length
  },
  {
    id: 'previous-papers',
    name: 'Previous Year Papers',
    icon: 'file-document-edit',
    color: '#E53E3E',
    count: RESOURCES.filter(r => r.category === 'Previous Year Papers').length
  },
  {
    id: 'video-lectures',
    name: 'Video Lectures',
    icon: 'play-circle',
    color: '#38A169',
    count: RESOURCES.filter(r => r.category === 'Video Lectures').length
  },
  {
    id: 'mock-tests',
    name: 'Mock Tests',
    icon: 'clipboard-check',
    color: '#805AD5',
    count: RESOURCES.filter(r => r.category === 'Mock Tests').length
  },
  {
    id: 'syllabus',
    name: 'Syllabus & Pattern',
    icon: 'format-list-bulleted',
    color: '#D69E2E',
    count: 12
  },
  {
    id: 'strategy',
    name: 'Strategy & Tips',
    icon: 'lightbulb',
    color: '#38A169',
    count: RESOURCES.filter(r => r.category === 'Strategy & Tips').length
  },
  {
    id: 'formula-sheets',
    name: 'Formula Sheets',
    icon: 'sigma',
    color: '#3182CE',
    count: RESOURCES.filter(r => r.category === 'Formula Sheets').length
  },
  {
    id: 'success-stories',
    name: 'Success Stories',
    icon: 'trophy',
    color: '#D69E2E',
    count: RESOURCES.filter(r => r.category === 'Success Stories').length
  }
];
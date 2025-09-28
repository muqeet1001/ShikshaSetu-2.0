import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Linking } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { getItem, setItem } from '../utils/storage';

const NAVY = '#1E3A5F';
const NAVY_DARK = '#0F2A3F';

const Pill = ({ label, active, onPress }: { label: string; active?: boolean; onPress?: () => void }) => (
  <TouchableOpacity style={[styles.pill, active && styles.pillActive]} onPress={onPress}>
    <Text style={[styles.pillText, active && styles.pillTextActive]}>{label}</Text>
  </TouchableOpacity>
);

const ActionButton = ({ label, onPress }: { label: string; onPress?: () => void }) => (
  <TouchableOpacity style={styles.actionBtn} onPress={onPress}>
    <Text style={styles.actionBtnText}>{label}</Text>
  </TouchableOpacity>
);

const coursesData = [
  {
    id: 'bsc_cs',
    name: 'B.Sc. Computer Science',
    stream: 'Science',
    careers: ['Software', 'Data Analyst'],
    duration: '3 yrs',
    eligibility: '12th (Science), PCM preferred',
    higherStudies: ['M.Sc. CS', 'MCA'],
    scholarships: ['Govt Merit Scholarship', 'STEM Scholarships'],
    skills: ['Programming', 'Data Structures', 'Databases'],
    resources: ['CS50', 'Android Basics'],
    nearbyColleges: ['Govt. Science College, Mumbai', 'Govt. Tech College, Nashik'],
  },
  {
    id: 'ba_eng',
    name: 'B.A. English Literature',
    stream: 'Arts',
    careers: ['Journalism', 'Teaching'],
    duration: '3 yrs',
    eligibility: '12th (Any Stream), English preferred',
    higherStudies: ['M.A. English', 'B.Ed.'],
    scholarships: ['Humanities Scholarship'],
    skills: ['Writing', 'Critical Thinking'],
    resources: ['OpenLit Courses'],
    nearbyColleges: ['Govt. Arts College, Pune'],
  },
];

const collegesData = [
  {
    id: 'gsc_mumbai',
    name: 'Govt. Science College, Mumbai',
    courses: ['B.Sc.', 'B.A.'],
    cutoff: '85%',
    facilities: ['Hostel', 'Lab', 'Library'],
    address: 'Fort, Mumbai',
    distance: '5.2 km',
  },
  {
    id: 'gac_pune',
    name: 'Govt. Arts College, Pune',
    courses: ['B.A.', 'B.Com'],
    cutoff: '80%',
    facilities: ['Library', 'Internet'],
    address: 'Shivajinagar, Pune',
    distance: '3.8 km',
  },
];

// Sample alumni data keyed by college and district
const alumniData: Record<string, Record<string, Array<{ id: string; name: string; year: string; currentRole: string; employer: string; linkedin: string; x: string }>>> = {
  gsc_mumbai: {
    Jammu: [
      { id: 'al_j1', name: 'Imran Ahmed', year: '2021', currentRole: 'Software Engineer', employer: 'JK Bank IT', linkedin: 'https://www.linkedin.com/in/example-imran', x: 'https://x.com/example_imran' },
      { id: 'al_j2', name: 'Ritika Sharma', year: '2020', currentRole: 'Data Analyst', employer: 'Govt Dept. of IT, J&K', linkedin: 'https://www.linkedin.com/in/example-ritika', x: 'https://x.com/example_ritika' },
    ],
    Srinagar: [
      { id: 'al_s1', name: 'Adil Khan', year: '2019', currentRole: 'QA Engineer', employer: 'Govt eGov Cell', linkedin: 'https://www.linkedin.com/in/example-adil', x: 'https://x.com/example_adil' },
    ],
  },
  gac_pune: {
    Jammu: [
      { id: 'al_j3', name: 'Sana Mir', year: '2022', currentRole: 'Teacher', employer: 'Govt High School Jammu', linkedin: 'https://www.linkedin.com/in/example-sana', x: 'https://x.com/example_sana' },
    ],
    Srinagar: [
      { id: 'al_s2', name: 'Yasir Rather', year: '2020', currentRole: 'Journalist', employer: 'Doordarshan Kendra Srinagar', linkedin: 'https://www.linkedin.com/in/example-yasir', x: 'https://x.com/example_yasir' },
    ],
  },
};

interface Props {
  initialTab?: 'courses' | 'colleges';
  onBack?: () => void;
  onOpenProfile?: () => void;
}

const CoursesCollegesScreen = ({ initialTab = 'courses', onBack, onOpenProfile }: Props) => {
  const [screen, setScreen] = useState<'courses' | 'colleges' | 'courseDetail' | 'collegeDetail' | 'compare' | 'map' | 'alumniList' | 'alumniProfile'>(initialTab);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [selectedCollege, setSelectedCollege] = useState<any>(null);
  const [selectedAlumni, setSelectedAlumni] = useState<any>(null);
  const [compareList, setCompareList] = useState<Array<{ type: 'course' | 'college'; item: any }>>([]);
  const [myPlan, setMyPlan] = useState<Array<{ type: 'course' | 'college'; item: any }>>([]);

  // Course filters
  const streamOptions = ['All', 'Science', 'Arts', 'Commerce'];
  const interestOptions = ['All', 'Programming', 'Writing'];
  const careerOptions = ['All', 'Software', 'Data Analyst', 'Journalism', 'Teaching'];
  const [streamIdx, setStreamIdx] = useState(0);
  const [interestIdx, setInterestIdx] = useState(0);
  const [careerIdx, setCareerIdx] = useState(0);

  // College filters
  const districtOptions = ['All', 'Jammu', 'Srinagar', 'Anantnag', 'Baramulla', 'Budgam', 'Bandipora', 'Ganderbal', 'Kupwara', 'Kulgam', 'Pulwama', 'Shopian', 'Doda', 'Kishtwar', 'Ramban', 'Kathua', 'Samba', 'Udhampur', 'Reasi', 'Poonch', 'Rajouri'];
  const courseOptions = ['All', 'B.Sc.', 'B.A.', 'B.Com'];
  const facilityOptions = ['All', 'Hostel', 'Lab', 'Library', 'Internet'];
  const [districtIdx, setDistrictIdx] = useState(0);
  const [courseIdx, setCourseIdx] = useState(0);
  const [facilityIdx, setFacilityIdx] = useState(0);

  // Load persisted state
  useEffect(() => {
    (async () => {
      try {
        const planRaw = await getItem('SS_MY_PLAN');
        const cmpRaw = await getItem('SS_COMPARE');
        if (planRaw) setMyPlan(JSON.parse(planRaw));
        if (cmpRaw) setCompareList(JSON.parse(cmpRaw));
      } catch (e) {}
    })();
  }, []);

  // Persist on change
  useEffect(() => {
    setItem('SS_MY_PLAN', JSON.stringify(myPlan)).catch(() => {});
  }, [myPlan]);
  useEffect(() => {
    setItem('SS_COMPARE', JSON.stringify(compareList)).catch(() => {});
  }, [compareList]);

  const addToCompare = (type: 'course' | 'college', item: any) => {
    setCompareList(prev => {
      const exists = prev.find(x => x.type === type && x.item.id === item.id);
      if (exists) return prev; // avoid duplicates
      const next = [...prev, { type, item }];
      if (next.length >= 2) setScreen('compare');
      return next;
    });
  };

  const addToPlan = (type: 'course' | 'college', item: any) => {
    setMyPlan(prev => {
      const exists = prev.find(x => x.type === type && x.item.id === item.id);
      if (exists) return prev;
      Alert.alert('Saved', `${item.name} added to your plan.`);
      return [...prev, { type, item }];
    });
  };

  const removeFromCompare = (id: string) => setCompareList(prev => prev.filter(x => x.item.id !== id));

const CourseCard: React.FC<{ c: any }> = ({ c }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{c.name}</Text>
      <Text style={styles.cardLine}>Stream: {c.stream}</Text>
      <Text style={styles.cardLine}>Careers: {c.careers.join(', ')}</Text>
      <Text style={styles.cardLine}>Duration: {c.duration}</Text>
      <View style={styles.cardActions}>
        <ActionButton label="View Details" onPress={() => { setSelectedCourse(c); setScreen('courseDetail'); }} />
        <ActionButton label="Compare" onPress={() => addToCompare('course', c)} />
      </View>
    </View>
  );

const CollegeCard: React.FC<{ col: any }> = ({ col }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{col.name}</Text>
      <Text style={styles.cardLine}>Courses: {col.courses.join(', ')}</Text>
      <Text style={styles.cardLine}>Cut-off: {col.cutoff}</Text>
      <Text style={styles.cardLine}>Facilities: {col.facilities.join(', ')}</Text>
      <View style={styles.cardActions}>
        <ActionButton label="View Details" onPress={() => { setSelectedCollege(col); setScreen('collegeDetail'); }} />
        <ActionButton label="Map" onPress={() => { setSelectedCollege(col); setScreen('map'); }} />
        <ActionButton label="From My District" onPress={() => { setSelectedCollege(col); setScreen('alumniList'); }} />
      </View>
    </View>
  );

  const filteredCourses = useMemo(() => {
    const stream = streamOptions[streamIdx];
    const interest = interestOptions[interestIdx];
    const career = careerOptions[careerIdx];
    return coursesData.filter(c => {
      if (stream !== 'All' && c.stream !== stream) return false;
      if (interest !== 'All') {
        const mapInterest = interest === 'Programming' ? 'Programming' : interest === 'Writing' ? 'Writing' : null;
        if (mapInterest && !(c.skills || []).includes(mapInterest)) return false;
      }
      if (career !== 'All' && !(c.careers || []).includes(career)) return false;
      return true;
    });
  }, [streamIdx, interestIdx, careerIdx]);

  const renderCourses = () => (
    <View>
      {/* Search */}
      <View style={styles.searchBar}>
        <MaterialIcons name="search" size={20} color="#888" style={{ marginRight: 8 }} />
        <Text style={styles.searchText}>Search Courses</Text>
      </View>
      {/* Filters */}
      <View style={styles.filtersRow}>
        <Pill
          label={`Stream: ${streamOptions[streamIdx]}`}
          active={streamIdx !== 0}
          onPress={() => setStreamIdx((streamIdx + 1) % streamOptions.length)}
        />
        <Pill
          label={`Interest: ${interestOptions[interestIdx]}`}
          active={interestIdx !== 0}
          onPress={() => setInterestIdx((interestIdx + 1) % interestOptions.length)}
        />
        <Pill
          label={`Career: ${careerOptions[careerIdx]}`}
          active={careerIdx !== 0}
          onPress={() => setCareerIdx((careerIdx + 1) % careerOptions.length)}
        />
      </View>
      {filteredCourses.map(c => <CourseCard key={c.id} c={c} />)}
      {/* Featured */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Suggested for You (based on quiz)</Text>
        <View style={styles.spotlightCard}>
          <MaterialCommunityIcons name="account-cash" size={24} color="#FFFFFF" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.spotlightText}>B.Com → Accountancy, Banking</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const filteredColleges = useMemo(() => {
    const district = districtOptions[districtIdx];
    const course = courseOptions[courseIdx];
    const facility = facilityOptions[facilityIdx];
    return collegesData.filter(col => {
      if (district !== 'All' && !col.address?.toLowerCase().includes(district.toLowerCase())) return false;
      if (course !== 'All' && !(col.courses || []).includes(course)) return false;
      if (facility !== 'All' && !(col.facilities || []).includes(facility)) return false;
      return true;
    });
  }, [districtIdx, courseIdx, facilityIdx]);

  const renderColleges = () => (
    <View>
      {/* Colleges Search */}
      <View style={styles.searchBar}>
        <MaterialIcons name="search" size={20} color="#888" style={{ marginRight: 8 }} />
        <Text style={styles.searchText}>Search Colleges</Text>
      </View>
      {/* Filters */}
      <View style={styles.filtersRow}>
        <Pill
          label={`District: ${districtOptions[districtIdx]}`}
          active={districtIdx !== 0}
          onPress={() => setDistrictIdx((districtIdx + 1) % districtOptions.length)}
        />
        <Pill
          label={`Course: ${courseOptions[courseIdx]}`}
          active={courseIdx !== 0}
          onPress={() => setCourseIdx((courseIdx + 1) % courseOptions.length)}
        />
        <Pill
          label={`Facilities: ${facilityOptions[facilityIdx]}`}
          active={facilityIdx !== 0}
          onPress={() => setFacilityIdx((facilityIdx + 1) % facilityOptions.length)}
        />
      </View>
      {filteredColleges.map(col => <CollegeCard key={col.id} col={col} />)}
      {/* Featured */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Students from Your District</Text>
        <View style={styles.listCard}>
          <View style={styles.listItem}>
            <MaterialCommunityIcons name="map-marker" size={18} color={NAVY} />
            <Text style={styles.listText}>Govt. Commerce College, Nashik</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderCourseDetail = () => (
    <View>
      <TouchableOpacity style={styles.backRow} onPress={() => setScreen('courses')}>
        <MaterialIcons name="arrow-back-ios" size={18} color={NAVY} />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.detailTitle}>{selectedCourse?.name}</Text>
      <Text style={styles.detailLine}>Stream: {selectedCourse?.stream}</Text>
      <Text style={styles.detailLine}>Eligibility: {selectedCourse?.eligibility}</Text>
      <Text style={styles.detailSubTitle}>Career Paths</Text>
      {selectedCourse?.careers.map((c: string, i: number) => (<Text key={i} style={styles.bullet}>• {c}</Text>))}
      <Text style={styles.detailSubTitle}>Higher Studies Options</Text>
      {selectedCourse?.higherStudies.map((h: string, i: number) => (<Text key={i} style={styles.bullet}>• {h}</Text>))}
      <Text style={styles.detailSubTitle}>Scholarships Available</Text>
      {selectedCourse?.scholarships.map((s: string, i: number) => (<Text key={i} style={styles.bullet}>• {s}</Text>))}
      <Text style={styles.detailSubTitle}>Skill Courses & Resources</Text>
      {selectedCourse?.resources.map((r: string, i: number) => (<Text key={i} style={styles.bullet}>• {r}</Text>))}
      <Text style={styles.detailSubTitle}>Nearby Colleges Offering Course</Text>
      {selectedCourse?.nearbyColleges.map((n: string, i: number) => (<Text key={i} style={styles.bullet}>• {n}</Text>))}
      <View style={[styles.cardActions, { marginTop: 16 }]}>
        <ActionButton label="Add to My Plan" onPress={() => addToPlan('course', selectedCourse)} />
        <ActionButton label="Compare" onPress={() => addToCompare('course', selectedCourse)} />
      </View>
    </View>
  );

  const renderCollegeDetail = () => (
    <View>
      <TouchableOpacity style={styles.backRow} onPress={() => setScreen('colleges')}>
        <MaterialIcons name="arrow-back-ios" size={18} color={NAVY} />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.detailTitle}>{selectedCollege?.name}</Text>
      <Text style={styles.detailLine}>Address: {selectedCollege?.address}</Text>
      <Text style={styles.detailLine}>Distance: {selectedCollege?.distance}</Text>
      <Text style={styles.detailSubTitle}>Courses Offered</Text>
      {selectedCollege?.courses.map((c: string, i: number) => (<Text key={i} style={styles.bullet}>• {c}</Text>))}
      <Text style={styles.detailSubTitle}>Eligibility / Cut-offs</Text>
      <Text style={styles.bullet}>• General cut-off: {selectedCollege?.cutoff}</Text>
      <Text style={styles.detailSubTitle}>Facilities</Text>
      {selectedCollege?.facilities.map((f: string, i: number) => (<Text key={i} style={styles.bullet}>• {f}</Text>))}
      <Text style={styles.detailSubTitle}>Nearby Scholarships</Text>
      <Text style={styles.bullet}>• Govt Merit Scholarship</Text>
      <View style={[styles.cardActions, { marginTop: 16 }]}>
        <ActionButton label="Apply Now" onPress={() => Alert.alert('Apply', 'Application flow coming soon.')} />
        <ActionButton label="Save to My Plan" onPress={() => addToPlan('college', selectedCollege)} />
      </View>
    </View>
  );

  const renderCompare = () => (
    <View>
      <TouchableOpacity style={styles.backRow} onPress={() => setScreen('courses')}>
        <MaterialIcons name="arrow-back-ios" size={18} color={NAVY} />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.detailTitle}>Compare</Text>
      <View style={styles.compareRow}>
        {compareList.slice(0,2).map(({type, item}) => (
          <View key={item.id} style={styles.compareCol}>
            <Text style={styles.compareTitle}>{item.name}</Text>
            {type === 'course' ? (
              <>
                <Text style={styles.compareLine}>Stream: {item.stream}</Text>
                <Text style={styles.compareLine}>Duration: {item.duration}</Text>
                <Text style={styles.compareLine}>Careers: {item.careers.join(', ')}</Text>
              </>
            ) : (
              <>
                <Text style={styles.compareLine}>Courses: {item.courses.join(', ')}</Text>
                <Text style={styles.compareLine}>Cut-off: {item.cutoff}</Text>
                <Text style={styles.compareLine}>Facilities: {item.facilities.join(', ')}</Text>
              </>
            )}
            <TouchableOpacity onPress={() => removeFromCompare(item.id)}>
              <Text style={styles.removeLink}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      {compareList.length < 2 && (
        <Text style={styles.compareHint}>Add at least two items to compare.</Text>
      )}
    </View>
  );

  const effectiveDistrict = useMemo(() => (districtIdx === 0 ? 'Jammu' : districtOptions[districtIdx]), [districtIdx]);
  const getAlumniFor = (collegeId?: string) => (collegeId ? (alumniData[collegeId]?.[effectiveDistrict] || []) : []);

  const renderAlumniList = () => (
    <View>
      <TouchableOpacity style={styles.backRow} onPress={() => setScreen('colleges')}>
        <MaterialIcons name="arrow-back-ios" size={18} color={NAVY} />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.detailTitle}>Alumni from {effectiveDistrict}</Text>
      {getAlumniFor(selectedCollege?.id).length === 0 ? (
        <Text style={styles.detailLine}>No alumni data yet for this district. Try changing the district filter.</Text>
      ) : (
        getAlumniFor(selectedCollege?.id).map((al: any) => (
          <View key={al.id} style={styles.alumniCard}>
            <View style={styles.alumniLeft}>
              <View style={styles.avatar}><Text style={styles.avatarText}>{al.name.split(' ').map((p: string)=>p[0]).slice(0,2).join('').toUpperCase()}</Text></View>
              <View>
                <Text style={styles.alumniName}>{al.name} · Class of {al.year}</Text>
                <Text style={styles.alumniMeta}>{al.currentRole} at {al.employer}</Text>
              </View>
            </View>
            <ActionButton label="View Profile" onPress={() => { setSelectedAlumni(al); setScreen('alumniProfile'); }} />
          </View>
        ))
      )}
    </View>
  );

  const renderAlumniProfile = () => (
    <View>
      <TouchableOpacity style={styles.backRow} onPress={() => setScreen('alumniList')}>
        <MaterialIcons name="arrow-back-ios" size={18} color={NAVY} />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.alumniProfileHeader}>
        <View style={styles.avatarLg}><Text style={styles.avatarTextLg}>{selectedAlumni?.name.split(' ').map((p: string)=>p[0]).slice(0,2).join('').toUpperCase()}</Text></View>
        <Text style={styles.alumniNameLg}>{selectedAlumni?.name}</Text>
        <Text style={styles.alumniMeta}>{selectedAlumni?.currentRole} at {selectedAlumni?.employer}</Text>
        <Text style={styles.alumniMeta}>Alumnus of {selectedCollege?.name} · Class of {selectedAlumni?.year}</Text>
      </View>
      <View style={[styles.cardActions, { marginTop: 12 }]}>
        <ActionButton label="Message" onPress={() => Alert.alert('Message', 'Messaging coming soon.')} />
        <ActionButton label="LinkedIn" onPress={() => Linking.openURL(selectedAlumni?.linkedin)} />
        <ActionButton label="X" onPress={() => Linking.openURL(selectedAlumni?.x)} />
      </View>
    </View>
  );

  const renderMap = () => (
    <View>
      <TouchableOpacity style={styles.backRow} onPress={() => setScreen('colleges')}>
        <MaterialIcons name="arrow-back-ios" size={18} color={NAVY} />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.detailTitle}>Map Preview</Text>
      <View style={styles.mapBox}>
        <MaterialCommunityIcons name="map-marker" size={42} color={NAVY} />
        <Text style={styles.mapText}>{selectedCollege?.name}</Text>
        <Text style={styles.mapSub}>{selectedCollege?.address}</Text>
        <Text style={styles.mapSub}>Distance: {selectedCollege?.distance}</Text>
      </View>
    </View>
  );

  const isCourses = screen === 'courses' || screen === 'courseDetail' || screen === 'compare';

  return (
    <View style={styles.container}>
      <View style={[styles.headerBlock, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {onBack && (
            <TouchableOpacity style={[styles.backRow, { marginBottom: 0, marginRight: 8 }]} onPress={onBack}>
              <MaterialIcons name="arrow-back-ios" size={18} color={NAVY} />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.pageTitle}>Explore Courses & Colleges</Text>
        </View>
        {onOpenProfile && (
          <TouchableOpacity onPress={onOpenProfile} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <MaterialIcons name="account-circle" size={24} color={NAVY} />
          </TouchableOpacity>
        )}
      </View>

      {/* Toggle */}
      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[styles.toggleBtn, isCourses && screen === 'courses' && styles.toggleBtnActive]}
          onPress={() => setScreen('courses')}
        >
          <Text style={[styles.toggleText, isCourses && screen === 'courses' && styles.toggleTextActive]}>Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, !isCourses && screen === 'colleges' && styles.toggleBtnActive]}
          onPress={() => setScreen('colleges')}
        >
          <Text style={[styles.toggleText, !isCourses && screen === 'colleges' && styles.toggleTextActive]}>Colleges</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {screen === 'courses' && renderCourses()}
        {screen === 'colleges' && renderColleges()}
        {screen === 'courseDetail' && renderCourseDetail()}
        {screen === 'collegeDetail' && renderCollegeDetail()}
        {screen === 'compare' && renderCompare()}
        {screen === 'alumniList' && renderAlumniList()}
        {screen === 'alumniProfile' && renderAlumniProfile()}
        {screen === 'map' && renderMap()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  headerBlock: {
    marginTop: 16,
    marginBottom: 8,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: NAVY,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleBtnActive: {
    backgroundColor: NAVY,
    borderWidth: 1,
    borderColor: NAVY_DARK,
  },
  toggleText: {
    color: NAVY,
    fontWeight: '700',
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 10,
  },
  searchText: {
    flex: 1,
    fontSize: 14,
    color: '#888',
  },
  filtersRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  pill: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  pillActive: {
    backgroundColor: NAVY,
    borderColor: NAVY_DARK,
  },
  pillText: {
    color: NAVY,
    fontWeight: '600',
  },
  pillTextActive: {
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#D6DEE8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: NAVY,
    marginBottom: 6,
  },
  cardLine: {
    color: '#374151',
    marginBottom: 2,
  },
  cardActions: {
    flexDirection: 'row',
    marginTop: 10,
  },
  actionBtn: {
    backgroundColor: NAVY,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  section: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: NAVY,
    marginBottom: 8,
  },
  spotlightCard: {
    backgroundColor: NAVY,
    padding: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  spotlightText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  listCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#D6DEE8',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listText: {
    marginLeft: 8,
    color: '#111827',
  },
  mapBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    alignItems: 'center',
  },
  mapText: {
    marginTop: 8,
    color: NAVY,
    fontWeight: '700',
  },
  mapSub: {
    color: '#374151',
    marginTop: 2,
  },
  alumniCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 12,
    marginBottom: 8,
  },
  alumniLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: NAVY,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  alumniName: {
    color: NAVY,
    fontWeight: '700',
    flexShrink: 1,
  },
  alumniMeta: {
    color: '#374151',
    marginTop: 2,
    flexShrink: 1,
  },
  alumniProfileHeader: {
    alignItems: 'center',
  },
  avatarLg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: NAVY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTextLg: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 18,
  },
  alumniNameLg: {
    color: NAVY,
    fontWeight: '800',
    marginTop: 8,
    fontSize: 16,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  backText: {
    color: NAVY,
    fontWeight: '700',
    marginLeft: 2,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: NAVY,
    marginBottom: 8,
  },
  detailSubTitle: {
    marginTop: 10,
    marginBottom: 4,
    color: NAVY,
    fontWeight: '700',
  },
  detailLine: {
    color: '#374151',
    marginBottom: 2,
  },
  bullet: {
    color: '#374151',
    marginLeft: 6,
    marginBottom: 2,
  },
  compareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  compareCol: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    marginRight: 6,
  },
  compareTitle: {
    color: NAVY,
    fontWeight: '700',
    marginBottom: 6,
  },
  compareLine: {
    color: '#374151',
    marginBottom: 3,
  },
  removeLink: {
    marginTop: 6,
    color: NAVY,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  compareHint: {
    marginTop: 8,
    color: '#6B7280',
  },
});

export default CoursesCollegesScreen;

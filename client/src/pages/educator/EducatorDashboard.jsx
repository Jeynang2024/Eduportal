import React, { useState,useEffect } from 'react';
import { Users, BookOpen, TrendingUp, Award, Calendar, MapPin, Star, Activity, Brain, Heart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area } from 'recharts';
import { getSessions, getStudents ,fetchSessionPerformance } from '../../services/educatorService';
// Helper to compute age from DateOfBirth string
const COLORS = ['#8B5CF6','#06B6D4','#10B981','#F59E0B','#EF4444'];

const calcAge = dobString => {
  const dob = new Date(dobString);
  const diff = Date.now() - dob.getTime();
  return new Date(diff).getUTCFullYear() - 1970;
};

const getAgeRange = age => {
  if (age <= 12) return '10-12';
  if (age <= 14) return '13-14';
  if (age <= 16) return '15-16';
  if (age <= 18) return '17-18';
  return '18+';
};

const computeAgeRangeStats = students => {
  const total = students.length;
  const counts = { '10-12': 0, '13-14': 0, '15-16': 0, '17-18': 0, '18+': 0 };

  for (const s of students) {
    const age = calcAge(s.DateOfBirth);
    const range = getAgeRange(age);
    counts[range]++;
  }

  // Add percentages
  const stats = Object.entries(counts).map(([range, count]) => ({
    range,
    count,
    percentage: total > 0 ? (count / total) * 100 : 0
  }));

  return { total, stats };
};
const EducatorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sessionData, setSessionData] = useState([]);
  const [students ,setStudents]= useState([]);
const [ageStats, setAgeStats] = useState({ total: 0, stats: [] });
const [gradeDistribution, setGradeDistribution] = useState([]);
const [extracurricularData,setExtracurricularData]=useState([])
   const [averages, setAverages] = useState({
    avgLit: 0,
    avgBeh: 0,
    combined: 0,
  });
  const [OverallTrend,setOverallTrend]=useState([]);
  const [studentPerformance,setStudentPerformance]=useState([]);
  // Sample data based on schema
  /*const sessionData = [
    { title: "Mathematics Fundamentals", description: "Basic algebra and geometry", date: "2025-07-01", students: 24 },
    { title: "Creative Writing Workshop", description: "Story telling techniques", date: "2025-07-03", students: 18 },
    { title: "Science Exploration", description: "Physics experiments", date: "2025-07-05", students: 22 },
    { title: "History Deep Dive", description: "Ancient civilizations", date: "2025-07-08", students: 20 }
  ];*/
   useEffect(() => {
      getSessions().then(data => {
          console.log('🔄 getSessions returned:', data, Array.isArray(data))

       const sessions = Object.keys(data)
        .filter(key => !isNaN(key))
        .map(key => data[key]);

      setSessionData(sessions);
    
    });
    fetchSessionPerformance().then(data=>{
      console.log('🔄 Sessionwise data returned:', data, Array.isArray(data));
      const sessiondata= data.sessions?.map(s => ({
      name: s.sessionTitle,
     academic: s.academicStats.averageScore,
     behavioral: s.behaviorStats.averageScore,
}));
     const overallTrend=data.overallTrends
      
    
setOverallTrend(overallTrend);
setStudentPerformance(sessiondata);
    
    })

    getStudents().then(data => {
          console.log('🔄 get students returned:', data, Array.isArray(data))
           const Performance=Object.keys(data)
        .filter(key => !isNaN(key))
        .map(key => data[key]);
  const count = Performance.length;
  let totalLit = 0, totalBehav = 0;

  Performance.forEach(s => {
    totalLit += Number(s.literacyscore) || 0;
    totalBehav += Number(s.behavioralScore) || 0;
  });

  const avgLit = count ? totalLit / count : 0;
  const avgBeh = count ? totalBehav / count : 0;
  const combined = avgLit + avgBeh;

  console.log({ avgLit, avgBeh, combined });
      setAverages({ avgLit, avgBeh, combined });

   
  // Finally, update the state
  setStudents(Performance);
const statsObj = computeAgeRangeStats(Performance);
  setAgeStats(statsObj);
console.log(statsObj);



//grade 
const students = Object.values(data).filter(s => !isNaN(s.grade));

  // Group and count
  const countsByGrade = students.reduce((acc, s) => {
    const grade = s.grade;
    acc[grade] = (acc[grade] || 0) + 1;
    return acc;
  }, {});

  // Build array
  const gradeDistribution = Object.entries(countsByGrade)
    .map(([grade, count], idx) => ({
      grade,
      count,
      color: COLORS[idx % COLORS.length] // assign colors cyclically
    }));
  
  setGradeDistribution(gradeDistribution);


//extracuriular activities

 const students_of_activities = Object.values(data).filter(s => Array.isArray(s.extracurricularActivities));

  // Count activities
  const counts = students_of_activities.reduce((acc, s) => {
    s.extracurricularActivities.forEach(act => {
      acc[act] = (acc[act] || 0) + 1;
    });
    return acc;
  }, {});

  const extracurricularData = Object.entries(counts).map(([activity, count], i) => ({
    activity,
    count,
    color: COLORS[i % COLORS.length]
  }));

  setExtracurricularData(extracurricularData);



    });
    
  }, []);
 



 /*const subjectMastery = [
    { subject: 'Math', mastery: 88, students: 45 },
    { subject: 'Science', mastery: 92, students: 38 },
    { subject: 'English', mastery: 85, students: 42 },
    { subject: 'History', mastery: 78, students: 35 },
    { subject: 'Geography', mastery: 82, students: 28 }
  ];

  const behaviorMetrics = [
    { aspect: 'Discipline', value: 88 },
    { aspect: 'Participation', value: 92 },
    { aspect: 'Teamwork', value: 85 },
    { aspect: 'Leadership', value: 78 },
    { aspect: 'Creativity', value: 90 },
    { aspect: 'Responsibility', value: 86 }
  ];
*/
  

  const StatCard = ({ icon: Icon, title, value, subtitle, color, trend }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        {trend && (
          <div className="flex items-center text-green-600 text-sm font-medium">
            <TrendingUp className="h-4 w-4 mr-1" />
            +{trend}%
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <p className="text-sm text-gray-600 mt-1">{title}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Educator Dashboard</h1>
          <p className="text-gray-600">Empowering students through data-driven insights</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm">
          {['overview', 'sessions', 'students', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={Users}
                title="Total Students"
                value={students.length}
                subtitle="Across 5 grades"
                color="bg-gradient-to-r from-blue-500 to-blue-600"
                trend="12"
              />
              <StatCard
                icon={BookOpen}
                title="Active Sessions"
                value={sessionData.length}
                subtitle="Recent"
                color="bg-gradient-to-r from-green-500 to-green-600"
                trend="8"
              />
              <StatCard
                icon={Award}
                title="Avg Performance"
                value={(averages.combined/10).toFixed(2)}
                subtitle="Overall score"
                color="bg-gradient-to-r from-purple-500 to-purple-600"
                trend="5"
              />
              <StatCard
                icon={Activity}
                title="Engagement Rate"
                value="94%"
                subtitle="Student participation"
                color="bg-gradient-to-r from-orange-500 to-orange-600"
                trend="3"
              />
            </div>

            {/* Performance Trends */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                  Student Performance Trends
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={studentPerformance}>
                    <defs>
                      <linearGradient id="colorLiteracy" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorBehavioral" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="academic" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorLiteracy)" />
                    <Area type="monotone" dataKey="behavioral" stroke="#06B6D4" fillOpacity={1} fill="url(#colorBehavioral)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-green-600" />
                  Grade Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={gradeDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="count"
                    >
                      {gradeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-2 mt-4">
                  {gradeDistribution.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2`} style={{backgroundColor: item.color}}></div>
                      <span className="text-sm text-gray-600">{item.grade}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Subject Mastery & Behavioral Analysis 
            <div className="hidden grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-purple-600" />
                  Subject Mastery
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={subjectMastery} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="subject" type="category" />
                    <Tooltip />
                    <Bar dataKey="mastery" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-pink-600" />
                  Behavioral Analysis
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={behaviorMetrics}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="aspect" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Score"
                      dataKey="value"
                      stroke="#EC4899"
                      fill="#EC4899"
                      fillOpacity={0.3}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>*/}
          </div>
        )}

        {activeTab === 'sessions' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessionData.map((session, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-500">{session.students} students</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{session.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{session.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(session.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Extracurricular Participation</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={extracurricularData} margin={{ top: 10, right: 20, left: 20, bottom: 30 }} >

                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="activity" 
              interval={0}           // Show every label
          tick={{ angle: -15, dy: 5 }}/>
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Demographics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{averages.combined.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Combined Average Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{averages.avgLit.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Average Literacy Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{averages.avgBeh.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Average Behavioral Score</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Age Distribution</h3>
                <div className="space-y-4">
                  {ageStats.stats.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-24 text-sm text-gray-600">{item.range}</div>
                      <div className="flex-1 mx-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-900">{item.count}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Distribution</h3>
                <div className="space-y-3">
                  {[
                    { region: 'Mumbai', count: 78, color: 'bg-blue-500' },
                    { region: 'Pune', count: 45, color: 'bg-green-500' },
                    { region: 'Nashik', count: 32, color: 'bg-purple-500' },
                    { region: 'Nagpur', count: 28, color: 'bg-orange-500' },
                    { region: 'Others', count: 5, color: 'bg-gray-500' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${item.color} mr-3`}></div>
                        <span className="text-sm text-gray-700">{item.region}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Comprehensive Analytics</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={studentPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="academic" stroke="#8B5CF6" strokeWidth={3} />
                  <Line type="monotone" dataKey="behavioral" stroke="#06B6D4" strokeWidth={3} />
                  <Line type="monotone" dataKey="overall" stroke="#10B981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Trend</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Academic Progress</span>
                    <span className="font-semibold">{OverallTrend.academicProgress}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Behavior Progress</span>
                    <span className="font-semibold">{OverallTrend.behaviorProgress}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Academic Trend</span>
                    <span className="font-semibold text-green-600">{OverallTrend.academicTrend}</span>
                  </div>
                </div>
              </div>

              <div className="hidden bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Linguistic Diversity</h3>
                <div className="space-y-3">
                  {[
                    { language: 'Marathi', percentage: 45 },
                    { language: 'Hindi', percentage: 30 },
                    { language: 'English', percentage: 15 },
                    { language: 'Gujarati', percentage: 10 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-20 text-sm text-gray-600">{item.language}</div>
                      <div className="flex-1 mx-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-sm font-medium">{item.percentage}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducatorDashboard;
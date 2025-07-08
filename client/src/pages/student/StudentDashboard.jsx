import React, { useEffect, useState } from "react";
import { getStudentData ,getstudentsAchievements,getStudentBehaviouralData} from "../../services/studentService";
const COLORS =["#8B5CF6","#06B6D4","#10B981","#F59E0B","#EF4444"]
const BEHAVIOR_COLORS = ["#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#EF4444"];

import {
  User,
  BookOpen,
  TrendingUp,
  Award,
  Calendar,
  Heart,
  Star,
  Target,
  Activity,
  Brain,
  Trophy,
  Clock,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
} from "recharts";
import { getStudentProfile ,getStudentPerformance} from "../../services/studentService";
import { getUserFromToken } from "../../utils";
import Cookies from "js-cookie";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const accessToken =  localStorage.getItem("token");

  const user = getUserFromToken(accessToken);
  const userId = user?.id;
  const [profile, setProfile] = useState(null);
  const [AcademicData,setAcademicData]=useState([]);
  const [BehavioralData,setBehaviouralData]=useState([]);
  const [OverallTrend,setOverallTrend]=useState([]);
  const [studentPerformance,setStudentPerformance]=useState([]);
  const [achievements,setachievementsdata]=useState([]);
   
  useEffect(() => {
    if (userId) {
      getStudentProfile(userId).then(setProfile);
    }

    getStudentData().then(data=>{
      setAcademicData(data[0]);
      //console.log("student data",data[0])
    })

    getStudentBehaviouralData().then(data=>{
      setBehaviouralData(data[0]);
      //console.log("student data",data[0])

    })

   getstudentsAchievements().then(data=>{
   // console.log('Achievements state:', achievements);
//console.log('Is array?', Array.isArray(achievements));
      console.log("achievement data",data[0])
      const achieve= data[0].criteria?.map(s => ({
      title: s.title,
      category:s.category,
      
}));

    setachievementsdata(achieve);

   })

    getStudentPerformance().then(data=>{
//console.log('🔄 Sessionwise data returned:', data, Array.isArray(data));
      const sessiondata= data.sessions?.map(s => ({
      name: s.sessionTitle,
      subjectAvg:s.academicStats.subjectAverages,
     academic: s.academicStats.averageScore,
     behavioral: s.behaviorStats.averageScore,
}));


     const overallTrend=data.overallTrends
      
    
setOverallTrend(overallTrend);
setStudentPerformance(sessiondata);
    })



  }, [userId]);
  

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg text-[#004d7a]">Loading...</div>
      </div>
    );
  }

  // Sample student data based on schema
  const studentProfile = {
    name: profile.name || "Arjun Sharma",
    student_id: "507f1f77bcf86cd799439011",
    grade: profile.grade || "8",
    DateOfBirth: profile.DateOfBirth || "2010-03-15",
    parentsInformation: {
      fatherName: profile.parentsInformation?.fatherName || "Rajesh Sharma",
      motherName: profile.parentsInformation?.motherName || "Priya Sharma",
      contactNumber:
        profile.parentsInformation?.contactNumber || "+91-9876543210",
    },
    address: {
      street: profile.address?.street || "123 MG Road",
      city: profile.address?.city || "Mumbai",
      state: profile.address?.state || "Maharashtra",
      zipCode: profile.address?.zipCode || "400001",
    },
    caste: profile.caste || "General",
    religion: profile.religion || "Hindu",
    mothertoungue: profile.mothertoungue || "Hindi",
    literacyscore: profile.literacyscore || 88,
    behavioralScore: profile.behavioralScore/10 || 85,
    extracurricularActivities: profile.extracurricularActivities || [
      "Football",
      "Music",
      "Debate",
    ],
    bloodgroup: profile.bloodgroup || "O+",
    height: profile.height || 152,
    weight: profile.weight || 45,
  };

  const academicProgress = [
    {
      month: "Jan",
      math: 78,
      science: 85,
      english: 80,
      history: 75,
      geography: 82,
    },
    {
      month: "Feb",
      math: 82,
      science: 88,
      english: 83,
      history: 78,
      geography: 85,
    },
    {
      month: "Mar",
      math: 85,
      science: 90,
      english: 86,
      history: 80,
      geography: 87,
    },
    {
      month: "Apr",
      math: 88,
      science: 92,
      english: 88,
      history: 83,
      geography: 89,
    },
    {
      month: "May",
      math: 90,
      science: 94,
      english: 90,
      history: 85,
      geography: 91,
    },
    {
      month: "Jun",
      math: 92,
      science: 96,
      english: 92,
      history: 88,
      geography: 93,
    },
  ];

  /*const currentMarks = [
    { subject: "Mathematics", marks: 92, total: 100, color: "#8B5CF6" },
    { subject: "Science", marks: 96, total: 100, color: "#06B6D4" },
    { subject: "English", marks: 92, total: 100, color: "#10B981" },
    { subject: "History", marks: 88, total: 100, color: "#F59E0B" },
    { subject: "Geography", marks: 93, total: 100, color: "#EF4444" },
  ];*/
  const currentMarks = AcademicData?.subjects?.map((sub,number) => ({
  subject: sub.subjectName,
  marks: sub.marks,
  total: 100,
  color: COLORS[number % COLORS.length]  // wrong
})) || [];

//BehavioralData
const behaviorScores = BehavioralData?.criteria?.map((sub,number) => ({
  criteria: sub.Name,
  score: sub.score,
   // wrong
})) || [];
const sortedBehavior = [...behaviorScores].sort((a, b) => b.score - a.score);
const topBehaviors = sortedBehavior.slice(0, 3);

const topBehaviorsWithColors = topBehaviors.map((item, idx) => ({
  ...item,
  color: BEHAVIOR_COLORS[idx % BEHAVIOR_COLORS.length],
}));

  /*const behaviorScores = [
    { criteria: "Discipline", score: 90 },
    { criteria: "Participation", score: 72 },
    { criteria: "Teamwork", score: 92 },
    { criteria: "Leadership", score: 64 },
    { criteria: "Creativity", score: 94 },
    { criteria: "Responsibility", score: 87 },
  ];*/

  /*const upcomingSessions = [
    {
      title: "Advanced Physics",
      date: "2025-07-01",
      time: "10:00 AM",
      educator: "Dr. Patel",
    },
    {
      title: "Creative Writing",
      date: "2025-07-03",
      time: "2:00 PM",
      educator: "Ms. Kumar",
    },
    {
      title: "Mathematics Olympiad Prep",
      date: "2025-07-05",
      time: "9:00 AM",
      educator: "Mr. Singh",
    },
  ];*/
/*
  const achievements = [
    { title: "Science Excellence", date: "May 2025", type: "Academic" },
    { title: "Best Team Player", date: "April 2025", type: "Behavioral" },
    {
      title: "Creative Writing Contest",
      date: "March 2025",
      type: "Competition",
    },
  ];*/

  const PersonalCard = ({ icon: Icon, title, value, subtitle, gradient }) => (
    <div
      className={`rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 ${gradient}`}
    >
      <div className="flex items-center justify-between">
        <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-bold">{value}</h3>
        <p className="text-white/90 mt-1">{title}</p>
        {subtitle && <p className="text-white/70 text-sm mt-1">{subtitle}</p>}
      </div>
    </div>
  );

  const ProgressRing = ({ percentage, color, size = 120 }) => {
    const radius = (size - 20) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = `${
      (percentage * circumference) / 100
    } ${circumference}`;

    return (
      <div className="relative flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">
            {percentage}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {studentProfile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {studentProfile.name.split(" ")[0]}!
              </h1>
              <p className="text-gray-600">
                Grade {studentProfile.grade} • {studentProfile.address.city},{" "}
                {studentProfile.address.state}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm">
          {["home", "academics", "behavior", "sessions"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === "home" && (
          <div className="space-y-8">
            {/* Personal Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <PersonalCard
                icon={BookOpen}
                title="Current Grade"
                value={studentProfile.grade}
                subtitle="Academic Year 2025"
                gradient="bg-gradient-to-br from-blue-500 to-blue-700"
              />
              <PersonalCard
                icon={TrendingUp}
                title="Literacy Score"
                value={`${studentProfile.literacyscore.toFixed(2)}%`}
                subtitle="Above average"
                gradient="bg-gradient-to-br from-green-500 to-green-700"
              />
              <PersonalCard
                icon={Heart}
                title="Behavior Score"
                value={`${studentProfile.behavioralScore.toFixed(2)}%`}
                subtitle="Excellent conduct"
                gradient="bg-gradient-to-br from-purple-500 to-purple-700"
              />
              <PersonalCard
                icon={Award}
                title="Achievements"
                value={achievements.length}
                subtitle="This semester"
                gradient="bg-gradient-to-br from-orange-500 to-orange-700"
              />
            </div>

            {/* Performance Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Target className="h-6 w-6 mr-2 text-green-600" />
                  Subject Performance
                {/* Display today's date */}
                <div className="ml-2 mt-0.5 text-right text-sm text-gray-500 font-medium">
                  {new Date().toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={studentPerformance}>
                    <defs>
                      <linearGradient
                        id="colorMath"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#8B5CF6"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8B5CF6"
                          stopOpacity={0.2}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorScience"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#06B6D4"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#06B6D4"
                          stopOpacity={0.2}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="academic"
                      stroke="#8B5CF6"
                      fillOpacity={1}
                      fill="url(#colorMath)"
                    />
                    <Area
                      type="monotone"
                      dataKey="behavioral"
                      stroke="#06B6D4"
                      fillOpacity={1}
                      fill="url(#colorScience)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Target className="h-6 w-6 mr-2 text-green-600" />
                  Subject Performance
                </h3>
                <div className="space-y-4">
                  {currentMarks.map((subject, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">
                          {subject.subjectName}
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          {subject.marks}/{subject.total}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${(subject.marks / subject.total) * 100}%`,
                            backgroundColor: subject.color,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                <ProgressRing
                  percentage={studentProfile.literacyscore.toFixed(2)}
                  color="#8B5CF6"
                />
                <h4 className="text-lg font-semibold text-gray-900 mt-4">
                  Literacy Score
                </h4>
                <p className="text-gray-600 text-sm">Overall Performance</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                <ProgressRing
                  percentage={studentProfile.behavioralScore.toFixed(2)}
                  color="#10B981"
                />
                <h4 className="text-lg font-semibold text-gray-900 mt-4">
                  Behavior Score
                </h4>
                <p className="text-gray-600 text-sm">Conduct Rating</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                <ProgressRing
                  percentage={Math.round(
                    currentMarks.reduce((acc, curr) => acc + curr.marks, 0) /
                      currentMarks.length
                  )}
                  color="#F59E0B"
                />
                <h4 className="text-lg font-semibold text-gray-900 mt-4">
                  Overall Average
                </h4>
                <p className="text-gray-600 text-sm">All Subjects</p>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Trophy className="h-6 w-6 mr-2 text-yellow-600" />
                Recent Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200"
                  >
                    <div className="flex items-center mb-2">
                      <Award className="h-5 w-5 text-yellow-600 mr-2" />
                      <span className="text-xs font-medium text-yellow-800 bg-yellow-200 px-2 py-1 rounded">
                        {achievement.category}
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900">
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-gray-600">{achievement.category}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "academics" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Academic Performance Trends
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={studentPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="subjectAvg.maths"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    name="Mathematics"
                  />
                  <Line
                    type="monotone"
                    dataKey="subjectAvg.physics"
                    stroke="#06B6D4"
                    strokeWidth={3}
                    name="Physics"
                  />
                  <Line
                    type="monotone"
                    dataKey="subjectAvg.chemistry"
                    stroke="#10B981"
                    strokeWidth={3}
                    name="Chemistry"
                  />
                 
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Subject Breakdown
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={currentMarks}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="marks" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Grade Insights
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800">
                       Academic Trend
                    </h4>
                    <p className="text-green-700">{OverallTrend.academicTrend}</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800">
                      Academic Progress
                    </h4>
                    <p className="text-blue-700">{OverallTrend.academicProgress}</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-800">
                      Behaviour Trend
                    </h4>
                    <p className="text-orange-700">
                      {OverallTrend.behaviorTrend}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "behavior" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Brain className="h-6 w-6 mr-2 text-purple-600" />
                Behavioral Assessment
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={behaviorScores}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="criteria" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#8B5CF6"
                    fill="#8B5CF6"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Extracurricular Activities
                </h3>
                <div className="space-y-3">
                  {studentProfile.extracurricularActivities.map(
                    (activity, index) => (
                      <div
                        key={index}
                        className="flex items-center p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg"
                      >
                        <Star className="h-5 w-5 text-yellow-500 mr-3" />
                        <span className="font-medium text-gray-900">
                          {activity}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Behavior Highlights
                </h3>
                <div className="space-y-3">
               {topBehaviorsWithColors.map((item, idx) => (
  <div
    key={idx}
    className="flex items-center justify-between p-3 rounded-lg"
    style={{ backgroundColor: item.color + "22" }}  // subtle bg tint
  >
    <span className="font-medium" style={{ color: item.color }}>
      {item.criteria}
    </span>
    <span className="font-bold" style={{ color: item.color }}>
      {item.score}%
    </span>
  </div>
))}

                  {/*<div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-green-700">Creativity</span>
                    <span className="font-bold text-green-800">94%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-700">Teamwork</span>
                    <span className="font-bold text-blue-800">92%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-purple-700">Discipline</span>
                    <span className="font-bold text-purple-800">90%</span>
                  </div>*/}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "sessions" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="h-6 w-6 mr-2 text-blue-600" />
                Sessions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {studentPerformance.map((session, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">
                        Upcoming
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {session.name}
                    </h4>
                    <div className="space-y-2 text-sm text-gray-600">
                       <div className="flex items-center">
                        {/* <Calendar className="h-4 w-4 mr-2" />
                        {new Date(session.date).toLocaleDateString()}*/}
                        <p>Academic Score:&nbsp;{session.academic}</p>

                      </div> 
                      <div className="flex items-center">
                        {/* <Calendar className="h-4 w-4 mr-2" />
                        {new Date(session.date).toLocaleDateString()}*/}
                        <p>Behavioural Score:&nbsp;{session.behavioral}</p>

                      </div> 
                      {/* <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {session.time}
                      </div> */}
                      {/* <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        {session.educator}
                      </div> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;

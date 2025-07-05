import express from "express";
import {
  User,
  Educator,
  Session,
  AcademicData,
  Behaviour,
} from "../schema/userSchema.js";
import Student from "../schema/studentSchema.js";

const router = express.Router();

router.post("/academic/data", async (req, res) => {
  const academicData = req.body;
  try {
    if (!Array.isArray(academicData)) {
      return res
        .status(400)
        .json({ error: "Invalid data format. Expected an array." });
    }

    //console.log("Received academic data:", academicData);
   const recentSession = await Session.findOne()
      .sort({ createdAt: -1 }) // Get the most recently created session
      .limit(1);

    if (!recentSession) {
      return res.status(404).json({ error: "No sessions found" });
    }
    for (const rowdata of academicData) {
      const { username, subjects } = rowdata;
      //console.log("Processing rowdata:", rowdata);
      if (!username || !Array.isArray(subjects)) {
        return res
          .status(400)
          .json({
            error: "Each entry must have a username and an array of subjects.",
          });
      }

      const user = await User.findOne({ username });
      const student = await Student.findOne({student_id: user._id});
      if (!student) {
        //console.log(`Student ${username} not found`); 
        return res.status(404).json({ error: `Student ${username} not found` });
      }

      // Calculate total marks and normalize to percentage (each subject out of 100)
      const totalMarks = subjects.reduce(
        (sum, subj) => sum + Number(subj.marks),
        0
      );
      const maxMarks = subjects.length * 100;
      const percentage = maxMarks > 0 ? (totalMarks / maxMarks) * 100 : 0;

      const newAcademic = new AcademicData({
        sessionId:recentSession._id,

        studentId: student._id,
        subjects,
        username,
      });
      await newAcademic.save();

      await Student.updateOne(
        { _id: student._id },
        { $set: { literacyscore: percentage } }
      );
    }

    return res
      .status(201)
      .json({ message: "Academic data added and students updated" });
  } catch (error) {
    console.error("Error during adding data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/behaviour/data", async (req, res) => {
  const totalData = req.body;
  try {
    if (!Array.isArray(totalData)) {
      return res
        .status(400)
        .json({ error: "Invalid data format. Expected an array." });
    }
    const recentSession = await Session.findOne()
      .sort({ createdAt: -1 }) // Get the most recently created session
      .limit(1);

    if (!recentSession) {
      return res.status(404).json({ error: "No sessions found" });
    }

    for (const rowdata of totalData) {
      const { username, criteria } = rowdata;
      if (!username || !Array.isArray(criteria)) {
        return res
          .status(400)
          .json({
            error: "Each entry must have a username and an array of subjects.",
          });
      }

      const user = await User.findOne({ username });
      const student = await Student.findOne({student_id: user._id});
      if (!student) {
        return res.status(404).json({ error: `Student ${username} not found` });
      }

      // Calculate total behavioural score and normalize to percentage (each criteria out of 10)
      const totalScore = criteria.reduce(
        (sum, crit) => sum + Number(crit.score),
        0
      );
      const maxScore = criteria.length * 10;
      const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

      const newBehaviour = new Behaviour({
        sessionId:recentSession._id,
        studentId: student._id,
        criteria,
        username,
      });
      await newBehaviour.save();

      await Student.updateOne(
        { _id: student._id },
        { $set: { behavioralScore: percentage } }
      );
    }

    return res
      .status(201)
      .json({ message: "Behavioural data added and students updated" });
  } catch (error) {
    console.error("Error during adding data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});




router.get("/session-performance", async (req, res) => {
  try {
    // 1. Get all sessions sorted from oldest to newest
    const sessions = await Session.find()
      .sort({ createdAt: 1 }) // 1 for ascending (oldest first)
      .lean();

    if (!sessions || sessions.length === 0) {
      return res.status(404).json({ error: "No sessions found" });
    }

    // 2. Process each session to get performance data
    const sessionPerformance = await Promise.all(
      sessions.map(async (session) => {
        // Get academic data for this session
        const academicRecords = await AcademicData.find({
          sessionId: session._id,
        }).lean();

        // Get behavioral data for this session
        const behaviorRecords = await Behaviour.find({
          sessionId: session._id,
        }).lean();

        // Calculate academic averages
        const academicStats = calculateAcademicAverages(academicRecords);

        // Calculate behavioral averages
        const behaviorStats = calculateBehavioralAverages(behaviorRecords);

        return {
          sessionId: session._id,
          sessionTitle: session.title,
          academicStats,
          behaviorStats,
          studentCount: academicRecords.length, // Number of students in this session
        };
      })
    );

    // 3. Calculate overall trends
    const overallTrends = calculateOverallTrends(sessionPerformance);
    console.log("sessons:",sessionPerformance)
    return res.status(200).json({
      sessions: sessionPerformance,
      overallTrends,
      totalSessions: sessions.length,
    });
  } catch (error) {
    console.error("Error fetching session performance:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Helper function to calculate academic averages
const calculateAcademicAverages = (academicRecords) => {
  if (!academicRecords || academicRecords.length === 0) {
    return {
      averageScore: 0,
      subjectAverages: {},
      totalStudents: 0,
    };
  }

  // Calculate overall average
  const totalScores = academicRecords.reduce((sum, record) => {
    return sum + record.subjects.reduce((subSum, subject) => subSum + subject.marks, 0);
  }, 0);

  const totalPossible = academicRecords.length * academicRecords[0].subjects.length * 100;
  const averageScore = totalPossible > 0 ? (totalScores / totalPossible) * 100 : 0;

  // Calculate subject-wise averages
  const subjectAverages = {};
  const subjectCounts = {};

  academicRecords.forEach((record) => {
    record.subjects.forEach((subject) => {
      if (!subjectAverages[subject.subjectName]) {
        subjectAverages[subject.subjectName] = 0;
        subjectCounts[subject.subjectName] = 0;
      }
      subjectAverages[subject.subjectName] += subject.marks;
      subjectCounts[subject.subjectName]++;
    });
  });

  for (const subject in subjectAverages) {
    subjectAverages[subject] = subjectAverages[subject] / subjectCounts[subject];
  }

  return {
    averageScore: parseFloat(averageScore.toFixed(2)),
    subjectAverages,
    totalStudents: academicRecords.length,
  };
};

// Helper function to calculate behavioral averages
const calculateBehavioralAverages = (behaviorRecords) => {
  if (!behaviorRecords || behaviorRecords.length === 0) {
    return {
      averageScore: 0,
      criteriaAverages: {},
      totalStudents: 0,
    };
  }

  // Calculate overall average
  const totalScores = behaviorRecords.reduce((sum, record) => {
    return sum + record.criteria.reduce((critSum, criterion) => critSum + criterion.score, 0);
  }, 0);

  const totalPossible = behaviorRecords.length * behaviorRecords[0].criteria.length * 10;
  const averageScore = totalPossible > 0 ? (totalScores / totalPossible) * 100 : 0;

  // Calculate criteria-wise averages
  const criteriaAverages = {};
  const criteriaCounts = {};

  behaviorRecords.forEach((record) => {
    record.criteria.forEach((criterion) => {
      if (!criteriaAverages[criterion.Name]) {
        criteriaAverages[criterion.Name] = 0;
        criteriaCounts[criterion.Name] = 0;
      }
      criteriaAverages[criterion.Name] += criterion.score;
      criteriaCounts[criterion.Name]++;
    });
  });

  for (const criterion in criteriaAverages) {
    criteriaAverages[criterion] = parseFloat(
      (criteriaAverages[criterion] / criteriaCounts[criterion]).toFixed(2)
    );
  }

  return {
    averageScore: parseFloat(averageScore.toFixed(2)),
    criteriaAverages,
    totalStudents: behaviorRecords.length,
  };
};

// Helper function to calculate overall trends
const calculateOverallTrends = (sessionPerformance) => {
  if (!sessionPerformance || sessionPerformance.length === 0) {
    return {
      academicTrend: "no data",
      behaviorTrend: "no data",
      academicProgress: 0,
      behaviorProgress: 0,
    };
  }

  // Calculate trends
  const academicScores = sessionPerformance.map((s) => s.academicStats.averageScore);
  const behaviorScores = sessionPerformance.map((s) => s.behaviorStats.averageScore);

  const academicProgress = sessionPerformance.length > 1
    ? academicScores[academicScores.length - 1] - academicScores[0]
    : 0;

  const behaviorProgress = sessionPerformance.length > 1
    ? behaviorScores[behaviorScores.length - 1] - behaviorScores[0]
    : 0;

  const getTrend = (scores) => {
    if (scores.length < 2) return "stable";
    const last = scores[scores.length - 1];
    const prev = scores[scores.length - 2];
    return last > prev ? "improving" : last < prev ? "declining" : "stable";
  };

  return {
    academicTrend: getTrend(academicScores),
    behaviorTrend: getTrend(behaviorScores),
    academicProgress: parseFloat(academicProgress.toFixed(2)),
    behaviorProgress: parseFloat(behaviorProgress.toFixed(2)),
    startingAcademicScore: academicScores[0],
    currentAcademicScore: academicScores[academicScores.length - 1],
    startingBehaviorScore: behaviorScores[0],
    currentBehaviorScore: behaviorScores[behaviorScores.length - 1],
  };
};



export default router;

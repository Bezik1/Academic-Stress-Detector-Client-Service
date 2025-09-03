import type { Session } from "../types/store/Session"

export const STRESS_LEVELS = ["Eustress", "Distress", "No Stress"]
export const SESSION_KEYS: (keyof Omit<Session, "id" | "stressLevel">)[] = [
    "headache",
    "sleepQuality",
    "breathingProblems",
    "noiseLevel",
    "livingConditions",
    "safety",
    "basicNeeds",
    "academicPerformance",
    "studyLoad",
    "teacherStudentRelationship",
    "futureCareerConcerns",
    "socialSupport",
    "peerPressure",
    "extracurricularActivities",
    "bullying",
]
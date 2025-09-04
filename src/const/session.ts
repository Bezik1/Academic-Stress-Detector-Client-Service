import type { Session } from "../types/Session"

export const STRESS_LEVELS = ["Enormous stress", "Distress", "No Stress"]
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
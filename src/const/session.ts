import type { Session } from "../types/Session"

export const STRESS_LEVELS = ["No Stress", "Distress", "Enormous stress"]
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

export const initialNewSessionState = {
    academicPerformance: 0,
    basicNeeds: 0,
    breathingProblems: 0,
    bullying: 0,
    extracurricularActivities: 0,
    futureCareerConcerns: 0,
    headache: 0,
    livingConditions: 0,
    noiseLevel: 0,
    peerPressure: 0,
    safety: 0,
    sleepQuality: 0,
    socialSupport: 0,
    stressLevel: 0,
    studyLoad: 0,
    teacherStudentRelationship: 0,
}
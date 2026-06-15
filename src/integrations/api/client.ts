// API client — uses Supabase (works on Vercel + local without Express)
import { db } from '@/integrations/supabase/db';
import { adminDb } from '@/integrations/supabase/adminDb';
import {
  buildContactEmailPayload,
  buildEnrollmentEmailPayload,
  buildSignupEmailPayload,
  notifyByEmail,
  type EmailType,
} from '@/lib/email';
import type { ContactLeadStatus, SubmissionStatus } from '@/lib/adminTypes';

class ApiClient {
  async healthCheck() {
    return { status: 'OK', message: 'Supabase connected' };
  }

  async createUser(userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    username?: string;
    passwordHash?: string;
    interestedSubject?: string;
  }) {
    return db.createUser(userData);
  }

  async getUserByEmail(email: string) {
    return db.getUserByEmail(email);
  }

  async getAllCourses() {
    return db.getAllCourses();
  }

  async getCourseRegionalPrices(params: { courseCode?: string; courseId?: string }) {
    return db.getCourseRegionalPrices(params);
  }

  async getAllInstructors() {
    return db.getAllInstructors();
  }

  async createEnrollment(enrollmentData: {
    userId?: string;
    courseId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    education?: string;
    field?: string;
    employmentStatus?: string;
    programmingExperience?: string;
    goals?: string;
    linkedin?: string;
    github?: string;
    paymentPlan?: string;
    paymentMethod?: string;
    totalAmount?: number;
    status?: string;
    courseName?: string;
    skipEmail?: boolean;
  }) {
    const { courseName, skipEmail, ...dbData } = enrollmentData;
    const enrollment = await db.createEnrollment(dbData);

    if (!skipEmail && enrollmentData.email) {
      notifyByEmail(buildEnrollmentEmailPayload({ ...enrollmentData, courseName }));
    }

    return enrollment;
  }

  async createContact(
    contactData: {
      firstName: string;
      lastName: string;
      email: string;
      phone?: string;
      subject?: string;
      message: string;
    },
    options?: { emailType?: EmailType },
  ) {
    const contact = await db.createContact(contactData);

    notifyByEmail(
      buildContactEmailPayload({
        ...contactData,
        type: options?.emailType || 'contact',
      }),
    );

    return contact;
  }

  async getAdminUsers() {
    return db.getAdminUsers();
  }

  async getAdminEnrollments() {
    return db.getAdminEnrollments();
  }

  async getUserCourses(userId: string) {
    return db.getUserCourses(userId);
  }

  async signIn(email: string, password: string) {
    return db.signIn(email, password);
  }

  async signUp(params: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    interestedSubject: string;
  }) {
    const result = await db.signUp(params);
    notifyByEmail(buildSignupEmailPayload(params));
    return result;
  }

  async signOut() {
    return db.signOut();
  }

  async resetPassword(email: string) {
    return db.resetPassword(email);
  }

  // Admin Phase 1
  getAdminDashboardStats = () => adminDb.getDashboardStats();
  getAdminLearners = () => adminDb.getLearners();
  updateAdminLearner = (id: string, updates: Parameters<typeof adminDb.updateLearner>[1]) =>
    adminDb.updateLearner(id, updates);
  assignProgramToLearner = (userId: string, courseId: string, status?: string) =>
    adminDb.assignProgramToLearner(userId, courseId, status);
  getAdminPrograms = () => adminDb.getPrograms();
  createAdminProgram = (program: Parameters<typeof adminDb.createProgram>[0]) =>
    adminDb.createProgram(program);
  updateAdminProgram = (id: string, updates: Parameters<typeof adminDb.updateProgram>[1]) =>
    adminDb.updateProgram(id, updates);
  deleteAdminProgram = (id: string) => adminDb.deleteProgram(id);
  getAdminSessions = () => adminDb.getSessions();
  createAdminSession = (session: Parameters<typeof adminDb.createSession>[0]) =>
    adminDb.createSession(session);
  updateAdminSession = (id: string, updates: Parameters<typeof adminDb.updateSession>[1]) =>
    adminDb.updateSession(id, updates);
  deleteAdminSession = (id: string) => adminDb.deleteSession(id);
  getAdminAssignments = () => adminDb.getAssignments();
  createAdminAssignment = (assignment: Parameters<typeof adminDb.createAssignment>[0]) =>
    adminDb.createAssignment(assignment);
  updateAdminAssignment = (id: string, updates: Parameters<typeof adminDb.updateAssignment>[1]) =>
    adminDb.updateAssignment(id, updates);
  deleteAdminAssignment = (id: string) => adminDb.deleteAssignment(id);
  getAdminSubmissions = () => adminDb.getSubmissions();
  updateAdminSubmissionStatus = (id: string, status: SubmissionStatus, notes?: string) =>
    adminDb.updateSubmissionStatus(id, status, notes);
  getAdminCertificates = () => adminDb.getCertificates();
  createAdminCertificate = (cert: Parameters<typeof adminDb.createCertificate>[0]) =>
    adminDb.createCertificate(cert);
  verifyAdminCertificate = (certificateId: string) => adminDb.verifyCertificate(certificateId);
  getAdminContacts = () => adminDb.getContacts();
  updateAdminContactStatus = (id: string, status: ContactLeadStatus) =>
    adminDb.updateContactStatus(id, status);
}

export const apiClient = new ApiClient();
export default apiClient;

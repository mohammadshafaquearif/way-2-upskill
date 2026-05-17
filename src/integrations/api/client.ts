// API client — uses Supabase (works on Vercel + local without Express)
import { db } from '@/integrations/supabase/db';

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

  async getAllInstructors() {
    return db.getAllInstructors();
  }

  async createEnrollment(enrollmentData: {
    userId: string;
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
  }) {
    return db.createEnrollment(enrollmentData);
  }

  async createContact(contactData: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
  }) {
    return db.createContact(contactData);
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
    return db.signUp(params);
  }

  async signOut() {
    return db.signOut();
  }

  async resetPassword(email: string) {
    return db.resetPassword(email);
  }
}

export const apiClient = new ApiClient();
export default apiClient;

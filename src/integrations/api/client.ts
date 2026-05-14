// API Client for Zyvotrix Backend
const API_BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : 'http://localhost:3001/api';

class ApiClient {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }

  // User operations
  async createUser(userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    username?: string;
    passwordHash?: string;
    interestedSubject?: string;
  }) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getUserByEmail(email: string) {
    return this.request(`/users/email/${encodeURIComponent(email)}`);
  }

  // Course operations
  async getAllCourses() {
    return this.request('/courses');
  }

  // Instructor operations
  async getAllInstructors() {
    return this.request('/instructors');
  }

  // Enrollment operations
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
  }) {
    return this.request('/enrollments', {
      method: 'POST',
      body: JSON.stringify(enrollmentData),
    });
  }

  // Contact operations
  async createContact(contactData: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
  }) {
    return this.request('/contacts', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }
}

export const apiClient = new ApiClient();
export default apiClient;

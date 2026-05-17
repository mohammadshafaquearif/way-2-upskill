import { supabase } from './client';

export type UserProfile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  interested_subject: string | null;
  created_at?: string;
};

function mapProfileToAppUser(profile: UserProfile) {
  return {
    id: profile.id,
    firstName: profile.first_name,
    lastName: profile.last_name,
    email: profile.email,
    phone: profile.phone,
    interestedSubject: profile.interested_subject ?? undefined,
  };
}

async function getProfile(userId: string): Promise<UserProfile> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) {
    throw new Error('Profile not found');
  }
  return data as UserProfile;
}

async function waitForProfile(userId: string, attempts = 6): Promise<UserProfile> {
  for (let i = 0; i < attempts; i++) {
    try {
      return await getProfile(userId);
    } catch {
      await new Promise((r) => setTimeout(r, 400));
    }
  }
  throw new Error('Profile not found');
}

export const db = {
  async signUp(params: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    interestedSubject: string;
  }) {
    const { data, error } = await supabase.auth.signUp({
      email: params.email,
      password: params.password,
      options: {
        data: {
          first_name: params.firstName,
          last_name: params.lastName,
          phone: params.phone,
          interested_subject: params.interestedSubject,
        },
      },
    });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error('Signup failed');

    // No session = email confirmation is ON in Supabase — sign in right after signup when it's OFF
    if (!data.session) {
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: params.email,
        password: params.password,
      });

      if (signInError) {
        if (signInError.message.toLowerCase().includes('email not confirmed')) {
          throw new Error(
            'Email confirmation is enabled in Supabase. Turn it off: Authentication → Sign In / Providers → Email → disable "Confirm email", then sign up again.'
          );
        }
        throw new Error(signInError.message);
      }
      if (!signInData.user) throw new Error('Signup succeeded but login failed. Please try logging in.');
    }

    const userId = (await supabase.auth.getUser()).data.user?.id ?? data.user.id;

    let profile: UserProfile;
    try {
      profile = await waitForProfile(userId);
    } catch {
      const { data: inserted, error: insertError } = await supabase
        .from('users')
        .insert({
          id: userId,
          first_name: params.firstName,
          last_name: params.lastName,
          email: params.email,
          phone: params.phone,
          interested_subject: params.interestedSubject,
        })
        .select()
        .single();

      if (insertError) {
        throw new Error(
          `${insertError.message}. Run supabase/fix-rls-signup.sql in Supabase SQL Editor.`
        );
      }
      profile = inserted as UserProfile;
    }

    return { profile, appUser: mapProfileToAppUser(profile) };
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    if (!data.user) throw new Error('Login failed');

    const profile = await getProfile(data.user.id);
    return { profile, appUser: mapProfileToAppUser(profile), session: data.session };
  },

  async signOut() {
    await supabase.auth.signOut();
  },

  async resetPassword(email: string) {
    const redirectTo = `${window.location.origin}/`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    if (error) throw new Error(error.message);
  },

  async getSession() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return null;
    try {
      const profile = await getProfile(session.user.id);
      return mapProfileToAppUser(profile);
    } catch {
      return null;
    }
  },

  async createUser(userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    passwordHash?: string;
    interestedSubject?: string;
  }) {
    if (!userData.passwordHash) throw new Error('Password is required');
    const { profile } = await this.signUp({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      password: userData.passwordHash,
      interestedSubject: userData.interestedSubject || '',
    });
    return profile;
  },

  async getUserByEmail(email: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!data) throw new Error('User not found');
    return data as UserProfile;
  },

  async getAllCourses() {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  },

  async getAllInstructors() {
    const { data, error } = await supabase
      .from('instructors')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  },

  async createEnrollment(enrollmentData: {
    userId: string;
    courseId: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
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
    const { data, error } = await supabase
      .from('enrollments')
      .insert({
        user_id: enrollmentData.userId,
        course_id: enrollmentData.courseId,
        first_name: enrollmentData.firstName,
        last_name: enrollmentData.lastName,
        email: enrollmentData.email,
        phone: enrollmentData.phone,
        address: enrollmentData.address,
        city: enrollmentData.city,
        state: enrollmentData.state,
        zip: enrollmentData.zip,
        country: enrollmentData.country,
        education: enrollmentData.education,
        field: enrollmentData.field,
        employment_status: enrollmentData.employmentStatus,
        programming_experience: enrollmentData.programmingExperience,
        goals: enrollmentData.goals,
        linkedin: enrollmentData.linkedin,
        github: enrollmentData.github,
        payment_plan: enrollmentData.paymentPlan,
        payment_method: enrollmentData.paymentMethod,
        total_amount: enrollmentData.totalAmount,
        status: enrollmentData.status || 'completed',
        payment_status: 'completed',
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async createContact(contactData: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
  }) {
    const { data, error } = await supabase.from('contacts').insert({
      first_name: contactData.firstName,
      last_name: contactData.lastName,
      email: contactData.email,
      phone: contactData.phone,
      subject: contactData.subject,
      message: contactData.message,
    }).select().single();

    if (error) throw new Error(error.message);
    return data;
  },

  async getAdminUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('id, first_name, last_name, email, phone, interested_subject, created_at, updated_at')
      .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  },

  async getAdminEnrollments() {
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        id, user_id, course_id, payment_plan, status, created_at,
        users ( first_name, last_name, email ),
        courses ( title, price )
      `)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);

    return (data ?? []).map((row: Record<string, unknown>) => {
      const users = row.users as { first_name: string; last_name: string; email: string } | null;
      const courses = row.courses as { title: string; price: number } | null;
      return {
        id: row.id,
        user_id: row.user_id,
        course_id: row.course_id,
        payment_plan: row.payment_plan,
        status: row.status || 'pending',
        created_at: row.created_at,
        user_name: users ? `${users.first_name} ${users.last_name}` : '',
        user_email: users?.email ?? '',
        course_name: courses?.title ?? '',
        amount: courses?.price ?? 0,
      };
    });
  },

  async getUserCourses(userId: string) {
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        id, course_id, status, created_at,
        courses ( title, duration, price )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    if (!data?.length) return [];

    return data.map((row: Record<string, unknown>) => {
      const course = row.courses as { title: string; duration: string; price: number } | null;
      const progress = Math.floor(Math.random() * 100);
      const totalLessons = Math.floor(Math.random() * 50) + 20;
      const completedLessons = Math.floor(Math.random() * 30) + 5;
      return {
        id: row.id,
        course_id: row.course_id,
        course_name: course?.title ?? '',
        enrollment_date: row.created_at,
        progress,
        status: row.status || 'active',
        next_lesson: `Lesson ${Math.floor(Math.random() * 20) + 1}`,
        total_lessons: totalLessons,
        completed_lessons: completedLessons,
        instructor: 'Mohammad Shafaque Arif',
        duration: course?.duration ?? '',
        price: course?.price ?? 0,
      };
    });
  },
};

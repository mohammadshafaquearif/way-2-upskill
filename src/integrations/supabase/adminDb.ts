import { supabase } from './client';
import type {
  AdminAssignment,
  AdminCertificate,
  AdminContact,
  AdminDashboardStats,
  AdminEnrollment,
  AdminLearner,
  AdminProgram,
  AdminSession,
  AdminSubmission,
  ContactLeadStatus,
  LearnerStatus,
  SubmissionStatus,
} from '@/lib/adminTypes';
import { generateCertificateId } from '@/lib/certificateUtils';

function mapProgram(row: Record<string, unknown>): AdminProgram {
  return {
    id: row.id as string,
    code: (row.code as string) || '',
    title: row.title as string,
    description: (row.description as string) || null,
    duration: (row.duration as string) || null,
    price: Number(row.price) || 0,
    curriculum: (row.curriculum as string) || null,
    category: (row.category as string) || null,
    level: (row.level as string) || null,
    is_active: row.is_active !== false,
    created_at: row.created_at as string,
  };
}

export const adminDb = {
  async getDashboardStats(): Promise<AdminDashboardStats> {
    const [usersRes, enrollmentsRes, sessionsRes] = await Promise.all([
      supabase.from('users').select('id, learner_status, is_active'),
      supabase
        .from('enrollments')
        .select(`
          id, user_id, course_id, payment_plan, status, created_at, total_amount,
          first_name, last_name, email,
          users ( first_name, last_name, email ),
          courses ( title, code, price )
        `)
        .order('created_at', { ascending: false }),
      supabase
        .from('program_sessions')
        .select('*, courses(code, title)')
        .gte('session_date', new Date().toISOString().slice(0, 10))
        .order('session_date', { ascending: true })
        .limit(5),
    ]);

    if (usersRes.error) throw new Error(usersRes.error.message);
    if (enrollmentsRes.error) throw new Error(enrollmentsRes.error.message);

    const users = usersRes.data ?? [];
    const enrollments = enrollmentsRes.data ?? [];

    const mappedEnrollments: AdminEnrollment[] = enrollments.map((row: Record<string, unknown>) => {
      const u = row.users as { first_name: string; last_name: string; email: string } | null;
      const c = row.courses as { title: string; code: string; price: number } | null;
      const fn = row.first_name as string | undefined;
      const ln = row.last_name as string | undefined;
      return {
        id: row.id as string,
        user_id: row.user_id as string | null,
        course_id: row.course_id as string | null,
        user_name: u ? `${u.first_name} ${u.last_name}` : `${fn || ''} ${ln || ''}`.trim(),
        user_email: u?.email ?? (row.email as string) ?? '',
        course_name: c?.title ?? '',
        program_code: c?.code,
        payment_plan: row.payment_plan as string | null,
        amount: Number(row.total_amount ?? c?.price ?? 0),
        status: (row.status as string) || 'pending',
        created_at: row.created_at as string,
      };
    });

    const sold = mappedEnrollments.filter(
      (e) => e.status === 'completed' || e.status === 'active',
    ).length;

    const revenue = mappedEnrollments.reduce((sum, e) => sum + e.amount, 0);

    const upcomingSessions: AdminSession[] = (sessionsRes.data ?? []).map(
      (row: Record<string, unknown>) => {
        const c = row.courses as { code: string; title: string } | null;
        return {
          id: row.id as string,
          course_id: row.course_id as string,
          title: row.title as string,
          meet_link: (row.meet_link as string) || null,
          session_date: row.session_date as string,
          session_time: (row.session_time as string).slice(0, 5),
          mentor_name: (row.mentor_name as string) || null,
          program_code: c?.code,
          program_title: c?.title,
        };
      },
    );

    return {
      totalLearners: users.length,
      activeLearners: users.filter(
        (u: Record<string, unknown>) =>
          (u.learner_status as string) === 'active' || u.is_active === true,
      ).length,
      programsSold: sold,
      revenue,
      upcomingSessions,
      recentEnrollments: mappedEnrollments.slice(0, 5),
    };
  },

  async getLearners(): Promise<AdminLearner[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);

    const { data: enrollments } = await supabase
      .from('enrollments')
      .select('user_id, status, created_at, courses(code)')
      .order('created_at', { ascending: false });

    const enrollmentByUser = new Map<string, { status: string; created_at: string }>();
    (enrollments ?? []).forEach((e: Record<string, unknown>) => {
      const uid = e.user_id as string;
      if (uid && !enrollmentByUser.has(uid)) {
        enrollmentByUser.set(uid, {
          status: (e.status as string) || 'pending',
          created_at: e.created_at as string,
        });
      }
    });

    return (data ?? []).map((row: Record<string, unknown>) => {
      const en = enrollmentByUser.get(row.id as string);
      return {
        id: row.id as string,
        first_name: row.first_name as string,
        last_name: row.last_name as string,
        email: row.email as string,
        phone: row.phone as string,
        country: (row.country as string) || null,
        assigned_program: (row.assigned_program as string) || null,
        learner_status: ((row.learner_status as string) || 'active') as LearnerStatus,
        admin_notes: (row.admin_notes as string) || null,
        created_at: row.created_at as string,
        enrollment_status: en?.status ?? null,
        joining_date: en?.created_at ?? (row.created_at as string),
      };
    });
  },

  async updateLearner(
    id: string,
    updates: Partial<{
      first_name: string;
      last_name: string;
      phone: string;
      country: string;
      assigned_program: string;
      learner_status: LearnerStatus;
      admin_notes: string;
    }>,
  ) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async assignProgramToLearner(userId: string, courseId: string, status = 'active') {
    const { data: existing } = await supabase
      .from('enrollments')
      .select('id')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .maybeSingle();

    if (existing) {
      const { data, error } = await supabase
        .from('enrollments')
        .update({ status, payment_status: status === 'completed' ? 'completed' : 'pending' })
        .eq('id', existing.id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    }

    const { data: user } = await supabase.from('users').select('*').eq('id', userId).single();
    const { data: course } = await supabase.from('courses').select('*').eq('id', courseId).single();

    const { data, error } = await supabase
      .from('enrollments')
      .insert({
        user_id: userId,
        course_id: courseId,
        first_name: user?.first_name,
        last_name: user?.last_name,
        email: user?.email,
        phone: user?.phone,
        status,
        payment_status: status === 'completed' ? 'completed' : 'pending',
        total_amount: course?.price,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);

    await supabase
      .from('users')
      .update({ assigned_program: course?.code || course?.title })
      .eq('id', userId);

    return data;
  },

  async getPrograms(): Promise<AdminProgram[]> {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('code', { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []).map(mapProgram);
  },

  async createProgram(program: {
    code: string;
    title: string;
    description?: string;
    duration?: string;
    price: number;
    curriculum?: string;
    category?: string;
    level?: string;
  }) {
    const { data, error } = await supabase
      .from('courses')
      .insert({ ...program, is_active: true })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return mapProgram(data);
  },

  async updateProgram(
    id: string,
    updates: Partial<{
      code: string;
      title: string;
      description: string;
      duration: string;
      price: number;
      curriculum: string;
      category: string;
      level: string;
      is_active: boolean;
    }>,
  ) {
    const { data, error } = await supabase
      .from('courses')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return mapProgram(data);
  },

  async deleteProgram(id: string) {
    const { error } = await supabase.from('courses').update({ is_active: false }).eq('id', id);
    if (error) throw new Error(error.message);
  },

  async getSessions(): Promise<AdminSession[]> {
    const { data, error } = await supabase
      .from('program_sessions')
      .select('*, courses(code, title)')
      .order('session_date', { ascending: true });
    if (error) throw new Error(error.message);

    return (data ?? []).map((row: Record<string, unknown>) => {
      const c = row.courses as { code: string; title: string } | null;
      return {
        id: row.id as string,
        course_id: row.course_id as string,
        title: row.title as string,
        meet_link: (row.meet_link as string) || null,
        session_date: row.session_date as string,
        session_time: (row.session_time as string).slice(0, 5),
        mentor_name: (row.mentor_name as string) || null,
        program_code: c?.code,
        program_title: c?.title,
      };
    });
  },

  async createSession(session: {
    course_id: string;
    title: string;
    meet_link?: string;
    session_date: string;
    session_time: string;
    mentor_name?: string;
  }) {
    const { data, error } = await supabase
      .from('program_sessions')
      .insert(session)
      .select('*, courses(code, title)')
      .single();
    if (error) throw new Error(error.message);
    const c = data.courses as { code: string; title: string } | null;
    return {
      id: data.id,
      course_id: data.course_id,
      title: data.title,
      meet_link: data.meet_link,
      session_date: data.session_date,
      session_time: data.session_time.slice(0, 5),
      mentor_name: data.mentor_name,
      program_code: c?.code,
      program_title: c?.title,
    } as AdminSession;
  },

  async updateSession(
    id: string,
    updates: Partial<{
      course_id: string;
      title: string;
      meet_link: string;
      session_date: string;
      session_time: string;
      mentor_name: string;
    }>,
  ) {
    const { error } = await supabase.from('program_sessions').update(updates).eq('id', id);
    if (error) throw new Error(error.message);
  },

  async deleteSession(id: string) {
    const { error } = await supabase.from('program_sessions').delete().eq('id', id);
    if (error) throw new Error(error.message);
  },

  async getAssignments(): Promise<AdminAssignment[]> {
    const [assignmentsRes, submissionsRes] = await Promise.all([
      supabase
        .from('assignments')
        .select('*, courses(code)')
        .order('due_date', { ascending: true }),
      supabase.from('assignment_submissions').select('assignment_id'),
    ]);

    if (assignmentsRes.error) throw new Error(assignmentsRes.error.message);

    const submissionCounts = (submissionsRes.data ?? []).reduce<Record<string, number>>((acc, row) => {
      const id = (row as { assignment_id: string }).assignment_id;
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {});

    return (assignmentsRes.data ?? []).map((row: Record<string, unknown>) => {
      const c = row.courses as { code: string } | null;
      return {
        id: row.id as string,
        course_id: row.course_id as string,
        title: row.title as string,
        description: (row.description as string) || null,
        file_url: (row.file_url as string) || null,
        file_name: (row.file_name as string) || null,
        due_date: row.due_date as string,
        program_code: c?.code,
        submission_count: submissionCounts[row.id as string] ?? 0,
      };
    });
  },

  async createAssignment(assignment: {
    course_id: string;
    title: string;
    description?: string;
    file_url?: string;
    file_name?: string;
    due_date: string;
  }) {
    const { data, error } = await supabase
      .from('assignments')
      .insert(assignment)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async updateAssignment(
    id: string,
    updates: Partial<{
      title: string;
      description: string;
      file_url: string;
      file_name: string;
      due_date: string;
      course_id: string;
    }>,
  ) {
    const { error } = await supabase.from('assignments').update(updates).eq('id', id);
    if (error) throw new Error(error.message);
  },

  async deleteAssignment(id: string) {
    const { error } = await supabase.from('assignments').delete().eq('id', id);
    if (error) throw new Error(error.message);
  },

  async getSubmissions(): Promise<AdminSubmission[]> {
    const { data, error } = await supabase
      .from('assignment_submissions')
      .select('*, assignments(title)')
      .order('submitted_at', { ascending: false });
    if (error) throw new Error(error.message);

    return (data ?? []).map((row: Record<string, unknown>) => {
      const a = row.assignments as { title: string } | null;
      return {
        id: row.id as string,
        assignment_id: row.assignment_id as string,
        assignment_title: a?.title,
        user_id: (row.user_id as string) || null,
        learner_name: (row.learner_name as string) || null,
        learner_email: (row.learner_email as string) || null,
        file_url: (row.file_url as string) || null,
        file_name: (row.file_name as string) || null,
        submitted_at: row.submitted_at as string,
        status: ((row.status as string) || 'submitted') as SubmissionStatus,
        notes: (row.notes as string) || null,
      };
    });
  },

  async updateSubmissionStatus(id: string, status: SubmissionStatus, notes?: string) {
    const { error } = await supabase
      .from('assignment_submissions')
      .update({ status, notes })
      .eq('id', id);
    if (error) throw new Error(error.message);
  },

  async getCertificates(): Promise<AdminCertificate[]> {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as AdminCertificate[];
  },

  async createCertificate(cert: {
    student_name: string;
    user_id?: string;
    course_id?: string;
    program_code?: string;
    completion_date: string;
  }) {
    const certificate_id = generateCertificateId();
    const { data, error } = await supabase
      .from('certificates')
      .insert({ ...cert, certificate_id })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data as AdminCertificate;
  },

  async verifyCertificate(certificateId: string) {
    const { data, error } = await supabase
      .from('certificates')
      .select('*, courses(title)')
      .eq('certificate_id', certificateId.trim())
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data;
  },

  async getContacts(): Promise<AdminContact[]> {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);

    return (data ?? []).map((row: Record<string, unknown>) => ({
      id: row.id as string,
      first_name: row.first_name as string,
      last_name: row.last_name as string,
      email: row.email as string,
      phone: (row.phone as string) || null,
      message: row.message as string,
      subject: (row.subject as string) || null,
      status: ((row.status as string) || 'new') as ContactLeadStatus,
      created_at: row.created_at as string,
    }));
  },

  async updateContactStatus(id: string, status: ContactLeadStatus) {
    const { error } = await supabase.from('contacts').update({ status }).eq('id', id);
    if (error) throw new Error(error.message);
  },
};

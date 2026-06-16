import { SUPER_ADMIN_EMAIL } from '@/lib/admin';
import type { AdminAccessRecord, AdminAgent, AdminContact } from '@/lib/adminTypes';

export function buildAdminAgents(records: AdminAccessRecord[]): AdminAgent[] {
  const seen = new Set<string>();
  const agents: AdminAgent[] = [];

  const add = (email: string) => {
    const normalized = email.trim().toLowerCase();
    if (!normalized || seen.has(normalized)) return;
    seen.add(normalized);
    agents.push({ email: normalized, label: normalized });
  };

  add(SUPER_ADMIN_EMAIL);
  records.filter((r) => r.is_active).forEach((r) => add(r.email));

  return agents.sort((a, b) => a.email.localeCompare(b.email));
}

export function countLeadsByAgent(contacts: AdminContact[]): Record<string, number> {
  const counts: Record<string, number> = { unassigned: 0 };

  for (const contact of contacts) {
    if (!contact.assigned_to) {
      counts.unassigned += 1;
      continue;
    }
    const key = contact.assigned_to.toLowerCase();
    counts[key] = (counts[key] ?? 0) + 1;
  }

  return counts;
}

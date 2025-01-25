import { z } from "zod";

// sign up schema with first name, last name, company name, email & ein number
export const signUpSchema = z.object({
  firstName: z.string().min(2).max(32),
  lastName: z.string().min(2).max(32),
  // teamName: z.string().min(2).max(32),
  email: z.string().email(),
  // slug: z.string().optional(),
});


export const deleteAttachmentSchema = z.string();

// sign up schema with first name, last name, company name, email & ein number
export const signInSchema = z.object({
  email: z.string().email(),
  inviteCode: z.string().optional(),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;

export const updateUserSchema = z.object({
  full_name: z.string().min(2).max(32).optional(),
  avatar_url: z.string().url().optional(),
  locale: z.string().optional(),
  week_starts_on_monday: z.boolean().optional(),
});

export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;

export const trackingConsentSchema = z.boolean();

export const sendSupportSchema = z.object({
  subject: z.string(),
  priority: z.string(),
  type: z.string(),
  message: z.string(),
  url: z.string().optional(),
});

export const updateTeamSchema = z.object({
  name: z.string().min(2).max(32).optional(),
  email: z.string().email().optional(),
  logo_url: z.string().url().optional(),
  revalidatePath: z.string().optional(),
  redirectTo: z.string().optional(),
  id: z.string().uuid(),
});

export const requestAccessSchema = z.void();

export type UpdateTeamFormValues = z.infer<typeof updateTeamSchema>;

export const subscribeSchema = z.object({
  email: z.string().email(),
  userGroup: z.string(),
});

export const updateSubscriberPreferenceSchema = z.object({
  templateId: z.string(),
  teamId: z.string(),
  revalidatePath: z.string(),
  subscriberId: z.string(),
  type: z.string(),
  enabled: z.boolean(),
});

export const unenrollMfaSchema = z.object({
  factorId: z.string(),
});

export const mfaVerifySchema = z.object({
  factorId: z.string(),
  challengeId: z.string(),
  code: z.string(),
});

export const sendFeedbackSchema = z.object({
  feedback: z.string(),
});

export const updaterMenuSchema = z.array(
  z.object({
    path: z.string(),
    name: z.string(),
  }),
);

export const changeTeamSchema = z.object({
  teamId: z.string(),
  redirectTo: z.string(),
});

export const joinTeamSchema = z.object({
  code: z.string(),
});

export const createTeamSchema = z.object({
  name: z.string().min(2, {
    message: "Team name must be at least 2 characters.",
  }),
  slug: z.string().min(4, {
    message: "Slug must be at least 4 characters.",
  }),
  redirectTo: z.string().optional(),
});

export const changeUserRoleSchema = z.object({
  userId: z.string(),
  teamId: z.string(),
  role: z.enum(["owner", "member"]),
  revalidatePath: z.string().optional(),
});

export const deleteTeamMemberSchema = z.object({
  userId: z.string(),
  teamId: z.string(),
  revalidatePath: z.string().optional(),
});

export const leaveTeamSchema = z.object({
  teamId: z.string(),
  redirectTo: z.string().optional(),
  role: z.enum(["owner", "member"]),
  revalidatePath: z.string().optional(),
});

export const deleteTeamSchema = z.object({
  teamId: z.string(),
});

export const inviteTeamMembersSchema = z.object({
  saveOnly: z.boolean().optional(),
  invites: z.array(
    z.object({
      email: z.string().email().optional(),
      role: z.enum(["owner", "member"]),
    }),
  ),
  redirectTo: z.string().optional(),
  revalidatePath: z.string().optional(),
});

export type InviteTeamMembersFormValues = z.infer<
  typeof inviteTeamMembersSchema
>;

export const deleteInviteSchema = z.object({
  id: z.string(),
  revalidatePath: z.string().optional(),
});

export const acceptInviteSchema = z.object({
  id: z.string(),
  revalidatePath: z.string().optional(),
});

export const declineInviteSchema = z.object({
  id: z.string(),
  revalidatePath: z.string().optional(),
});

export const updateTeamProfileSchema = z.object({
  id: z.string().uuid(),
  address_line_1: z.string().optional(),
  address_line_2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  contact_name: z.string().optional(),
  postal_code: z.string().optional(),
  country: z.string().optional(),
  revalidatePath: z.string().optional(),
  redirectTo: z.string().optional(),
});

export const deleteProjectSchema = z.object({
  id: z.string().uuid(),
});

export const deleteEntriesSchema = z.object({
  id: z.string().uuid(),
});

export const setupUserSchema = z.object({
  full_name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  team_name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

export const verifyOtpSchema = z.object({
  type: z.enum(["phone", "email"]),
  token: z.string(),
  phone: z.string().optional(),
  email: z.string().optional(),
  redirectTo: z.string().optional(),
});

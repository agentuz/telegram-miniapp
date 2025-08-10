export type TGUser = { id: number; username?: string; first_name?: string };
export type Task = {
  id: string;
  name: string;
  description?: string;
  reward_stars: number;
  reward_xp: number;
  website?: string;
  status: 'active'|'under_review'|'completed';
};

export interface SidebarSection {
  label: string;
  icon: string;
  active: boolean;
  path: string;
}

export interface SidebarData {
  sections: Record<string, SidebarSection[]>;
  userName: string;
  userPlan: string;
  userInitial: string;
}
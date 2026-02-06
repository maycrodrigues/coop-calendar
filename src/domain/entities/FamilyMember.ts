export interface FamilyMember {
  id: string;
  name: string;
  photoUrl?: string;
}

export type Child = FamilyMember

export interface Parent extends FamilyMember {
  role: 'father' | 'mother';
}

export interface FamilyInfo {
  children: Child[];
  parents: Parent[];
}
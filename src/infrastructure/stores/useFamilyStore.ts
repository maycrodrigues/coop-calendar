import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FamilyInfo, Child, Parent } from '../../domain/entities/FamilyMember';

interface FamilyState extends FamilyInfo {
  addParent: (parent: Omit<Parent, 'photoUrl'>) => void;
  addChild: (child: Omit<Child, 'photoUrl'>) => void;
  updateParent: (id: string, name: string) => void;
  updateChild: (id: string, name: string) => void;
  removeParent: (id: string) => void;
  removeChild: (id: string) => void;
  updatePhoto: (id: string, photoUrl: string | null, type: 'child' | 'parent') => void;
}

const defaultFamily: FamilyInfo = {
  children: [
    { id: '1', name: 'Filho 1' },
    { id: '2', name: 'Filho 2' },
  ],
  parents: [
    { id: '1', name: 'João', role: 'father' },
    { id: '2', name: 'Maria', role: 'mother' },
  ],
};

export const useFamilyStore = create<FamilyState>()(
  persist(
    (set) => ({
      ...defaultFamily,
      addParent: (parent) =>
        set((state) => ({
          parents: [...state.parents, parent],
        })),
      addChild: (child) =>
        set((state) => ({
          children: [...state.children, child],
        })),
      updateParent: (id, name) =>
        set((state) => ({
          parents: state.parents.map((parent) =>
            parent.id === id ? { ...parent, name } : parent
          ),
        })),
      updateChild: (id, name) =>
        set((state) => ({
          children: state.children.map((child) =>
            child.id === id ? { ...child, name } : child
          ),
        })),
      removeParent: (id) =>
        set((state) => ({
          parents: state.parents.filter((parent) => parent.id !== id),
        })),
      removeChild: (id) =>
        set((state) => ({
          children: state.children.filter((child) => child.id !== id),
        })),
      updatePhoto: (id, photoUrl, type) =>
        set((state) => ({
          [type === 'child' ? 'children' : 'parents']: state[type === 'child' ? 'children' : 'parents'].map(
            (member) => (member.id === id ? { ...member, photoUrl } : member)
          ),
        })),
    }),
    {
      name: 'family-storage',
    }
  )
);
import { useFamilyStore } from '../../infrastructure/stores/useFamilyStore';

export const addFamilyMember = (type: 'parent' | 'child', name: string): string => {
  const { addParent, addChild } = useFamilyStore.getState();
  const id = crypto.randomUUID();

  if (type === 'parent') {
    addParent({ id, name, role: 'father' });
  } else {
    addChild({ id, name });
  }

  return id;
};

export const removeFamilyMember = (type: 'parent' | 'child', id: string) => {
  const { removeParent, removeChild } = useFamilyStore.getState();
  
  if (type === 'parent') {
    removeParent(id);
  } else {
    removeChild(id);
  }
};

export const removePhoto = (type: 'parent' | 'child', id: string) => {
  const { updatePhoto } = useFamilyStore.getState();
  updatePhoto(id, null, type);
};
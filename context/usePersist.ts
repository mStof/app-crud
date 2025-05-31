import { create } from 'zustand';
import { UserFB } from '~/types/user';

type UsePersistType = {
  userPersist: UserFB;
  setUserPersisted: (cpf: UserFB) => void;
};

export const usePersist = create<UsePersistType>()((set) => ({
  userPersist: {
    cpf:"",
    name:"",
  },
  setUserPersisted: (data) => set(() => ({ userPersist: data })),
}));

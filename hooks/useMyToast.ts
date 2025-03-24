import { create } from 'zustand';

type State = {
  text: string | null;
  variant: 'success' | 'warning' | 'error'
};

type Action = {
  setText: (value: State['text'], variant: State['variant']) => void;
};

let one: NodeJS.Timeout | null = null;

export const useMyToast = create<State & Action>(set => ({
  text: null,
  variant: 'success',
  setText: (value,v) =>
    set(state => {
      if (one) clearTimeout(one);
      one = setTimeout(() => state.setText(null,'success'), 5000);
      return { text: value,variant:v };
    }),
}));
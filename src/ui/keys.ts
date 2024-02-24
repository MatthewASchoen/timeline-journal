export const confirmKeys = [' ', 'Enter'];
export const leftKeys = ['ArrowLeft', 'ArrowDown'];
export const rightKeys = ['ArrowRight', 'ArrowUp'];

const actionKeys = {
  confirm: [' ', 'Enter'],
  left: ['ArrowLeft', 'ArrowDown'],
  right: ['ArrowRight', 'ArrowUp'],
};
type ActionKey = keyof typeof actionKeys;

export const onKeys =
  (actions: Partial<Record<ActionKey, () => void>>) =>
  (e: React.KeyboardEvent<HTMLSpanElement>) =>
    Object.entries(actions).some(([actionKey, action]) => {
      if (!actionKeys[actionKey as ActionKey].includes(e.key)) return false;
      e.preventDefault();
      action?.();
      return true;
    });

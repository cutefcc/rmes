import { atom, useAtom } from 'jotai';
import { atomWithImmer, useImmerAtom } from 'jotai/immer';

const store = atomWithImmer({ str: 'init str' });

export { store };

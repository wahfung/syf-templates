import { useCallback, useState } from 'react';
import { produce, freeze, Draft } from 'immer';

export type DraftFunction<S> = (draft: Draft<S>) => void;
export type Updater<S> = (arg: S | DraftFunction<S>) => void;

export type ImmerHook<S> = [S, Updater<S>];
export function useImmer<S = unknown>(initValue: S | (() => S)): ImmerHook<S>;

export function useImmer<S>(initValue: S) {
  const [state, updateState] = useState(
    freeze(typeof initValue === 'function' ? initValue() : initValue, true),
  );

  return [
    state,
    useCallback((updater: S | DraftFunction<S>) => {
      if (typeof updater === 'function') {
        updateState(produce(updater as DraftFunction<S>));
      } else {
        updateState(freeze(updater));
      }
    }, []),
  ];
}

import { useCallback, useState } from "react";
import { debounce } from "lodash";

const useDebounce = (initialValue, durationInMs = 500) => {
  const [internalState, setInternalState] = useState(initialValue);
  const debouncedFunction = useDebouncedState(setInternalState, durationInMs);
  const internalStateLowerCase = internalState.toLowerCase();
  return [internalStateLowerCase, debouncedFunction];
};

const useDebouncedState = (funcToDebounce, durationInMs = 500) => {

  if (typeof funcToDebounce !== "function") {
    throw new TypeError("FuncToDebounce should be a function");
  }
  if (funcToDebounce == null) {
    throw new TypeError("FuncToDebounce cannot be null");
  }
  if (isNaN(durationInMs)) {
    throw new TypeError("Duration for debounce has to be a number in ms");
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(debounce(funcToDebounce, durationInMs), [
    funcToDebounce,
    durationInMs
  ]);
};

export default useDebounce;

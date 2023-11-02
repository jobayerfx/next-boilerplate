import React, {
  DependencyList,
  EffectCallback,
  useEffect,
  useRef,
} from "react";

const useDidMountEffect = (func: EffectCallback, deps?: DependencyList) => {
  const initailRender = useRef(true);

  useEffect(() => {
    let effectReturns: void | (() => void | undefined) = () => {};
    if (initailRender.current) {
      initailRender.current = false;
    } else {
      effectReturns = func();
    }
    if (effectReturns && typeof effectReturns === "function") {
      return effectReturns;
    }
  }, deps);
};

export default useDidMountEffect;

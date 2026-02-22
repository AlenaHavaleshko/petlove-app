import { useState, type ReactNode } from "react";
import { LoaderContext } from "./LoaderContextObject";

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);

  return (
    <LoaderContext.Provider
      value={{ isLoading, showLoader, hideLoader, setIsLoading }}
    >
      {children}
    </LoaderContext.Provider>
  );
};

import { createContext, useState, type ReactNode } from "react";

interface LoaderContextType {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
  setIsLoading: (loading: boolean) => void;
}

export const LoaderContext = createContext<LoaderContextType | undefined>(
  undefined,
);

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

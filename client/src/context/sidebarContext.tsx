import { ReactNode, createContext, useCallback, useState } from "react";

interface ISidebarContextData {
  isSidebarOpen: boolean;
  sidebarOptions: ISidebarOptions[];
  toggleSidebarOpen: () => void;
  setSidebarOptions: (newSidebarOptions: ISidebarOptions[]) => void;
}

interface ISidebarOptions {
  path: string;
  icon: string;
  label: string;
}

type IProps = {
  children: ReactNode;
};

export const SidebarContext = createContext({} as ISidebarContextData);

export const SidebarProvider = ({ children }: IProps) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarOptions, setSidebarOptions] = useState<ISidebarOptions[]>([]);

  const toggleSidebarOpen = useCallback(() => {
    setSidebarOpen((oldSidebarOpen) => !oldSidebarOpen);
  }, []);

  const handleSetSidebarOptions = useCallback(
    (newSidebarOptions: ISidebarOptions[]) => {
      setSidebarOptions(newSidebarOptions);
    },
    []
  );

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebarOpen,
        sidebarOptions,
        setSidebarOptions: handleSetSidebarOptions,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

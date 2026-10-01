import { createContext, useContext, useState } from 'react';

const SelectedServiceContext = createContext(null);

export function SelectedServiceProvider({ children }) {
  const [selectedService, setSelectedService] = useState(null);

  const selectService = (service) => {
    setSelectedService(service);
  };

  const clearSelectedService = () => {
    setSelectedService(null);
  };

  return (
    <SelectedServiceContext.Provider
      value={{
        selectedService,
        selectService,
        clearSelectedService
      }}
    >
      {children}
    </SelectedServiceContext.Provider>
  );
}

export function useSelectedService() {
  return useContext(SelectedServiceContext);
}
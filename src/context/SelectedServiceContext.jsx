import { useState } from 'react';
import { SelectedServiceContext } from './SelectedServiceContext.js';

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
        clearSelectedService,
      }}
    >
      {children}
    </SelectedServiceContext.Provider>
  );
}
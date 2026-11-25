import { useState, useMemo } from 'react';

export function useServiceFilter(services) {
  const [searchText, setSearchText] = useState('');

  const visibleServices = useMemo(() => {
    const search = searchText.toLowerCase();

    return services.filter((service) => {
      return (
        service.name.toLowerCase().includes(search) ||
        service.description.toLowerCase().includes(search)
      );
    });
  }, [services, searchText]);

  return {
    searchText,
    setSearchText,
    visibleServices
  };
}
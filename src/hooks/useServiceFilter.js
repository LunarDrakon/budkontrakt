import { useState } from 'react';

export function useServiceFilter(services) {
  const [searchText, setSearchText] = useState('');

  const visibleServices = services.filter((service) => {
    const search = searchText.toLowerCase();

    return (
      service.name.toLowerCase().includes(search) ||
      service.description.toLowerCase().includes(search)
    );
  });

  return {
    searchText,
    setSearchText,
    visibleServices
  };
}
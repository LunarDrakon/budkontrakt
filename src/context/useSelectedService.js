import { useContext } from 'react';
import { SelectedServiceContext } from './SelectedServiceContext.js';

export function useSelectedService() {
  return useContext(SelectedServiceContext);
}
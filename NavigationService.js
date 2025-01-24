import { createRef } from 'react';

// Create a navigation reference
export const navigationRef = createRef();

export const NavigationService = {
  navigate(name, params) {
    navigationRef.current?.navigate(name, params);
  },
  goBack() {
    navigationRef.current?.goBack();
  },
  replace(name, params) {
    navigationRef.current?.replace(name, params);
  },
};

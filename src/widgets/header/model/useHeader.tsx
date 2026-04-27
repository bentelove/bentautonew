import type { User } from '@/entities/user';
import { useState } from 'react';

// Временный тип для хука
export const useHeader = () => {
  const [show,setShow] = useState(true);
  
  return {
    show,
    setShow
  };
};
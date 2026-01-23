'use client';

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Category } from '@/types/database';

export const usePrimaryCategory = (categoryId: string | null | undefined, initialData?: any) => {
  return useQuery({
    queryKey: ['primary-category', categoryId],
    queryFn: async () => {
      if (!categoryId) return null;
      
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', categoryId)
        .single();
      
      if (error) throw error;
      return data as Category;
    },
    enabled: !!categoryId,
    initialData,
  });
};

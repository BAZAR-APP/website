import { useQuery } from '@tanstack/react-query'
import api from '../axios' 

interface GetCmsContentParams {
  contentType: string;
  language: string; 
}

const getCmsContent = async ({ contentType, language }: GetCmsContentParams) => {
  const url = `/cms/${contentType}?language=${language}`;
  const { data } = await api.get(url);
  return data
}

export const useCmsContentQuery = (contentType: string, language: string) => {
  return useQuery({
    queryKey: ['cmsContent', contentType, language], 
    queryFn: () => getCmsContent({ contentType, language }),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })
}
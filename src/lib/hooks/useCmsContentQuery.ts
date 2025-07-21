import { useQuery } from '@tanstack/react-query'
import api from '../axios'

const getCmsContent = async (contentType: string) => {
  const { data } = await api.get(`/cms/${contentType}?language=${'en'}`)
  return data
}
export const useCmsContentQuery = (contentType: string) => {
  return useQuery({
    queryKey: ['cmsContent', contentType],
    queryFn: () => getCmsContent(contentType),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })
}

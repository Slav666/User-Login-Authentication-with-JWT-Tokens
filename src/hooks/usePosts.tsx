import { useQuery } from '@tanstack/react-query';
import { response } from 'msw';
import axios from 'axios';
import { z } from 'zod';

export const BlogData = z.object({
  id: z.number(),
  ownerId: z.number(),
  // creationDate: z.string(),
  title: z.string(),
  post: z.string(),
});

const Blogs = z.array(BlogData);
// export type Blog = z.infer<typeof BlogData>;

export default function usePosts() {
  return useQuery(['posts'], () =>
    axios.get('/api/posts/').then(res => {
      // console.log('RES DATA FROM USE POST', res.data);
      //Source: www.sandromaglione.com/techblog/zod-and-newtype-ts-full-type-safety-with-typescript
      const dataToValidate = Blogs.safeParse(res.data);
      if (dataToValidate.success) {
        const validData = dataToValidate.data;
        return validData;
      }
    }),
  );
}

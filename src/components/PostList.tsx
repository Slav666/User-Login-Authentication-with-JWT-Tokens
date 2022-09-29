import React from 'react';
import Post from './Post';
import usePosts from '~/hooks/usePosts';
import { IPost } from '../utility/interface';

const PostList = () => {
  const { data, status } = usePosts();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error</div>;
  }
  return (
    <>
      <ul className="m-2 py-2 md:container md:mx-auto">
        {data.map((post: IPost) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </>
  );
};

export default PostList;

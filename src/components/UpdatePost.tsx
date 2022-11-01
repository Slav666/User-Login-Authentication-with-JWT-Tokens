import React, { FC } from 'react';
import PostForm from './PostForm';
import { useParams, useNavigate } from 'react-router-dom';
import useUpdatePost from '~/hooks/useUpdatePost';
import usePost from '~/hooks/usePost';
import { IPost } from '../utility/interface';

interface Value {
  defaultValues: IPost;
  post: IPost;
}
const UpdatedPost: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: post }: { data: IPost } = usePost(+id);
  const user = { id: 2, name: 'Slav', surname: 'Dyk' };
  console.log('DATA', post);
  const { mutateAsync } = useUpdatePost({ userId: user.id });
  const onFormSubmit = async formData => {
    await mutateAsync({ ...formData });
    navigate('/');
  };
  return (
    <div>
      <PostForm defaultValues={post} onFormSubmit={onFormSubmit} />
    </div>
  );
};

export default UpdatedPost;

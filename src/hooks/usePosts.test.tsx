import { renderHook } from '@testing-library/react-hooks';
import usePosts from './usePosts';
import { describe, it, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import nock from 'nock';
import { posts } from '../mocks/fixtures/blog';

import { act } from '@testing-library/react';

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('usePost', () => {
  it('check that fetch all posts', async () => {
    const { result, waitFor } = renderHook(() => usePosts(), { wrapper });
    function generateMockedResponse() {
      return [
        {
          id: 1,
          ownerId: 1,
          creationDate: '27-08-2022',
          title: 'When is the best weather is Scotland?',
          post: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        },
        {
          id: 2,
          ownerId: 2,
          creationDate: '27-08-2022',
          title: 'Why I like Scotland?',
          post: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
        },
        {
          id: 3,
          ownerId: 1,
          creationDate: '27-08-2022',
          title: 'What is the best feature for my sons?',
          post: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        },
        {
          id: 4,
          ownerId: 2,
          creationDate: '27-08-2022',
          title: 'What is the best time to buy a house?',
          post: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
        },
      ];h
    }
    const expectation = nock('http://my.domain.com')
      .persist()
      .get('/api/posts')
      .reply(200, () => {
        // const url = new URL(`http://example.com${uri}`);
        // const { page } = Object.fromEntries(url.searchParams);
        return generateMockedResponse();
      });
    await waitFor(() => {
      return result.current.isSuccess;
    });

    expect(result.current.data).toStrictEqual([...generateMockedResponse()]);
    expectation.done();
  });
});

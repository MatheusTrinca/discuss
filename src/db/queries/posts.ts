import { Post } from '@prisma/client';
import { db } from '..';

export type PostsWithData = Post & {
  topic: {
    slug: string;
  };
  user: {
    name: string | null;
  };
  _count: {
    comments: number;
  };
};

// export type PostsWithData = Awaited<
//   ReturnType<typeof fetchPostsByTopicSlug>
// >[number];

export async function fetchPostsByTopicSlug(
  slug: string
): Promise<PostsWithData[]> {
  return db.post.findMany({
    where: { topic: { slug } },
    include: {
      topic: {
        select: {
          slug: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
}

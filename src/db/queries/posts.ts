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

export async function fetchTopPosts(): Promise<PostsWithData[]> {
  return db.post.findMany({
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
    orderBy: {
      comments: {
        _count: 'desc',
      },
    },
    take: 5,
  });
}

export async function fetchPostsBySearchTerm(
  term: string
): Promise<PostsWithData[]> {
  return db.post.findMany({
    where: {
      OR: [{ title: { contains: term } }, { content: { contains: term } }],
    },
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

import db from "../config/ConnectDb";

export const CreateBlogPost = async (
  titleInput: string,
  authorIdInput: number,
  contentInput: string | null,
) => {
  const blog = await db.post.create({
    data: {
      title: titleInput,
      content: contentInput,
      published: false,
      author: {
        connect: {
          id: authorIdInput,
        },
      },
    },
  });

  return blog;
};

export const QueryBlogById = async (blogId: number) => {
  const blog = await db.post.findUnique({
    where: {
      id: blogId,
    },
  });

  return blog;
};

export const PublishBlogById = async (blogId: number) => {
  const blog = await db.post.update({
    where: {
      id: blogId,
    },
    data: {
      published: true,
    },
  });

  return blog;
}

export const QueryAllPublishedBlog = async () => {
  const blogs = await db.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: true,
    }
  });

  return blogs;
}

export const DeleteBlogById = async (blogId: number) => {
  const blog = await db.post.delete({
    where: {
      id: Number(blogId),
    }
  });

  return blog;
}
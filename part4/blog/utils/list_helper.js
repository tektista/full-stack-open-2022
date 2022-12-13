const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogList) => {
  let totalLikes = 0;

  blogList.forEach((blog) => {
    totalLikes = totalLikes + blog.likes;
  });

  return totalLikes;
};

const favouriteBlog = (blogList) => {
  const mostLiked = blogList.reduce((prev, curr) => {
    return prev.likes > curr.likes ? prev : curr;
  });

  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes,
  };
};

const mostBlogs = (blogList) => {
  //for each blog in the bloglist, check if that author exists in authorBlogCount
  //If the author already exists increment their blog count
  //If they dont push the object into the author blog count

  const authorBlogCount = [];

  blogList.forEach((blog) => {
    const currentAuthor = blog.author;
    const authorExists = authorBlogCount.find(
      (authorBlog) => authorBlog.author === currentAuthor
    );

    if (authorExists) {
      authorBlogCount.forEach((authorObj) => {
        if (authorObj.author === currentAuthor) {
          authorObj.blogs = authorObj.blogs + 1;
        }
      });
    } else {
      authorBlogCount.push({
        author: currentAuthor,
        blogs: 1,
      });
    }
  });

  const authorWithMostBlogs = authorBlogCount.reduce((prev, curr) => {
    return prev.blogs > curr.blogs ? prev : curr;
  });

  return {
    author: authorWithMostBlogs.author,
    blogs: authorWithMostBlogs.blogs,
  };
};

const mostLikes = (blogList) => {
  const authorLikeCount = [];

  blogList.forEach((blog) => {
    const currentAuthor = blog.author;
    const authorExists = authorLikeCount.find(
      (authorLike) => authorLike.author === currentAuthor
    );

    if (authorExists) {
      authorLikeCount.forEach((authorObj) => {
        if (authorObj.author === currentAuthor) {
          authorObj.likes = authorObj.likes + blog.likes;
        }
      });
    } else {
      authorLikeCount.push({
        author: currentAuthor,
        likes: blog.likes,
      });
    }
  });

  const authorWithMostLikes = authorLikeCount.reduce((prev, curr) => {
    return prev.likes > curr.likes ? prev : curr;
  });

  return {
    author: authorWithMostLikes.author,
    likes: authorWithMostLikes.likes,
  };


};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};

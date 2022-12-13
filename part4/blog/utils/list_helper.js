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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};

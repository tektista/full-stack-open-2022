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

module.exports = {
  dummy,
  totalLikes,
};

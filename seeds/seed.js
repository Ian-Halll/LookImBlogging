const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const PostData = require('./postData.json');
const commentData = require('./commentData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  let posts = [1, 2, 3];

  for (const post of PostData) {
    await Post.create({
      ...post,
      userId: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      commentID: users[Math.floor(Math.random() * users.length)].id,
      postId: posts[Math.floor(Math.random() * posts.length)].id

    });
  }

  process.exit(0);
};

seedDatabase();

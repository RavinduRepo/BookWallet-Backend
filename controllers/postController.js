const { getPostsService } = require("../services/postService");

const getPosts = async (req, res) => {
  try {
    const posts = await getPostsService();
    console.log(posts);
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

module.exports = { getPosts };

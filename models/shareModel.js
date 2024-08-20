const review = require("../models/postModel");

class Share {
    constructor(
      reviewId,
      sharerUsername,
      review,
      sharedUserId,
      imagePath,
    ) {
      this.reviewId = reviewId;
      this.sharerUsername = sharerUsername;
      this.review = review;
      this.sharedUserId = sharedUserId;
      this.imagePath = imagePath;
    }
  }
  
module.exports = Share;

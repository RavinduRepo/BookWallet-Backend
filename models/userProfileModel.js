class UserProfile {
    constructor(userId, username, email, description, imageUrl) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}
module.exports = UserProfile;

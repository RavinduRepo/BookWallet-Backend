class Group {
  constructor(
    group_id,
    group_name,
    group_description,
    group_image_url,
    memberCount = 0, // Default to 0 if not provided
    discussionCount = 0, // Default to 0 if not provided
    memberIds = [], // Default to empty array if not provided
    membershipStatus = null // Add membership status (e.g., 'member', 'requested', or null)
  ) {
    this.group_id = group_id;
    this.group_name = group_name;
    this.group_description = group_description;
    this.group_image_url = group_image_url;
    this.memberCount = memberCount;
    this.discussionCount = discussionCount;
    this.memberIds = memberIds;
    this.membershipStatus = membershipStatus; // New field for membership status
  }
}

module.exports = Group;

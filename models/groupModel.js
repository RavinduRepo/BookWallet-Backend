class Group {
  constructor(
    group_id,
    group_name,
    group_description,
    group_image_url,
    createdAt,
    memberCount, // Default to 0 if not provided
    discussionCount = 0, // Default to 0 if not provided
    memberIds = [] // Default to empty array if not provided
  ) {
    this.group_id = group_id;
    this.group_name = group_name;
    this.group_description = group_description;
    this.group_image_url = group_image_url;
    this.createdAt = createdAt;
    this.memberCount = memberCount; // Add new fields
    this.discussionCount = discussionCount; // Add new fields
    this.memberIds = memberIds; // Add new fields
  }
}

module.exports = Group;

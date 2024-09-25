const searchService = require("../services/searchService");
const authService = require("../services/authService");

const searchUsers = async (req, res) => {
    const { query, index } = req.query;

    // Check if the required query parameters are present
    if (!query || !index) {
        return res.status(400).send({ error: "Query and index are required" });
    }

    try {
        // Call the searchUsers service and await the result
        const users = await searchService.seachUsers(query);

        // If no users are found, return a 404 response
        if (users.length === 0) {
            return res.status(404).send({ message: "No users found" });
        }
        // Return the found users with a 200 status
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error searching users:", error);

        // Return a 500 status for any server errors
        return res.status(500).send({ error: "Internal server error" });
    }
};


const searchGroups = async (req, res) => {
    const { query, index , user_id } = req.query;

    // Validate that both `query` and `index` are present
    if (!query || !index) {
        return res.status(400).send({ error: "Query and index are required" });
    }

    try {
        // Call the searchGroups service to find groups based on the query
        const groups = await searchService.searchGroups(query, user_id);

        // If no groups are found, return a 404 response
        if (groups.length === 0) {
            return res.status(404).send({ message: "No groups found" });
        }
        // If groups are found, return them with a 200 status
        return res.status(200).json(groups);
    } catch (error) {
        console.error("Error searching groups:", error);

        // Return a 500 status if any server error occurs
        return res.status(500).send({ error: "Internal server error" });
    }
};

module.exports = { searchUsers , searchGroups };

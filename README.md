# NodeJs server for the BookWallet project.

## Folder Structure
The project is organized into several key folders:

- **config/**: Contains configuration files for database connection and general application settings.
- **controllers/**: Handles incoming HTTP requests, processes them, and returns appropriate responses.
- **middlewares/**: Functions that process requests before they reach the controllers, such as authentication checks and error handling.
- **models/**: Defines the data structures and relationships, mapping to database tables using Sequelize.
- **routes/**: Maps HTTP endpoints to the corresponding controller functions.
- **services/**: Contains business logic that can be reused across different parts of the application.
- **utils/**: Utility functions and modules, such as logging and validation helpers.
    

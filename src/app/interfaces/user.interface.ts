/**
 * Represents a user entity
 */
export interface User {
    /**
     * Unique identifier for the user
     */
    id: string;
    /**
     * User's full name
     */
    name: string;
    /**
     * User's email address
     */
    email: string;
    /**
     * User's status (either "user" or "admin")
     */
    status: Status;
}

/**
 * User status type (either "user" or "admin")
 */
type Status = "user" | "admin";
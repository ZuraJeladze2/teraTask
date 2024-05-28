/**
 * Represents a user entity
 */
export interface User {
    /**
     * Unique identifier for the user
     */
    id: number;
    /**
     * User's full name
     */
    name: string;
    /**
     * User's email address
     */
    email: string;
    /**
     * User's role (either "user" or "admin")
     */
    role: Role;
}

/**
 * User Role type (either "user" or "admin")
 */
export type Role = "user" | "admin";
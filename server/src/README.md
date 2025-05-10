# Express Keycloak Memcached Example

This is an example Express.js application configured with Keycloak for authentication and authorization, using Memcached for session storage.

## Dependencies

- Express.js
- Cookie-parser
- Express-session
- Connect-memcached
- Keycloak-connect

## Usage

1. Set up environment variables:

Make sure you have the following environment variables set:

- `NODE_ENV`: Set to "development" for local development.
- `MEMCACHED_HOST`: Hostname and port for Memcached server (e.g., "localhost:11211" for local development).
- `MEMCACHED_HOST_SECRET`: Secret key for Memcached server.
- `SESSION_SECRET`: Secret key for session management.
- `KC_REALM`: Keycloak realm.
- `KC_AUTH_SERVER_URL`: URL of Keycloak authentication server.
- `KC_RESOURCE`: Resource name for Keycloak.


## Structure

- `api/router.js`: API routes.
- `static/`: Directory for static files.
- `app.js`: Main Express application file.

## Middleware

- `cookie-parser`: Parses cookies attached to the client request.
- `express.urlencoded`: Parses incoming requests with URL-encoded payloads.
- `express.json`: Parses incoming requests with JSON payloads.
- `express-session`: Sets up session management using Memcached.
- `connect-memcached`: Middleware for storing sessions in Memcached.
- `keycloak-connect`: Middleware for integrating Keycloak with Express.

## Keycloak Configuration

Keycloak configuration parameters are specified in the `kcConfig`.

## Routes

- Static files in the "static" directory are served.
- API routes are handled by `apiRouter`.

## Authentication and Authorization

- Keycloak middleware is used for authentication and authorization.
- Routes are protected using Keycloak's `protect()` middleware.

## Notes

- Ensure all environment variables are correctly set before running the application.
- The Memcached server should be running in a container with its IP address and port properly referenced in the `MEMCACHED_HOST` variable.


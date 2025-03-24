# GIOER Server
**GNU Image Online Extension Repository**

This is the server component of the GIOER project.

---
## Server Startup Instructions

1. Install **Docker**
2. Start the Docker containers
  ```bash
      npm run docker-up
  ```
3.Install project dependencies
  ```bash
      npm install
  ```
4.Start the server
  ```bash
      npm start
  ```

## Server Access
- API Endpoint: http://localhost:3000/api
- Swagger Documentation: http://localhost:3000/spec

## Example API requests
You can find example API requests in the **user.http** file.
It contains sample calls to test and interact with the server endpoints.

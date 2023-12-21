## About
Upon registering on the platform, users acquire the capability to log in using their phone number. Authentication is facilitated through the use of JWT (JSON Web Token). Following a successful login, users are provided with the flexibility to modify their batch at the commencement of each month and are also able to make payments at any point within the given month.

## Prerequisites

Ensure you have the following software installed on your machine:

- [Docker Desktop](https://www.docker.com/products/docker-desktop)

## Getting Started

To get a local copy up and running, follow these simple steps.
1.  Clone the repository
    ```sh
    git clone https://github.com/ankitrekha01/money
    cd money
    ```
2.  Create a `.env` file in the root of the project with necessary environment variables if not present but for development purposes its been provided.
3.  Ensure docker is running.
4.  Run Docker Compose:
    ```sh
    docker-compose up
    ```
## ER Diagram
![ER Diagram](https://github.com/ankitrekha01/money/assets/62371794/6d943924-8cf1-4256-abb5-f6220626428c)
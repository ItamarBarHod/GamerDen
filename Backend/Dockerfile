FROM node:20-buster

COPY . .

# Install dependencies for adding new repositories
RUN apt-get update && apt-get install -y \
    wget \
    gnupg2 \
    lsb-release

# Add PostgreSQL repository
RUN echo 'deb http://apt.postgresql.org/pub/repos/apt/ buster-pgdg main' > /etc/apt/sources.list.d/pgdg.list

# Import the repository signing key
RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -

# Update package lists and install PostgreSQL client
RUN apt-get update && apt-get install -y postgresql-client

# Clean up
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Your additional Dockerfile commands go here


RUN npm i 

CMD ["bash","WAIT_FOR_POSTGRES.sh"]


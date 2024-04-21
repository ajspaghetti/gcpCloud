# Dockerfile for Ruby on Rails API
# syntax=docker/dockerfile:1
FROM ruby:3.2.2-slim as base

# Set work directory
WORKDIR /app

# Install dependencies
RUN set -eux; \
    apt-get update -qq && apt-get install -y build-essential libpq-dev curl gnupg lsb-release; \
    curl -fsSL https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-debian92-4.0.28.tgz -o mongodb.tgz; \
    tar -xzf mongodb.tgz; \
    mv mongodb-linux-x86_64-debian92-4.0.28/bin/* /usr/local/bin/; \
    rm -rf mongodb-linux-x86_64-debian92-4.0.28 mongodb.tgz

# Copy Gemfile and install gems
COPY Gemfile* /app/
RUN bundle install

# Copy the main application.
COPY . /app

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# Expose port 3000 to the outside world
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]

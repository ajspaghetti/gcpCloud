# Set the base image
FROM docker.io/library/ubuntu:latest

# Install dependencies
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    bash \
    build-essential \
    curl \
    nodejs \
    npm \
    sqlite3 \
    tzdata \
    git \
    ruby \
    ruby-dev \
    libsqlite3-dev \
    libxml2-dev \
    libxslt1-dev \
    zlib1g-dev \
    libffi-dev \
    libssl-dev \
    libyaml-dev

# Install Bundler
RUN gem install bundler -v 2.5.4

# Create a non-root user
RUN adduser --disabled-password --gecos '' appuser

# Set the working directory
WORKDIR /app

# Copy Gemfile and Gemfile.lock
COPY Gemfile Gemfile.lock ./

# Change ownership of /app directory recursively
RUN chown -R appuser:appuser /app

# Switch to the non-root user
USER appuser

# Set Bundler config and install gems
RUN bundle config set --local without 'development test' && \
    bundle install --jobs 4 --retry 3

# Copy the rest of your application
COPY . .

# Precompile assets
RUN bundle exec rails assets:precompile

# Expose port 3000
EXPOSE 3000

# Start the Rails server
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]

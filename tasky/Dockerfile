# Building the binary of the App
FROM golang:1.19 AS build

WORKDIR /go/src/tasky
COPY . .
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /go/src/tasky/tasky

FROM alpine:3.17.0 as release

# Set default environment variables with actual sensitive values (not recommended for production)
ENV MONGODB_URI="mongodb://dbadmin:Yellowstone2019@34.145.239.124:27017/go-mongodb?authSource=admin"
ENV SECRET_KEY="sczmitCpq7r7j76NDSvjBC0pKvsAzbE-PEWx2hFSsr0PchldBLYEaMFUJGoRCoFAGAIqgFofP9_AOItR0dV47g"

WORKDIR /app
COPY --from=build /go/src/tasky/tasky .
COPY --from=build /go/src/tasky/assets ./assets

# Create a user and switch to it for security
RUN adduser -D taskyuser
USER taskyuser

EXPOSE 8080

# Health check (update with your actual health check endpoint)
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

ENTRYPOINT ["/app/tasky"]



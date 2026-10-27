# ==============================================================================
# MULTI-STAGE DOCKERFILE FOR SPRING BOOT PRODUCTION DEPLOYMENT
# ==============================================================================

# Stage 1: Build the Application
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source and package executable JAR
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Minimal Production Runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copy built JAR from builder
COPY --from=build --chown=appuser:appgroup /app/target/premium-portfolio-1.0.0.jar app.jar

# Environment defaults
ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]

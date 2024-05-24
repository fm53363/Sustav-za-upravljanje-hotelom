# Use a Maven image to build the app
FROM maven:3.8.4-openjdk-17 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven project files
COPY pom.xml .
COPY src ./src

# Run Maven build to create the jar file
RUN mvn clean package -DskipTests

# Use a base image with OpenJDK for running the app
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the jar file from the previous stage
COPY --from=build /app/target/*.jar /app/testapp.jar

# Expose the port the app runs on
EXPOSE 8080

# Command to run the app
ENTRYPOINT ["java", "-jar", "/app/testapp.jar"]

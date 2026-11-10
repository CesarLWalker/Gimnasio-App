FROM eclipse-temurin:21-jre
LABEL authors="USER"
WORKDIR /app
COPY target/gimnasio-backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8083
ENTRYPOINT ["java", "-jar", "app.jar"]
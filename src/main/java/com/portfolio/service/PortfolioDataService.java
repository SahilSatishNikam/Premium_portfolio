package com.portfolio.service;

import com.portfolio.dto.ProjectDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Service providing structured, truthful, and verified portfolio information.
 * Keeps portfolio content decoupled from view templates for easy maintenance.
 */
@Service
public class PortfolioDataService {

    @Value("${portfolio.owner.name:Sahil Nikam}")
    private String name;

    @Value("${portfolio.owner.title:SOFTWARE DEVELOPER}")
    private String title;

    @Value("${portfolio.owner.role:Software Developer Intern @ CodeMetric}")
    private String currentRole;

    @Value("${portfolio.owner.email:sahilnikam107@gmail.com}")
    private String email;

    @Value("${portfolio.owner.github:https://github.com/SahilSatishNikam}")
    private String githubUrl;

    @Value("${portfolio.owner.linkedin:https://www.linkedin.com/in/sahil-nikam-2b58b4317}")
    private String linkedinUrl;

    public Map<String, Object> getProfileData() {
        Map<String, Object> profile = new LinkedHashMap<>();
        profile.put("name", name);
        profile.put("monogram", "SN");
        profile.put("title", title);
        profile.put("role", currentRole);
        profile.put("company", "CodeMetric");
        profile.put("email", email);
        profile.put("github", githubUrl);
        profile.put("linkedin", linkedinUrl);
        profile.put("heroHeadline", "Building Ideas Into Software.");
        profile.put("heroLabel", "SOFTWARE DEVELOPER INTERN");
        profile.put("heroSubtitle", currentRole);
        profile.put("heroStatement", "Turning ideas into practical software through curiosity, problem-solving, and continuous improvement.");
        profile.put("supportingText", "I'm a Software Developer Intern at CodeMetric, focused on growing my engineering skills, solving problems, and building practical software solutions.");
        profile.put("status", "Active Intern & Open for Opportunities");
        return profile;
    }

    public List<ProjectDto> getProjects() {
        List<ProjectDto> list = new ArrayList<>();

        // 1. Technical Training Batch Management System
        list.add(new ProjectDto(
                "training-batch-management",
                "01",
                "Training Batch Management System",
                "ENTERPRISE APPLICATION",
                "A modular web application engineered for organizing technical training cohorts, coordinating trainers, and tracking learner syllabus progression.",
                "Replaces fragmented communication and error-prone spreadsheets with a centralized, relational workflow for batch scheduling and trainer assignments.",
                "A structured training operations system built with Spring Boot and Spring Data JPA. It features organized endpoints for managing batch schedules, assigning dedicated technical trainers, maintaining student rosters, and monitoring curriculum progress through clean RESTful APIs.",
                List.of("Java", "Spring Boot", "Spring Data JPA", "Hibernate", "MySQL", "REST APIs", "Thymeleaf", "JavaScript"),
                List.of(
                        "Batch management and instructor coordination workflows",
                        "Role-based operational dashboards for administrators and trainers",
                        "Trainer and learner profile tracking with syllabus milestone monitoring",
                        "Relational database schema with transactional persistence in MySQL"
                ),
                githubUrl,
                "",
                "ACTIVE PROJECT",
                "#3b82f6",
                "database"
        ));

        // 2. Employee Management System
        list.add(new ProjectDto(
                "employee-management",
                "02",
                "Employee Management System",
                "BACKEND REST API & CRUD",
                "A layered Spring Boot backend application delivering reliable CRUD operations and data integrity for enterprise employee records.",
                "Demonstrates an enterprise-grade layered architecture (Controller, Service, Repository) with strict separation of concerns and transactional safety.",
                "Built with clean architectural boundaries, this project delivers comprehensive REST endpoints to create, retrieve, update, and manage employee records while ensuring database transactions remain consistent through Spring Data JPA and Hibernate.",
                List.of("Java", "Spring Boot", "Spring Data JPA", "Hibernate", "MySQL", "Maven", "REST APIs"),
                List.of(
                        "Complete CRUD operations designed around standard HTTP methods and status codes",
                        "Layered Spring Boot architecture ensuring high testability and maintainability",
                        "Relational persistence and entity mapping with Spring Data JPA & Hibernate",
                        "Maven build automation and structured project dependency management"
                ),
                githubUrl,
                "",
                "ACTIVE PROJECT",
                "#8b5cf6",
                "server"
        ));

        // 3. Salon Management System
        list.add(new ProjectDto(
                "salon-management",
                "03",
                "Salon Management System",
                "JAVA WEB APPLICATION",
                "A Java enterprise web application automating appointment scheduling, client records, and service catalog workflows.",
                "Automates appointment coordination and service booking using traditional Java enterprise web architecture and direct database connectivity.",
                "A standalone Java application demonstrating server-side web fundamentals and database interactions. Provides customer booking management, appointment tracking, and service catalog administration via Java Servlets, JSP, and direct JDBC drivers.",
                List.of("Java Servlets", "JSP", "JDBC", "MySQL", "HTML5", "CSS3"),
                List.of(
                        "Server-rendered web workflows using Java Servlets and JSP",
                        "Direct relational query execution and transaction handling via JDBC",
                        "Service catalog administration and appointment booking coordination",
                        "Relational database schema for managing customers, appointments, and services"
                ),
                githubUrl,
                "",
                "COMPLETED PROJECT",
                "#06b6d4",
                "calendar"
        ));

        return list;
    }

    public Map<String, List<String>> getSkillsByCategory() {
        Map<String, List<String>> skills = new LinkedHashMap<>();

        skills.put("Programming Languages", List.of(
                "Java", "SQL", "JavaScript", "HTML5", "CSS3"
        ));

        skills.put("Backend Development", List.of(
                "Core Java", "Spring Boot", "REST APIs", "Spring Data JPA",
                "Hibernate", "JDBC", "Java 8 Streams & Lambdas", "OOP Principles"
        ));

        skills.put("Databases & Storage", List.of(
                "MySQL", "PostgreSQL", "Relational Schema Design", "Data Modeling"
        ));

        skills.put("Developer Tools & Workflow", List.of(
                "Git", "GitHub", "Maven", "Postman", "IntelliJ IDEA", "VS Code"
        ));

        skills.put("Software Development Concepts", List.of(
                "Layered Architecture", "MVC Pattern", "CRUD Operations",
                "Clean Code Practices", "API Testing & Validation", "Database Transactions"
        ));

        return skills;
    }

    public List<Map<String, Object>> getExperience() {
        List<Map<String, Object>> expList = new ArrayList<>();

        // Current role at CodeMetric
        Map<String, Object> current = new LinkedHashMap<>();
        current.put("id", "codemetric");
        current.put("role", "Software Developer Intern");
        current.put("company", "CodeMetric");
        current.put("period", "October 2026 – Present");
        current.put("type", "Internship");
        current.put("location", "India");
        current.put("isCurrent", true);
        current.put("description", "Software Developer Intern focused on growing engineering capabilities, developing practical software solutions, and strengthening technical problem-solving skills.");
        current.put("highlights", List.of(
                "Engaging in software development practices and practical application development",
                "Building foundational domain understanding in professional software development workflows",
                "Applying problem-solving and clean coding principles to technical challenges"
        ));
        current.put("technologies", List.of("Java", "Spring Boot", "Software Engineering"));
        expList.add(current);

        // Previous internship at Cravita Technologies
        Map<String, Object> cravita = new LinkedHashMap<>();
        cravita.put("id", "cravita");
        cravita.put("role", "Software Developer Intern");
        cravita.put("company", "Cravita Technologies");
        cravita.put("period", "Dec 2025 – Jun 2026");
        cravita.put("type", "Internship");
        cravita.put("location", "Pune, India");
        cravita.put("isCurrent", false);
        cravita.put("description", "Gained practical hands-on experience in backend engineering workflows, database operations, and API testing in a collaborative development team.");
        cravita.put("highlights", List.of(
                "Contributed to software development modules and backend logic implementation",
                "Tested and validated API endpoints using Postman to verify request/response payloads",
                "Practiced version control workflows using Git and GitHub in a collaborative environment"
        ));
        cravita.put("technologies", List.of("Java", "Spring Boot", "MySQL", "Postman", "Git", "GitHub"));
        expList.add(cravita);

        return expList;
    }

    public List<Map<String, String>> getDevelopmentApproach() {
        List<Map<String, String>> steps = new ArrayList<>();

        steps.add(Map.of(
                "step", "01",
                "title", "Understand the Problem",
                "description", "Deconstruct the core challenge, user context, and project goals to ensure the right problem is being targeted."
        ));
        steps.add(Map.of(
                "step", "02",
                "title", "Analyze Requirements",
                "description", "Define technical constraints, data entities, business rules, and API specifications before writing code."
        ));
        steps.add(Map.of(
                "step", "03",
                "title", "Design the Solution",
                "description", "Architect clean boundaries using Controller-Service-Repository separation and schema design."
        ));
        steps.add(Map.of(
                "step", "04",
                "title", "Implement Functionality",
                "description", "Write clean, readable, object-oriented Java code adhering to maintainable standards and conventions."
        ));
        steps.add(Map.of(
                "step", "05",
                "title", "Test and Debug",
                "description", "Validate API contracts and edge cases systematically using Postman, logging, and unit tests."
        ));
        steps.add(Map.of(
                "step", "06",
                "title", "Refine and Improve",
                "description", "Review implementation for efficiency, error handling, security, and potential maintainability improvements."
        ));

        return steps;
    }

    public Map<String, Object> getEducationAndCertification() {
        Map<String, Object> data = new LinkedHashMap<>();

        data.put("education", Map.of(
                "degree", "Bachelor of Computer Science (BCS)",
                "college", "Karmaveer Bhaurao Patil College, Urun-Ishwarpur",
                "university", "Shivaji University, Kolhapur",
                "location", "Maharashtra, India",
                "description", "Studied fundamental computer science principles including Object-Oriented Programming (OOP), Data Structures and Algorithms, Relational Database Management Systems (RDBMS), Software Engineering, and Web Development."
        ));

        data.put("certification", Map.of(
                "title", "Java Full Stack Development",
                "institution", "Fortune Cloud",
                "description", "Professional training program focused on practical backend engineering with Core Java, Spring Boot, Spring Data JPA, Hibernate, RESTful Web Services, and MySQL database persistence.",
                "highlights", List.of(
                        "Core Java fundamentals and Java 8 functional features (Streams, Lambdas)",
                        "Enterprise application architecture with Spring Boot and Spring Data JPA",
                        "RESTful API design and relational persistence with Hibernate and MySQL"
                )
        ));

        return data;
    }
}

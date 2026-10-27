# Premium Software Developer Portfolio - Sahil Nikam

A high-performance personal developer portfolio built for **Sahil Nikam**, Software Developer Intern at **CodeMetric**.

---

## 🌟 Technical Highlights

* **Backend Framework**: Java 21 LTS & Spring Boot 3.3.4
* **View Layer**: Thymeleaf server-rendered templates with clean fragment modularity
* **Persistence**: Spring Data JPA & Hibernate with zero-config H2 runtime persistence (and MySQL production driver ready)
* **API Validation & Security**:
  * Jakarta Bean Validation (`@NotBlank`, `@Email`, `@Size`)
  * In-memory sliding-window rate limiting on contact submissions (max 5 requests / 15 minutes per IP)
  * Honeypot bot trap field to silently drop automated spam
  * Enterprise HTTP security headers filter (HSTS, Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
* **Visuals & 3D**:
  * Interactive Three.js 3D geometric cybernetic visualization with mouse parallax and reduced-motion fallback
  * GSAP and ScrollTrigger staggered entrance animations with IntersectionObserver fallback
  * Interactive Developer Terminal simulator demonstrating Spring Boot runtime startup logs
* **Design System**: Sophisticated dark architecture, custom CSS variables, Outfit & Plus Jakarta Sans typography, JetBrains Mono code glyphs, glassmorphic cards with responsive layouts.

---

## 📂 Project Architecture

```
Premium_portfolio-1/
├── pom.xml                               # Maven project definition
├── .gitignore                            # Environment & build exclusions
├── README.md                             # Documentation & setup guide
├── src/
│   └── main/
│       ├── java/com/portfolio/
│       │   ├── PortfolioApplication.java # Spring Boot main entry
│       │   ├── config/
│       │   │   ├── SecurityHeadersFilter.java # CSP, HSTS, X-Frame-Options
│       │   │   └── WebMvcConfig.java          # Static resource caching
│       │   ├── controller/
│       │   │   ├── HomeController.java        # Serves Thymeleaf template
│       │   │   └── ContactApiController.java  # REST endpoint /api/contact
│       │   ├── dto/
│       │   │   ├── ApiResponse.java           # Standard API response wrapper
│       │   │   ├── ContactRequest.java        # Validated contact form DTO
│       │   │   └── ProjectDto.java            # Featured projects DTO
│       │   ├── entity/
│       │   │   └── ContactMessage.java        # JPA persistence entity
│       │   ├── repository/
│       │   │   └── ContactMessageRepository.java # Spring Data JPA repository
│       │   ├── service/
│       │   │   ├── ContactService.java        # Contact processing & sanitization
│       │   │   ├── PortfolioDataService.java  # Truthful portfolio data provider
│       │   │   └── RateLimiterService.java    # Sliding window rate limiter
│       │   └── exception/
│       │       └── GlobalExceptionHandler.java # Standardized error handling
│       └── resources/
│           ├── application.properties         # Server & database settings
│           ├── templates/
│           │   ├── index.html                 # Master Thymeleaf page
│           │   └── fragments/                 # Modular sections (navbar, hero, etc.)
│           └── static/
│               ├── css/                       # Design system, components, animations
│               ├── js/                        # Three.js 3D scene, GSAP, contact form
│               └── images/                    # Favicon & assets
```

---

## 🚀 Running Locally

### Prerequisites
* **Java 21** or later (`java -version`)
* **Maven 3.8+** (`mvn -version`)

### Execution
1. Clone or navigate to the repository directory:
   ```bash
   cd "c:\GitHub Projects\premium_portfolio\Premium_portfolio-1"
   ```

2. Compile and package the application:
   ```bash
   mvn clean package -DskipTests
   ```

3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

---

## 🔒 Security Principles Enforced
* Zero hardcoded credentials or API tokens in source code or Git.
* Strict input validation with HTML entity escaping to neutralize XSS vectors.
* Parameterized queries through Spring Data JPA to prevent SQL injection.
* Honeypot field and sliding-window rate limiting to deter bot automation.
* Zero external JavaScript build step required for deployment.

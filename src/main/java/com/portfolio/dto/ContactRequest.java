package com.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ContactRequest {

    @NotBlank(message = "Please provide your name.")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters.")
    private String name;

    @NotBlank(message = "Please provide your email address.")
    @Email(message = "Please provide a valid email address.")
    @Size(max = 150, message = "Email cannot exceed 150 characters.")
    private String email;

    @NotBlank(message = "Please provide a subject.")
    @Size(min = 3, max = 150, message = "Subject must be between 3 and 150 characters.")
    private String subject;

    @NotBlank(message = "Please enter your message.")
    @Size(min = 10, max = 3000, message = "Message must be between 10 and 3000 characters.")
    private String message;

    // Honeypot field - must remain empty; bots populate this automatically
    private String companyUrl;

    public ContactRequest() {
    }

    public ContactRequest(String name, String email, String subject, String message) {
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.message = message;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name != null ? name.trim() : null;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email != null ? email.trim().toLowerCase() : null;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject != null ? subject.trim() : null;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message != null ? message.trim() : null;
    }

    public String getCompanyUrl() {
        return companyUrl;
    }

    public void setCompanyUrl(String companyUrl) {
        this.companyUrl = companyUrl;
    }
}

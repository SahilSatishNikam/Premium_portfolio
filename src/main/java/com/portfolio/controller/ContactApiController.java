package com.portfolio.controller;

import com.portfolio.dto.ApiResponse;
import com.portfolio.dto.ContactRequest;
import com.portfolio.service.ContactService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
public class ContactApiController {

    private final ContactService contactService;

    public ContactApiController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> submitContact(
            @Valid @RequestBody ContactRequest request,
            HttpServletRequest httpServletRequest
    ) {
        String clientIp = extractClientIp(httpServletRequest);
        contactService.processContactMessage(request, clientIp);
        return ResponseEntity.ok(ApiResponse.ok("Thank you! Your message has been sent successfully."));
    }

    private String extractClientIp(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null || xfHeader.isBlank()) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0].trim();
    }
}

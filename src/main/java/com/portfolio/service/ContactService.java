package com.portfolio.service;

import com.portfolio.dto.ContactRequest;
import com.portfolio.entity.ContactMessage;
import com.portfolio.repository.ContactMessageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.HtmlUtils;

@Service
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);

    private final ContactMessageRepository repository;
    private final RateLimiterService rateLimiterService;

    public ContactService(ContactMessageRepository repository, RateLimiterService rateLimiterService) {
        this.repository = repository;
        this.rateLimiterService = rateLimiterService;
    }

    /**
     * Ingests, validates, sanitizes, and persists a visitor contact message.
     *
     * @param request  Validated contact form payload
     * @param clientIp Client remote IP address
     * @return true if successfully saved (or silently dropped for bots)
     */
    @Transactional
    public boolean processContactMessage(ContactRequest request, String clientIp) {
        // 1. Honeypot check: If bot populated hidden 'companyUrl' field, return true silently
        if (request.getCompanyUrl() != null && !request.getCompanyUrl().trim().isEmpty()) {
            log.warn("Honeypot triggered from IP: {}. Silently dropping automated submission.", clientIp);
            return true;
        }

        // 2. Sliding window rate limiting
        if (!rateLimiterService.allowRequest(clientIp)) {
            log.warn("Rate limit exceeded for IP: {} on contact endpoint", clientIp);
            throw new RateLimitExceededException("Too many message requests. Please wait a few minutes before trying again.");
        }

        // 3. Strict HTML Entity Sanitization to neutralize script injection / XSS payloads
        String sanitizedName = HtmlUtils.htmlEscape(request.getName());
        String sanitizedEmail = request.getEmail().trim().toLowerCase();
        String sanitizedSubject = HtmlUtils.htmlEscape(request.getSubject());
        String sanitizedMessage = HtmlUtils.htmlEscape(request.getMessage());

        // 4. Persistence
        ContactMessage messageEntity = new ContactMessage(
                sanitizedName,
                sanitizedEmail,
                sanitizedSubject,
                sanitizedMessage,
                clientIp
        );

        repository.save(messageEntity);
        log.info("Secure contact message persisted from: <{}> (IP: {})", sanitizedEmail, clientIp);

        return true;
    }

    public static class RateLimitExceededException extends RuntimeException {
        public RateLimitExceededException(String message) {
            super(message);
        }
    }
}

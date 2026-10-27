package com.portfolio.config;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * Filter enforcing enterprise HTTP security headers across all responses.
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class SecurityHeadersFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        if (response instanceof HttpServletResponse httpServletResponse) {
            // Clickjacking defense
            httpServletResponse.setHeader("X-Frame-Options", "DENY");

            // MIME-sniffing prevention
            httpServletResponse.setHeader("X-Content-Type-Options", "nosniff");

            // Referrer policy
            httpServletResponse.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

            // Permissions policy
            httpServletResponse.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");

            // Strict Transport Security (HSTS) - 1 year
            httpServletResponse.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

            // Cross-site scripting filter legacy fallback
            httpServletResponse.setHeader("X-XSS-Protection", "1; mode=block");

            // Content Security Policy allowing CDNs for Google Fonts, GSAP, and Three.js
            String csp = "default-src 'self'; "
                    + "script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; "
                    + "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
                    + "font-src 'self' https://fonts.gstatic.com; "
                    + "img-src 'self' data: https:; "
                    + "connect-src 'self'; "
                    + "object-src 'none'; "
                    + "frame-ancestors 'none';";
            httpServletResponse.setHeader("Content-Security-Policy", csp);
        }
        chain.doFilter(request, response);
    }
}

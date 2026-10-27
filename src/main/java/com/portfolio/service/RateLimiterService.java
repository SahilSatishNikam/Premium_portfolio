package com.portfolio.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

/**
 * Thread-safe sliding window rate limiter to protect public endpoints from abuse.
 */
@Service
public class RateLimiterService {

    private final Map<String, ConcurrentLinkedQueue<Long>> requestLogs = new ConcurrentHashMap<>();

    @Value("${portfolio.ratelimit.requests-per-window:5}")
    private int maxRequestsPerWindow;

    @Value("${portfolio.ratelimit.window-minutes:15}")
    private int windowMinutes;

    /**
     * Determines whether a client IP is allowed to execute a protected action.
     *
     * @param clientIp The remote client IP address
     * @return true if allowed; false if rate limit exceeded
     */
    public boolean allowRequest(String clientIp) {
        if (clientIp == null || clientIp.isBlank()) {
            clientIp = "anonymous";
        }

        long now = Instant.now().toEpochMilli();
        long windowStart = now - (windowMinutes * 60L * 1000L);

        ConcurrentLinkedQueue<Long> timestamps = requestLogs.computeIfAbsent(
                clientIp,
                k -> new ConcurrentLinkedQueue<>()
        );

        synchronized (timestamps) {
            // Evict expired timestamps outside the sliding window
            Iterator<Long> iterator = timestamps.iterator();
            while (iterator.hasNext()) {
                Long timestamp = iterator.next();
                if (timestamp < windowStart) {
                    iterator.remove();
                } else {
                    break;
                }
            }

            if (timestamps.size() >= maxRequestsPerWindow) {
                return false;
            }

            timestamps.add(now);
            return true;
        }
    }

    /**
     * Returns remaining requests in current window for client IP.
     */
    public int getRemainingRequests(String clientIp) {
        ConcurrentLinkedQueue<Long> timestamps = requestLogs.get(clientIp);
        if (timestamps == null) {
            return maxRequestsPerWindow;
        }
        long windowStart = Instant.now().toEpochMilli() - (windowMinutes * 60L * 1000L);
        long activeCount = timestamps.stream().filter(t -> t >= windowStart).count();
        return Math.max(0, maxRequestsPerWindow - (int) activeCount);
    }
}

package com.portfolio.service;

import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    private final ObjectProvider<JavaMailSender> mailSenderProvider;

    @Value("${spring.mail.username:}")
    private String mailUsername;

    @Value("${portfolio.mail.to:sahilnikam005@gmail.com}")
    private String recipientEmail;

    @Value("${portfolio.mail.enabled:true}")
    private boolean mailEnabled;

    public EmailService(ObjectProvider<JavaMailSender> mailSenderProvider) {
        this.mailSenderProvider = mailSenderProvider;
    }

    /**
     * Sends an email notification to the portfolio owner when a new contact inquiry arrives.
     * Safe execution: Never disrupts message persistence if SMTP is unconfigured or unavailable.
     */
    public void sendContactNotification(String senderName, String senderEmail, String subject, String messageContent, String clientIp) {
        if (!mailEnabled) {
            log.info("Email delivery is disabled via portfolio.mail.enabled configuration.");
            return;
        }

        JavaMailSender mailSender = mailSenderProvider.getIfAvailable();

        if (mailSender == null || mailUsername == null || mailUsername.trim().isEmpty()) {
            log.warn("=== CONTACT NOTIFICATION PENDING SMTP CREDENTIALS ===");
            log.warn("From: {} <{}>", senderName, senderEmail);
            log.warn("Subject: {}", subject);
            log.warn("Target Inbox: {}", recipientEmail);
            log.warn("Note: To deliver emails directly to {}, configure SPRING_MAIL_USERNAME and SPRING_MAIL_PASSWORD (e.g. Gmail App Password).", recipientEmail);
            log.warn("====================================================");
            return;
        }

        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");

            helper.setFrom(mailUsername, "Portfolio Contact Form");
            helper.setTo(recipientEmail);
            helper.setReplyTo(senderEmail, senderName);
            helper.setSubject("[Portfolio Inquiry] " + subject);

            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            String htmlContent = buildHtmlEmail(senderName, senderEmail, subject, messageContent, clientIp, timestamp);

            helper.setText(htmlContent, true);

            mailSender.send(mimeMessage);
            log.info("Successfully dispatched contact notification email to: {}", recipientEmail);

        } catch (Exception e) {
            log.error("Failed to send contact notification email to {}: {}", recipientEmail, e.getMessage(), e);
        }
    }

    private String buildHtmlEmail(String senderName, String senderEmail, String subject, String messageContent, String clientIp, String timestamp) {
        return "<!DOCTYPE html>"
                + "<html>"
                + "<head><meta charset='UTF-8'></head>"
                + "<body style='margin:0;padding:24px;background-color:#0b0f19;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;color:#e2e8f0;'>"
                + "<div style='max-width:600px;margin:0 auto;background:#131c31;border:1px solid #1e293b;border-radius:12px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.5);'>"
                + "<div style='background:linear-gradient(135deg,#3b82f6,#8b5cf6);padding:24px;text-align:left;'>"
                + "<h2 style='margin:0;color:#ffffff;font-size:20px;font-weight:700;'>New Portfolio Inquiry</h2>"
                + "<p style='margin:6px 0 0 0;color:#e0e7ff;font-size:13px;'>Received via Sahil Nikam's Developer Portfolio</p>"
                + "</div>"
                + "<div style='padding:28px;'>"
                + "<table style='width:100%;border-collapse:collapse;margin-bottom:24px;'>"
                + "<tr><td style='padding:8px 0;color:#94a3b8;font-size:13px;width:120px;'>Sender:</td><td style='padding:8px 0;color:#f8fafc;font-weight:600;font-size:15px;'>" + senderName + "</td></tr>"
                + "<tr><td style='padding:8px 0;color:#94a3b8;font-size:13px;'>Email:</td><td style='padding:8px 0;'><a href='mailto:" + senderEmail + "' style='color:#38bdf8;text-decoration:none;font-weight:500;'>" + senderEmail + "</a></td></tr>"
                + "<tr><td style='padding:8px 0;color:#94a3b8;font-size:13px;'>Subject:</td><td style='padding:8px 0;color:#f8fafc;font-size:14px;'>" + subject + "</td></tr>"
                + "<tr><td style='padding:8px 0;color:#94a3b8;font-size:13px;'>Received:</td><td style='padding:8px 0;color:#94a3b8;font-size:13px;'>" + timestamp + " (IP: " + clientIp + ")</td></tr>"
                + "</table>"
                + "<div style='background:#0f172a;border-left:4px solid #3b82f6;padding:18px;border-radius:6px;margin-bottom:24px;'>"
                + "<div style='font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#38bdf8;margin-bottom:8px;font-weight:600;'>Message</div>"
                + "<div style='color:#f1f5f9;font-size:14px;line-height:1.7;white-space:pre-wrap;'>" + messageContent + "</div>"
                + "</div>"
                + "<div style='text-align:center;margin-top:20px;'>"
                + "<a href='mailto:" + senderEmail + "?subject=" + java.net.URLEncoder.encode("Re: " + subject, java.nio.charset.StandardCharsets.UTF_8) + "' style='display:inline-block;background:#3b82f6;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:6px;font-weight:600;font-size:14px;'>Reply to " + senderName + "</a>"
                + "</div>"
                + "</div>"
                + "<div style='background:#0b1120;padding:16px 24px;text-align:center;color:#64748b;font-size:12px;border-top:1px solid #1e293b;'>"
                + "Sahil Nikam • Software Developer Intern @ CodeMetric"
                + "</div>"
                + "</div>"
                + "</body></html>";
    }
}

package com.portfolio.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.concurrent.TimeUnit;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Cache static assets (CSS, JS, images) with standard HTTP cache headers
        registry.addResourceHandler("/static/**", "/css/**", "/js/**", "/images/**")
                .addResourceLocations(
                        "classpath:/static/",
                        "classpath:/static/css/",
                        "classpath:/static/js/",
                        "classpath:/static/images/"
                )
                .setCacheControl(CacheControl.maxAge(7, TimeUnit.DAYS).cachePublic());
    }
}

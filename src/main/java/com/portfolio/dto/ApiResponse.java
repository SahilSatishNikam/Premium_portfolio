package com.portfolio.dto;

import java.time.Instant;

public class ApiResponse<T> {

    private boolean success;
    private String message;
    private long timestamp;
    private T data;

    public ApiResponse() {
        this.timestamp = Instant.now().toEpochMilli();
    }

    public ApiResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
        this.timestamp = Instant.now().toEpochMilli();
    }

    public ApiResponse(boolean success, String message, T data) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.timestamp = Instant.now().toEpochMilli();
    }

    public static <T> ApiResponse<T> ok(String message) {
        return new ApiResponse<>(true, message);
    }

    public static <T> ApiResponse<T> ok(String message, T data) {
        return new ApiResponse<>(true, message, data);
    }

    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(false, message);
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}

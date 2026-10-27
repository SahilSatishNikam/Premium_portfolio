package com.portfolio.dto;

import java.util.List;

public class ProjectDto {

    private String slug;
    private String number;
    private String title;
    private String category;
    private String summary;
    private String problemSolved;
    private String description;
    private List<String> stack;
    private List<String> highlights;
    private String githubUrl;
    private String liveDemoUrl;
    private String status;
    private String accentColor;
    private String iconType;

    public ProjectDto() {
    }

    public ProjectDto(String slug, String number, String title, String category, String summary,
                      String problemSolved, String description, List<String> stack,
                      List<String> highlights, String githubUrl, String liveDemoUrl,
                      String status, String accentColor, String iconType) {
        this.slug = slug;
        this.number = number;
        this.title = title;
        this.category = category;
        this.summary = summary;
        this.problemSolved = problemSolved;
        this.description = description;
        this.stack = stack;
        this.highlights = highlights;
        this.githubUrl = githubUrl;
        this.liveDemoUrl = liveDemoUrl;
        this.status = status;
        this.accentColor = accentColor;
        this.iconType = iconType;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getProblemSolved() {
        return problemSolved;
    }

    public void setProblemSolved(String problemSolved) {
        this.problemSolved = problemSolved;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getStack() {
        return stack;
    }

    public void setStack(List<String> stack) {
        this.stack = stack;
    }

    public List<String> getHighlights() {
        return highlights;
    }

    public void setHighlights(List<String> highlights) {
        this.highlights = highlights;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }

    public String getLiveDemoUrl() {
        return liveDemoUrl;
    }

    public void setLiveDemoUrl(String liveDemoUrl) {
        this.liveDemoUrl = liveDemoUrl;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAccentColor() {
        return accentColor;
    }

    public void setAccentColor(String accentColor) {
        this.accentColor = accentColor;
    }

    public String getIconType() {
        return iconType;
    }

    public void setIconType(String iconType) {
        this.iconType = iconType;
    }
}

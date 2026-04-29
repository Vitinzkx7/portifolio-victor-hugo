package com.portfolio.backend.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ProjectDTO {
    private Long id;
    private String name;
    private String description;
    private String repositoryUrl;
    private String liveDemoUrl;
    private String imageUrl;
    private LocalDateTime createdAt;
    private List<SkillDTO> skills;
}

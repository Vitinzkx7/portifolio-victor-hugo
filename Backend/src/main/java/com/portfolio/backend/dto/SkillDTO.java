package com.portfolio.backend.dto;

import lombok.Data;

@Data
public class SkillDTO {
    private Long id;
    private String name;
    private String category;
    private Integer proficiencyLevel;
    private String iconSvg;
}

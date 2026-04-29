package com.portfolio.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "skills")
@Data
@NoArgsConstructor
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String name;

    @Column(nullable = false, length = 50)
    private String category;

    @Column(name = "proficiency_level")
    private Integer proficiencyLevel;

    @Column(name = "icon_svg", columnDefinition = "TEXT")
    private String iconSvg;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    @ManyToMany(mappedBy = "skills")
    @ToString.Exclude
    private Set<Project> projects = new HashSet<>();
}

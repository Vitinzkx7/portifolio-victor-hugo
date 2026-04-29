package com.portfolio.backend.service;

import com.portfolio.backend.dto.ProjectDTO;
import com.portfolio.backend.dto.SkillDTO;
import com.portfolio.backend.model.Project;
import com.portfolio.backend.model.Skill;
import com.portfolio.backend.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    @Transactional(readOnly = true)
    public List<ProjectDTO> getAllProjects() {
        return projectRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ProjectDTO convertToDTO(Project project) {
        ProjectDTO dto = new ProjectDTO();
        dto.setId(project.getId());
        dto.setName(project.getName());
        dto.setDescription(project.getDescription());
        dto.setRepositoryUrl(project.getRepositoryUrl());
        dto.setLiveDemoUrl(project.getLiveDemoUrl());
        dto.setImageUrl(project.getImageUrl());
        dto.setCreatedAt(project.getCreatedAt());

        if (project.getSkills() != null) {
            dto.setSkills(project.getSkills().stream()
                    .map(this::convertSkillToDTO)
                    .collect(Collectors.toList()));
        }

        return dto;
    }

    private SkillDTO convertSkillToDTO(Skill skill) {
        SkillDTO dto = new SkillDTO();
        dto.setId(skill.getId());
        dto.setName(skill.getName());
        dto.setCategory(skill.getCategory());
        dto.setProficiencyLevel(skill.getProficiencyLevel());
        dto.setIconSvg(skill.getIconSvg());
        return dto;
    }
}

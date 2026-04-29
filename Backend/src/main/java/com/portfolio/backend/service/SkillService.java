package com.portfolio.backend.service;

import com.portfolio.backend.dto.SkillDTO;
import com.portfolio.backend.model.Skill;
import com.portfolio.backend.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SkillService {

    private final SkillRepository skillRepository;

    public List<SkillDTO> getAllSkills() {
        return skillRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private SkillDTO convertToDTO(Skill skill) {
        SkillDTO dto = new SkillDTO();
        dto.setId(skill.getId());
        dto.setName(skill.getName());
        dto.setCategory(skill.getCategory());
        dto.setProficiencyLevel(skill.getProficiencyLevel());
        dto.setIconSvg(skill.getIconSvg());
        return dto;
    }
}

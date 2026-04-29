package com.portfolio.backend.controller;

import com.portfolio.backend.dto.ApiResponse;
import com.portfolio.backend.dto.ContactRequest;
import com.portfolio.backend.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<ApiResponse> submitContactForm(@Valid @RequestBody ContactRequest request) {
        try {
            contactService.processContactMessage(request);
            return ResponseEntity.ok(new ApiResponse(true, "MENSAGEM ENVIADA COM SUCESSO. LOGO ENTRAREI EM CONTATO."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "ERRO AO ENVIAR MENSAGEM. TENTE NOVAMENTE MAIS TARDE."));
        }
    }
}

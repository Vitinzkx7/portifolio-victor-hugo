package com.portfolio.backend.service;

import com.portfolio.backend.dto.ContactRequest;
import com.portfolio.backend.model.ContactMessage;
import com.portfolio.backend.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;
    private final JavaMailSender mailSender;

    public void processContactMessage(ContactRequest request) {
        log.info("Processing new contact message from: {}", request.getEmail());

        ContactMessage message = ContactMessage.builder()
                .name(request.getName())
                .email(request.getEmail())
                .subject(request.getSubject())
                .message(request.getMessage())
                .build();

        try {
            contactMessageRepository.save(message);
            log.info("Message saved successfully to DATABASE with ID: {}", message.getId());
        } catch (Exception e) {
            log.error("Failed to save message to DATABASE: {}", e.getMessage(), e);
            throw new RuntimeException("Database save failed", e);
        }
        
        sendEmailNotification(request);
    }

    private void sendEmailNotification(ContactRequest request) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom("victornex2006@hotmail.com");
            mailMessage.setTo("victornex2006@hotmail.com");
            mailMessage.setSubject("NOVO CONTATO PORTFÓLIO: " + (request.getSubject() != null && !request.getSubject().isEmpty() ? request.getSubject() : "Sem assunto"));
            
            String text = String.format("Você recebeu uma nova mensagem de contato do seu portfólio.\n\n" +
                            "Nome: %s\n" +
                            "E-mail: %s\n" +
                            "Mensagem:\n%s",
                    request.getName(), request.getEmail(), request.getMessage());
                    
            mailMessage.setText(text);
            
            mailSender.send(mailMessage);
            log.info("Email notification sent successfully to victornex2006@hotmail.com via Outlook SMTP");
        } catch (Exception e) {
            log.error("Failed to send email notification (Check your Hotmail password / App Password): {}", e.getMessage(), e);
            // We log the error but don't throw it, so the user still sees "Success" since it was saved to the DB.
        }
    }
}

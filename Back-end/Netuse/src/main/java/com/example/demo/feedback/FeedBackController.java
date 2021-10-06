package com.example.demo.feedback;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.bind.ValidationException;

@RestController
@RequestMapping("/feedback")
public class FeedBackController {

    private EmailCfg emailCfg;

    public FeedBackController(EmailCfg emailCfg) {
        this.emailCfg = emailCfg;
    }



    public void sendFeedback(@RequestBody FeedBack feedback){

        //Create a email sender
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        EmailCfg em = new EmailCfg();
        em.setPort(25);
        em.setPassword("90f3875615cc5e");
        em.setUsername("d21ef151c2f238");
        em.setHost("smtp.mailtrap.io");
        mailSender.setHost(em.getHost());
        mailSender.setPort(em.getPort());
        mailSender.setUsername(em.getUsername());
        mailSender.setPassword(em.getPassword());

        //Create a email instance
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom(feedback.getEmail());
        mailMessage.setTo("netuse@feedback");
        mailMessage.setSubject("New feedback from" + feedback.getName());
        mailMessage.setText(feedback.getFeedback());
        //mailMessage.setText("mail est "+feedback.getEmail()+" meesgae: ");
        //Send Mail
        mailSender.send(mailMessage);

    }
    public FeedBackController() {
    }

    public void sendFeedback2(@RequestBody FeedBack feedback){

        //Create a email sender
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        EmailCfg em = new EmailCfg();
        em.setPort(25);
        em.setPassword("90f3875615cc5e");
        em.setUsername("d21ef151c2f238");
        em.setHost("smtp.mailtrap.io");
        mailSender.setHost(em.getHost());
        mailSender.setPort(em.getPort());
        mailSender.setUsername(em.getUsername());
        mailSender.setPassword(em.getPassword());

        //Create a email instance
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(feedback.getEmail());
        mailMessage.setFrom("netuse@feedback");
        mailMessage.setSubject("New feedback from" + feedback.getName());
        mailMessage.setText("message");


        //Send Mail
        mailSender.send(mailMessage);

    }

}

package com.example.demo.web;

import com.example.demo.entites.Contact;
import com.example.demo.entites.Ticket;
import com.example.demo.feedback.EmailCfg;
import com.example.demo.feedback.FeedBack;
import com.example.demo.feedback.FeedBackController;
import com.example.demo.repository.ContactRepository;
import com.example.demo.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class ContactRestService {
    JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
    EmailCfg em = new EmailCfg();

    @Autowired
    private ContactRepository contactRepository;
    @Autowired
    private FeedBackController feedBackController;

    @RequestMapping(value="/contacts",method=RequestMethod.GET)
    public List<Contact> getContacts(){
        return contactRepository.findAll();
    }

    @RequestMapping(value="/contacts",method=RequestMethod.POST)
    public Contact save(@RequestBody Contact c ){

        FeedBack feedBack= new FeedBack();
        feedBack.setFeedback(c.getMessage());
        feedBack.setEmail(c.getEmail());
        //c.setStatus(c.getStatus());
        feedBackController.sendFeedback2(feedBack);
        return contactRepository.save(c);
    }

}

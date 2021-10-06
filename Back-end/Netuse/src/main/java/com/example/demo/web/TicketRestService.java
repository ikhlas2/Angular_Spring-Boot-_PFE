package com.example.demo.web;


import com.example.demo.feedback.FeedBack;
import com.example.demo.feedback.FeedBackController;
import com.example.demo.models.User;
import com.example.demo.repository.TicketRepository;
import com.example.demo.entites.Ticket;
import com.example.demo.repository.UserRepository;
import org.aspectj.apache.bcel.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
//@CrossOrigin("*")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class TicketRestService {
    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private FeedBackController feedBackController;

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value="/tickets",method=RequestMethod.GET)
    public List<Ticket> getTickets(){
        return ticketRepository.findAll();
    }


    @RequestMapping(value="/tickets/recherche/{nom}",method=RequestMethod.GET)
    public Page<Ticket> getTickets (@PathVariable String nom,String mc,Pageable pageable){
        return ticketRepository.findByNomContains(nom,pageable);
    }
    @RequestMapping(value="/tickets/chercherTickets",method=RequestMethod.GET)
    public Page<Ticket>chercher(
            @RequestParam (name="mc",defaultValue="")String mc,
            @RequestParam (name="page",defaultValue="0")int page,
            @RequestParam (name="size",defaultValue="5")int size){
        return ticketRepository.chercher("%"+mc+"%", PageRequest.of(page, size));
    }
    @RequestMapping(value="/tickets/recherche/{nomSociete}",method=RequestMethod.GET)
    public Page<Ticket> getSociete (@PathVariable String nomSociete,String mc,Pageable pageable){
        return ticketRepository.findByNomContains(nomSociete,pageable);
    }
    @RequestMapping(value="/tickets/{id}",method= RequestMethod.GET)
    public Ticket getTickets(@PathVariable Long id ){
        return ticketRepository.findById(id).get();
    }

    @GetMapping("/users/{userId}/ticket")
    public List < Ticket > getCoursesByInstructor(@PathVariable(value = "userId") Long userId) {
        return ticketRepository.findByUserId(userId);
    }


    @RequestMapping(value="/sendmailwithid/{id}/{email}",method= RequestMethod.GET)
    public void sendIdTicketToClient(@PathVariable Long id,@PathVariable String email ){
        FeedBack feedBack= new FeedBack();
        feedBack.setFeedback(String.valueOf(id));
        feedBack.setEmail(email);
        feedBack.setName("Your Ticket Id");
        feedBackController.sendFeedback(feedBack);
    }

    @RequestMapping(value="/tickets",method=RequestMethod.POST)
    public Ticket save(@RequestBody Ticket c ){
        FeedBack feedBack= new FeedBack();
        feedBack.setFeedback(c.getCommentaire());
        feedBack.setEmail(c.getEmail());
        feedBack.setName(c.getNom());
        //c.setStatus(c.getStatus());
        feedBackController.sendFeedback(feedBack);
        return ticketRepository.save(c);
    }

    @RequestMapping(value="/tickets/{id}",method=RequestMethod.DELETE)
    public boolean supprimer(@PathVariable Long id ){
        ticketRepository.deleteById(id);
        return true;
    }
    @RequestMapping(value="/tickets/{id}",method=RequestMethod.PUT)
    public Ticket save(@PathVariable Long id,@RequestBody Ticket c ){
        c.setId(id);
        c.setUser(ticketRepository.findById(id).get().getUser());
        return ticketRepository.save(c);
    }

    @RequestMapping(value="/tickets/affectTicket/{idticket}/{iduser}",method=RequestMethod.PUT)
    public Ticket affectUserToTicket(@PathVariable Long idticket,@PathVariable Long iduser){
        User newUser = userRepository.findById(iduser).get();
        Ticket newTicket = ticketRepository.findById(idticket).get();
        newTicket.setUser(newUser);
        FeedBack feedBack= new FeedBack();
        feedBack.setFeedback(" le ticket de client   "+newTicket.getNom() +" id : "+newTicket.getId());
        feedBack.setEmail(newUser.getEmail());
        feedBack.setName(newUser.getUsername());
        feedBackController.sendFeedback(feedBack);
        return ticketRepository.save(newTicket);
    }

    @RequestMapping(value="/tickets/closeTicket/{id}",method= RequestMethod.GET)
    public Ticket close(@PathVariable Long id ){
        Ticket newTicket = ticketRepository.findById(id).get();
        newTicket.setStatus("close");
        return ticketRepository.save(newTicket);
    }

}

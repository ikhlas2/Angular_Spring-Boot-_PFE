package com.example.demo;

import com.example.demo.entites.Contact;
import com.example.demo.repository.ContactRepository;
import com.example.demo.repository.TicketRepository;
import com.example.demo.entites.Ticket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

@SpringBootApplication
public class DemoApplication implements CommandLineRunner {
	@Autowired
	private TicketRepository ticketRepository;
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
		System.out.println(org.hibernate.Version.getVersionString());

	}
	@Override
	public void run(String... args) throws Exception {
		DateFormat df=new SimpleDateFormat("dd/MM/yyyy");
		//ContactRepository.save(new Contact("Jouini","Mahran","mahran@gmail.com","Panne","panne"));

		//ticketRepository.save(new Ticket("Jouini","Mahran","OMPV","mahran@gmail.com","formatage","panne","Haute",12333));
		// ticketRepository.findAll().forEach(c ->{
			//System.out.println(c.getNom());
			//System.out.println("everything is OK");
		//});
	}
}

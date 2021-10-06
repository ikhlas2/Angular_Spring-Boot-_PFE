package com.example.demo.repository;

import com.example.demo.entites.Contact;
import com.example.demo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource
//@CrossOrigin("*")
@CrossOrigin(origins = "http://localhost:4200")
public interface ContactRepository extends JpaRepository<Contact, Long> {
}

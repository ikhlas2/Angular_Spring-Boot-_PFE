package com.example.demo.repository;

import com.example.demo.entites.Ticket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


@RepositoryRestResource
//@CrossOrigin("*")
@CrossOrigin(origins = "http://localhost:4200")
public interface TicketRepository extends JpaRepository<Ticket,Long>{
    @CrossOrigin("*")
    List<Ticket> findByUserId(Long userId);

    @Query("select c from Ticket c where c.nomSociete like :x ")
    public Page<Ticket> chercher(@Param("x") String mc , Pageable pageable);
    @RestResource(path = "/byNomPage")
    public Page<Ticket> findByNomContains(@Param("mc") String nom, Pageable pageable);





}

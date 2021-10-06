package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import com.example.demo.models.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Repository
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

     Optional<User> findByRoles(String role);

     @Query("select u from User u where u.username like :x")

    public Page<User> chercher(@Param("x")String mc, Pageable pageable);

    @Query("select u from User u where u.username like :x")
    public List<User> chercherList(@Param("x")String mc);
}

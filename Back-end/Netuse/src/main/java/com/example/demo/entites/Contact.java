package com.example.demo.entites;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;
@Entity
public class Contact implements Serializable {
    @Id
    @GeneratedValue
    private  Long id;
    private String nom;
    private String prenom;
    private String  email;
    private String sujet;
    private String message;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSujet() {
        return sujet;
    }

    public void setSujet(String sujet) {
        this.sujet = sujet;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
    public Contact(){
        super();
        //TODO Auto-generated constructor stub
    }
    public Contact( String nom, String prenom, String email, String sujet, String message) {
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.sujet = sujet;
        this.message = message;
    }
}

package com.example.demo.entites;

import com.example.demo.models.User;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
public class Ticket implements Serializable {
    @Id @GeneratedValue
    private  Long id;
    private String nom;
    private String prenom;
    private String nomSociete;
    private String  email;
    @Temporal(TemporalType.DATE)
    private Date date;
    private String type;
    private String commentaire;
    private String priorite;
    private String status;
    private String tel;
    private boolean accepted;

    public boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

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

    public String getNomSociete() {
        return nomSociete;
    }

    public void setNomSociete(String nomSociete) {
        this.nomSociete = nomSociete;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public String getPriorite() {
        return priorite;
    }

    public void setPriorite(String priorite) {
        this.priorite = priorite;
    }

    public String getTel() {
        return tel;
    }


    public void setTel(String tel) {
        this.tel = tel;
    }

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Ticket(){
        super();
        //TODO Auto-generated constructor stub
    }

    public Ticket(String nom, String prenom, String nomSociete, String email,Date date ,String type, String commentaire, String priorite, String tel) {
        this.nom = nom;
        this.prenom = prenom;
        this.nomSociete = nomSociete;
        this.email = email;
        this.date = date;
        this.type = type;
        this.commentaire = commentaire;
        this.priorite = priorite;
        this.tel = tel;
    }
}

package com.example.demo.web;

import com.example.demo.entites.Ticket;
import com.example.demo.feedback.FeedBack;
import com.example.demo.models.ERole;
import com.example.demo.models.Role;
import com.example.demo.models.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class UserRestService {
    @Autowired

    private UserRepository userRepository;

    @Autowired
    FilesStorageService storageService;

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public List<User> getUser() {
        return userRepository.findAll();
    }

    @RequestMapping(value = "/users/{id}", method = RequestMethod.GET)
    public User getUser(@PathVariable Long id) {
        return userRepository.findById(id).get();
    }

    @RequestMapping(value="/users/{id}",method=RequestMethod.PUT)
    public User save(@PathVariable("id") Long id ,@RequestBody User u){
        u.setId(id);
        return userRepository.save(u);
    }
    @RequestMapping(value="/users/{id}",method=RequestMethod.DELETE)
    public boolean supprimer(@PathVariable Long id ){
        userRepository.deleteById(id);
        return true;
    }
    @RequestMapping(value="/users",method=RequestMethod.POST)
    public User save(@RequestBody User u ){
        return userRepository.save(u);
    }


@RequestMapping(value = "/chercherUsersTechenicien",method = RequestMethod.GET)
public Page<User> chercherUsersTecnicien(@RequestParam(name = "mc",defaultValue = "")String mc,
                                        @RequestParam(name = "page" ,defaultValue = "0") int page,
                                        @RequestParam(name = "size",defaultValue = "5") int size){
        List<User> users = new ArrayList<User>();
        for(User user : userRepository.chercherList("%" +mc+ "%")){
            for (Role role : user.getRoles()){
                if (role.getName().equals(ERole.ROLE_TECHNICIEN)) {
                    users.add(user);
                }
            }
        }
        Page<User> userPageble = new PageImpl<>(users);
      return userPageble;
}
    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file) {
        String message = "";
        try {
           storageService.save(file);
            return file.getOriginalFilename();

        } catch (Exception e) {
            message = "Could not upload the file";
            return message;
        }
   }
}

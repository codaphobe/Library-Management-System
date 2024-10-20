package com.pu.lms.controllers;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.pu.lms.dao.AuthorsDAO;
import com.pu.lms.entities.Authors;

@RestController
@RequestMapping("/author")
public class AuthorsControllers {
	
    @Autowired
    private AuthorsDAO repo;
    
    @PostMapping
    public Authors insert(@RequestBody Authors c) {
        return repo.save(c);
    }
    
    @PutMapping("/edit/{id}")
    public Authors update(@PathVariable int id, @RequestBody Authors a) {
        Authors au = repo.findById(id).get();
           au.setAuth_name(a.getAuth_name());
           au.setDob(a.getDob());
           au.setGender(a.getGender());
           return repo.save(au);
    }
    
    @RequestMapping("/getAll")
    public List<Authors> fetchAll() {
        return (List<Authors>) repo.findAll();        
    }
    
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable int id) {
         repo.deleteById(id);
    }
    
    @GetMapping("/getByName/{name}")
    public List<Authors> fetchByName(@PathVariable String name){
        
        List<Authors> stu = repo.findAll();
        
        List<Authors> filteredAuthors = new ArrayList<>();
        for (Authors Authors : stu) {
            if (Authors.getAuth_name().equals(name)) {
                filteredAuthors.add(Authors);
            }
        }
        
        return filteredAuthors;
    }
}
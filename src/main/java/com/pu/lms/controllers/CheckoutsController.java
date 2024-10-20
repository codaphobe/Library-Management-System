package com.pu.lms.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.pu.lms.dao.CheckoutsDAO;
import com.pu.lms.entities.Checkouts;

@RestController
@RequestMapping("/checkouts")
public class CheckoutsController {
    @Autowired
    private CheckoutsDAO repo;
    
    @PostMapping
    public Checkouts insert(@RequestBody Checkouts c) {
        return repo.save(c);
    }
    
    @PutMapping("/edit/{id}")
    public Checkouts update(@PathVariable int id, @RequestBody Checkouts c) {
        Checkouts co = repo.findById(id).get();
           co.setBook_id(c.getBook_id());
           co.setCheckout_date(c.getCheckout_date());
           co.setReturn_date(c.getReturn_date());
           co.setStudent_id(c.getStudent_id());
           return repo.save(co);
    }
    
    
    @GetMapping("/getAll")
    public List<Checkouts> fetchAll() {
        return (List<Checkouts>) repo.findAll();
        
    }
    
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable int id) {
         repo.deleteById(id);
    }
    
    @GetMapping("/getById/{id}")
    public Optional<Checkouts> fetchById(@PathVariable int id){
        return  repo.findById(id);
    }
}

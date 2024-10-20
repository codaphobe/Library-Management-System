package com.pu.lms.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.pu.lms.dao.BooksDAO;
import com.pu.lms.entities.Books;

@RestController
@RequestMapping("/book")
public class BooksController {
    
    @Autowired
    private BooksDAO repo;
    
    @PostMapping
    public Books insert(@RequestBody Books c) {
        return repo.save(c);
    }
    
    @PutMapping("/edit/{id}")
    public Books update(@PathVariable int id, @RequestBody Books c) {
			
	       Books books = repo.findById(id).get();
           books.setBook_title(c.getBook_title());
           books.setGenre(c.getGenre());
           books.setBook_auth_id(c.getBook_auth_id());
           books.setBook_aval(c.getBook_aval());
           return repo.save(books);
    }
    
    
    @GetMapping("/getAll")
    public List<Books> fetchAll() {
        return (List<Books>) repo.findAll();
        
    }
    
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable int id) {
         repo.deleteById(id);
    }
    
    @RequestMapping("/getById/{id}")
    public Optional<Books> fetchById(@PathVariable int id){
        return  repo.findById(id);
    }
    
}

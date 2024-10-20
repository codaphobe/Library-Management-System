package com.pu.lms.controllers;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.pu.lms.dao.StudentDAO;
import com.pu.lms.entities.Student;

@RestController
@RequestMapping("/student")
public class StudentController {
    
    
    @Autowired
    private StudentDAO repo;
    
    @PostMapping
    public Student insert(@RequestBody Student s) {
        return repo.save(s);
    }
    
    @PutMapping("/edit/{id}")
    public Student update(@PathVariable int id, @RequestBody Student s) {
           Student stu = repo.findById(id).get();          
           stu.setName(s.getName());
           stu.setEmail(s.getEmail());
           stu.setPhone(s.getPhone());
           return repo.save(stu);
    }
    
    
    @RequestMapping("/getAll")
    public List<Student> fetchAll() {
        return (List<Student>) repo.findAll();
        
    }
    
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable int id) {
         repo.deleteById(id);
    }
    
    @GetMapping("/getByName/{name}")
    public List<Student> fetchByName(@PathVariable String name){
        
        List<Student> stu = repo.findAll();
        
        List<Student> filteredStudents = new ArrayList<>();
        for (Student student : stu) {
            if (student.getName().equals(name)) {
                filteredStudents.add(student);
            }
        }
        
        return filteredStudents;
    }
}

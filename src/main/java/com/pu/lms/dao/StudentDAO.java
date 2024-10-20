package com.pu.lms.dao;

import org.springframework.stereotype.Repository;

import com.pu.lms.entities.Student;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface StudentDAO extends JpaRepository<Student,Integer> {


}

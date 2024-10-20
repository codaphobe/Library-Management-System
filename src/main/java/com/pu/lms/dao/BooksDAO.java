package com.pu.lms.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pu.lms.entities.Books;

@Repository
public interface BooksDAO extends JpaRepository<Books,Integer> {


}

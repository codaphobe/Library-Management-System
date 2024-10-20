package com.pu.lms.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pu.lms.entities.Authors;

@Repository
public interface AuthorsDAO extends JpaRepository<Authors,Integer> {


}

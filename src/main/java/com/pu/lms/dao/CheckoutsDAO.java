package com.pu.lms.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pu.lms.entities.Checkouts;

@Repository
public interface CheckoutsDAO extends JpaRepository<Checkouts,Integer> {


}


package com.pu.lms.entities;

import jakarta.persistence.*;

@Entity
@Table(name="Author")
public class Authors {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;
    
    @Column(name="author_name")
    private String auth_name;
    
    @Column(name="author_gender")
    private String gender; 		
    
    @Column(name="author_dob")
    private String dob;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAuth_name() {
		return auth_name;
	}

	public void setAuth_name(String auth_name) {
		this.auth_name = auth_name;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public Authors(int id, String auth_name, String gender, String dob) {
		super();
		this.id = id;
		this.auth_name = auth_name;
		this.gender = gender;
		this.dob = dob;
	}

	@Override
	public String toString() {
		return "Authors [id=" + id + ", auth_name=" + auth_name + ", gender=" + gender + ", dob=" + dob + "]";
	}

	public Authors() {
		super();
		// TODO Auto-generated constructor stub
	}
}
    
	
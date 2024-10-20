package com.pu.lms.entities;

import jakarta.persistence.*;

@Entity
@Table(name="Checkouts")
public class Checkouts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;
    
    @Column(name="book_id")
    private int book_id;
    
    @Column(name="student_id")
    private int student_id; //1 or 0
    
    @Column(name="checkout_date")
    private String checkout_date;
    @Column(name="return_date")
    private String return_date;
    
    
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getBook_id() {
		return book_id;
	}
	public void setBook_id(int book_id) {
		this.book_id = book_id;
	}
	public int getStudent_id() {
		return student_id;
	}
	public void setStudent_id(int student_id) {
		this.student_id = student_id;
	}
	public String getCheckout_date() {
		return checkout_date;
	}
	public void setCheckout_date(String checkout_date) {
		this.checkout_date = checkout_date;
	}
	public String getReturn_date() {
		return return_date;
	}
	public void setReturn_date(String return_date) {
		this.return_date = return_date;
	}
	public Checkouts(int id, int book_id, int student_id, String checkout_date, String return_date) {
		super();
		this.id = id;
		this.book_id = book_id;
		this.student_id = student_id;
		this.checkout_date = checkout_date;
		this.return_date = return_date;
	}
	public Checkouts() {
		super();
		// TODO Auto-generated constructor stub
	}
    
  
	

    
}

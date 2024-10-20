package com.pu.lms.entities;

import jakarta.persistence.*;

@Entity
@Table(name="Books")
public class Books {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name="book_title")
    private String book_title;
    @Column(name="book_available")
    private int book_aval; //1 or 0
    @Column(name="book_genre")
    private String genre;
    @Column(name="book_author_id")
    private int book_auth_id;
    
    
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getBook_title() {
		return book_title;
	}
	public void setBook_title(String book_title) {
		this.book_title = book_title;
	}
	public int getBook_aval() {
		return book_aval;
	}
	public void setBook_aval(int book_aval) {
		this.book_aval = book_aval;
	}
	public String getGenre() {
		return genre;
	}
	public void setGenre(String genre) {
		this.genre = genre;
	}
	public int getBook_auth_id() {
		return book_auth_id;
	}
	public void setBook_auth_id(int book_auth_id) {
		this.book_auth_id = book_auth_id;
	}
	public Books(int id, String book_title, int book_aval, String genre, int book_auth_id) {
		super();
		this.id = id;
		this.book_title = book_title;
		this.book_aval = book_aval;
		this.genre = genre;
		this.book_auth_id = book_auth_id;
	}
	public Books() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    
	
    

}

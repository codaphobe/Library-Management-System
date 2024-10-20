$(document).ready(function() {
    // Check if the current page is the books page
    if ($('#books-page-identifier').length) {
        // Attach event listeners for books-related functionality
        $('#add-book-btn').click(showAddBookForm);
        $('#update-book-btn').click(showUpdateBookForm);
        $('#delete-book-btn').click(showDeleteBookForm);
        $('#fetch-book-title-btn').click(showFetchBookByTitleForm);
        $('#fetch-all-books-btn').click(showFetchAllBooks);

        // Add book
        $('#book-form').on('submit', function(event) {
            event.preventDefault();
            const bookTitle = $('#book-title').val();
            const bookAuthor = $('#book-author').val();
            const bookgenre = $('#book-genre').val();
            const bookaval = $('#book-aval').val();
            
            const data = {
				genre:bookgenre,
				book_title:bookTitle,
				book_aval:bookaval,
				book_auth_id:bookAuthor
			}
            
			fetch('http://localhost:8083/book', {
		                method: 'POST',
		                headers: {
		                    'Content-Type': 'application/json'
		                },
		                body: JSON.stringify(data)
		            })
		            .then(response => response.json())
		            .then(data => {
		                console.log('Success:', data);
		                alert('Book information submitted successfully!');
		            })
		            .catch((error) => {
		                console.error('Error:', error);
		                alert('Error submitting Book information.');
		            });

            $('#book-form')[0].reset();
            
        });

        // Update book
        $('#update-book-form').on('submit', function(event) {
            event.preventDefault();
            const bookId = $('#update-book-id').val();
            const bookTitle = $('#update-book-title').val();
            const bookAuthor = parseInt($('#update-book-author').val());
            const bookgenre = $('#update-book-genre').val();
            const bookaval = parseInt($('#update-book-aval').val());
            
            let id = parseInt(bookId);
            
            const data = {
				genre:bookgenre,
				book_title:bookTitle,
				book_aval:bookaval,
				book_auth_id:bookAuthor
			}
			
			
            
			fetch(`http://localhost:8083/book/edit/${id}`, {
		                method: 'PUT',
		                headers: {
		                    'Content-Type': 'application/json'
		                },
		                body: JSON.stringify(data)
		            })
		            .then(response => response.json())
		            .then(data => {
		                console.log('Success:', data);
		                alert('Book information updated successfully!');
		            })
		            .catch((error) => {
		                console.error('Error:', error);
		                alert('Error updating book information.');
		            });

            $('#update-book-form')[0].reset();
          
        });

        // Delete book
        $('#delete-book-form').on('submit', function(event) {
            event.preventDefault();
            const bookId = parseInt($('#delete-book-id').val());
            fetch(`http://localhost:8083/book/delete/${bookId}`, {
		                method: 'DELETE',
		                headers: {
		                    'Content-Type': 'application/json'
		                }		                
		            })
		            .then(response => response.json())
		            .then(data => {
		                console.log('Success:', data);
		                alert('Book information deleted successfully!');
		            })
		            .catch((error) => {
		                console.error('Error:', error);
		                alert('Error deleting Book information.');
		            });
            $('#delete-book-form')[0].reset();
            
        });

        // Fetch book by id
        $('#fetch-book-title-form').on('submit', function(event) {
            event.preventDefault();
            const bookId = parseInt($('#fetch-book-id').val());
            
			fetch(`http://localhost:8083/book/getById/${bookId}`)
                .then(response => response.json())
                .then(books => {
                    const resultDiv = document.getElementById('result');
                    resultDiv.innerHTML = ''; // Clear previous results

                    if (books.length === 0) {
                        resultDiv.innerHTML = '<div class="alert alert-warning" role="alert">No books found with that name.</div>';
                    } else {
                        
                        const bookCard = `
                            <div class="card my-3">
                                <div class="card-body">
                                    <h5 class="card-title">ID: ${books.id}</h5>
                                    <p class="card-text"><strong>Name:</strong> ${books.book_title}</p>
                                    <p class="card-text"><strong>Genre:</strong> ${books.genre}</p>
                                    <p class="card-text"><strong>Author Id:</strong> ${books.book_auth_id}</p>
                                    <p class="card-text"><strong>Available(1:true || 0: False):</strong> ${books.book_aval}</p>
                                </div>
                            </div>
                        `;
                            resultDiv.innerHTML += bookCard;
                        
                    }
                })
                .catch(error => {
                    console.error('Error fetching book:', error);
                    const resultDiv = document.getElementById('result');
                    resultDiv.innerHTML = '<div class="alert alert-danger mt-3" role="alert">Error fetching book information.</div>';
                });

            $('#fetch-book-title-form')[0].reset();
            
        });

        // Fetch all books
        function fetchAllBooks() {
            fetch('http://localhost:8083/book/getAll')
                .then(response => response.json())
                .then(books => {
                    const resultDiv = document.getElementById('book-list');
                    resultDiv.innerHTML = ''; // Clear previous results

                    if (books.length === 0) {
                        resultDiv.innerHTML = '<div class="alert alert-warning" role="alert">No books found.</div>';
                    } else {
                        books.forEach(book => {
                            const bookCard = `
                                <div class="card my-3">
                                    <div class="card-body">
                                        <h5 class="card-title">ID: ${book.id}</h5>
                                        <p class="card-text"><strong>Name:</strong> ${book.book_title}</p>
                                        <p class="card-text"><strong>Genre:</strong> ${book.genre}</p>
                                        <p class="card-text"><strong>Author Id:</strong> ${book.book_auth_id}</p>
                                        <p class="card-text"><strong>Available(1:true || 0: False):</strong> ${book.book_aval}</p>
                                    </div>
                                </div>
                            `;
                            resultDiv.innerHTML += bookCard;
                        });
                    }
                })
                .catch(error => {
                    console.error('Error fetching books:', error);
                    const resultDiv = document.getElementById('result');
                    resultDiv.innerHTML = '<div class="alert alert-danger" role="alert">Error fetching book information.</div>';
                });
        }

        // Show and hide forms for Books
        function showAddBookForm() {
            hideAllForms();
            $('#book-form-container').show();
        }

        function showUpdateBookForm() {
            hideAllForms();
            $('#update-book-form-container').show();
        }

        function showDeleteBookForm() {
            hideAllForms();
            $('#delete-book-form-container').show();
        }

        function showFetchBookByTitleForm() {
            hideAllForms();
            $('#fetch-book-title-form-container').show();
        }

        function showFetchAllBooks() {
            hideAllForms();
            $('#fetch-all-books-container').show();
            fetchAllBooks();
        }

        function hideAllForms() {
            $('#book-form-container').hide();
            $('#update-book-form-container').hide();
            $('#delete-book-form-container').hide();
            $('#fetch-book-title-form-container').hide();
            $('#fetch-all-books-container').hide();
        }
    }
});

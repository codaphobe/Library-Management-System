$(document).ready(function() {
    // Check if the current page is the checkout page
    if ($('#checkout-page-identifier').length) {
        // Attach event listeners for checkout-related functionality
        $('#add-checkout-btn').click(showAddCheckoutForm);
        $('#update-checkout-btn').click(showUpdateCheckoutForm);
        $('#delete-checkout-btn').click(showDeleteCheckoutForm);
        $('#fetch-checkout-id-btn').click(showFetchCheckoutByIdForm);
        $('#fetch-all-checkouts-btn').click(showFetchAllCheckouts);

        // Add checkout
        $('#checkout-form').on('submit', function(event) {
            event.preventDefault();
            const bookId = parseInt($('#book-id').val());
            const studentId = parseInt($('#student-id').val());
            const returnDate = $('#return-date').val();
            const checkoutDate = $('#checkout-date').val();
            
            const data = {
				book_id:bookId,
				student_id:studentId,
				checkout_date:checkoutDate,
				return_date:returnDate
			}
            
            fetch('http://localhost:8083/checkouts', {
		                method: 'POST',
		                headers: {
		                    'Content-Type': 'application/json'
		                },
		                body: JSON.stringify(data)
		            })
		            .then(response => response.json())
		            .then(data => {
		                console.log('Success:', data);
		                alert('Checkout information submitted successfully!');
		            })
		            .catch((error) => {
		                console.error('Error:', error);
		                alert('Error submitting checkout information.');
		            });

            $('#checkout-form')[0].reset();
            
        });

        // Update checkout
        $('#update-checkout-form').on('submit', function(event) {
            event.preventDefault();
            const checkoutId = parseInt($('#update-checkout-id').val());
            const bookId = parseInt($('#update-book-id').val());
            const studentId = parseInt($('#update-student-id').val());
            const returnDate = $('#update-return-date').val();
            const checkoutDate = $('#update-checkout-date').val();
            
            const data = {
				book_id:bookId,
				student_id:studentId,
				checkout_date:checkoutDate,
				return_date:returnDate
			}            
            
            fetch(`http://localhost:8083/checkouts/edit/${checkoutId}`, {
		                method: 'PUT',
		                headers: {
		                    'Content-Type': 'application/json'
		                },
		                body: JSON.stringify(data)
		            })
		            .then(response => response.json())
		            .then(data => {
		                console.log('Success:', data);
		                alert('Checkout information updated successfully!');
		            })
		            .catch((error) => {
		                console.error('Error:', error);
		                alert('Error updating checkout information.');
		            });

            
            $('#update-checkout-form')[0].reset();
            
        });

        // Delete checkout
        $('#delete-checkout-form').on('submit', function(event) {
            event.preventDefault();
            const checkoutId = parseInt($('#delete-checkout-id').val());
            
			fetch(`http://localhost:8083/checkouts/delete/${checkoutId}`, {
		                method: 'DELETE',
		                headers: {
		                    'Content-Type': 'application/json'
		                }		                
		            })
		            .then(response => response.json())
		            .then(data => {
		                console.log('Success:', data);
		                alert('Checkout information deleted successfully!');
		            })
		            .catch((error) => {
		                console.error('Error:', error);
		                alert('Error deleting Checkout information.');
		            });

            $('#delete-checkout-form')[0].reset();  
        });

        // Fetch checkout by ID
        $('#fetch-checkout-id-form').on('submit', function(event) {
            event.preventDefault();
            const checkoutId = parseInt($('#fetch-checkout-id').val());
            fetch(`http://localhost:8083/checkouts/getById/${checkoutId}`)
                .then(response => response.json())
                .then(checkouts => {
                    const resultDiv = document.getElementById('result');
                    resultDiv.innerHTML = ''; // Clear previous results

                    if (checkouts.length === 0) {
                        resultDiv.innerHTML = '<div class="alert alert-warning" role="alert">No checkout found with that id.</div>';
                    } else {
                        
                        const checkoutCard = `
                            <div class="card my-3">
                                <div class="card-body">
                                    <h5 class="card-title">ID: ${checkouts.id}</h5>
                                    <p class="card-text"><strong>Book Id:</strong> ${checkouts.book_id}</p>
                                    <p class="card-text"><strong>Student Id:</strong> ${checkouts.student_id}</p>
                                    <p class="card-text"><strong>Checkout Date:</strong> ${checkouts.checkout_date}</p>
                                    <p class="card-text"><strong>Return Date:</strong> ${checkouts.return_date}</p>
                                </div>
                            </div>
                        `;
                            resultDiv.innerHTML += checkoutCard;
                        
                    }
                })
                .catch(error => {
                    console.error('Error fetching book:', error);
                    const resultDiv = document.getElementById('result');
                    resultDiv.innerHTML = '<div class="alert alert-danger mt-3" role="alert">Error fetching book information.</div>';
                });
            $('#fetch-checkout-id-form')[0].reset();
            
        });

        // Fetch all checkouts
        function fetchAllCheckouts() {
            fetch('http://localhost:8083/checkouts/getAll')
                .then(response => response.json())
                .then(checkouts => {
                    const resultDiv = document.getElementById('checkouts-list');
                    resultDiv.innerHTML = ''; // Clear previous results

                    if (checkouts.length === 0) {
                        resultDiv.innerHTML = '<div class="alert alert-warning" role="alert">No checkouts found.</div>';
                    } else {
                        checkouts.forEach(checkout => {
                             const checkoutCard = `
                            <div class="card my-3">
                                <div class="card-body">
                                    <h5 class="card-title">ID: ${checkout.id}</h5>
                                    <p class="card-text"><strong>Book Id:</strong> ${checkout.book_id}</p>
                                    <p class="card-text"><strong>Student Id:</strong> ${checkout.student_id}</p>
                                    <p class="card-text"><strong>Checkout Date:</strong> ${checkout.checkout_date}</p>
                                    <p class="card-text"><strong>Return Date:</strong> ${checkout.return_date}</p>
                                </div>
                            </div>
                        `;
                            resultDiv.innerHTML += checkoutCard;
                        });
                    }
                })
                .catch(error => {
                    console.error('Error fetching checkouts:', error);
                    const resultDiv = document.getElementById('result');
                    resultDiv.innerHTML = '<div class="alert alert-danger" role="alert">Error fetching checkout information.</div>';
                });
        }

        // Show and hide forms for Checkouts
        function showAddCheckoutForm() {
            hideAllForms();
            $('#checkout-form-container').show();
        }

        function showUpdateCheckoutForm() {
            hideAllForms();
            $('#update-checkout-form-container').show();
        }

        function showDeleteCheckoutForm() {
            hideAllForms();
            $('#delete-checkout-form-container').show();
        }

        function showFetchCheckoutByIdForm() {
            hideAllForms();
            $('#fetch-checkout-id-form-container').show();
        }

        function showFetchAllCheckouts() {
            hideAllForms();
            $('#fetch-all-checkouts-container').show();
            fetchAllCheckouts();
        }

        function hideAllForms() {
            $('#checkout-form-container').hide();
            $('#update-checkout-form-container').hide();
            $('#delete-checkout-form-container').hide();
            $('#fetch-checkout-id-form-container').hide();
            $('#fetch-all-checkouts-container').hide();
        }
    }
});

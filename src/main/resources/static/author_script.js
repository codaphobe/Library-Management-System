// Using jQuery for document ready
$(document).ready(function() {
    // Check if the current page is the author page
    if ($('#author-page-identifier').length) {
        // Attach event listeners for author-related functionality
        $('#add-author-btn').click(showAddAuthorForm);
        $('#update-author-btn').click(showUpdateAuthorForm);
        $('#delete-author-btn').click(showDeleteAuthorForm);
        $('#fetch-author-name-btn').click(showFetchAuthorByNameForm);
        $('#fetch-all-author-btn').click(showFetchAllAuthors);

        // Add author
        $('#author-form').on('submit', function(event) {
            event.preventDefault();
            const authorName = $('#author-name').val();
            const authordob = $('#author-dob').val();
            const authorgender = $('#author-gender').val();
            const data = {
				                auth_name: authorName,
				                dob: authordob,
				                gender: authorgender
				            };
            fetch('http://localhost:8083/author', {
		                method: 'POST',
		                headers: {
		                    'Content-Type': 'application/json'
		                },
		                body: JSON.stringify(data)
		            })
		            .then(response => response.json())
		            .then(data => {
		                console.log('Success:', data);
		                alert('Author information submitted successfully!');
		            })
		            .catch((error) => {
		                console.error('Error:', error);
		                alert('Error submitting author information.');
		            });
		        
            $('#author-form')[0].reset();
            
        });

        // Update author
        $('#update-author-form').on('submit', function(event) {
            event.preventDefault();
            const temp = $('#update-author-id').val();
            let author_id = parseInt(temp);
            const authorName = $('#update-author-name').val();
            const authordob = $('#update-author-dob').val();
            const authorgender = $('#update-author-gender').val();
            
            const data = {
		  			auth_name: authorName,
	                dob: authordob,
	                gender: authorgender
			}
            
            fetch(`http://localhost:8083/author/edit/${author_id}`, {
		                method: 'PUT',
		                headers: {
		                    'Content-Type': 'application/json'
		                },
		                body: JSON.stringify(data)
		            })
		            .then(response => response.json())
		            .then(data => {
		                console.log('Success:', data);
		                alert('Author information updated successfully!');
		            })
		            .catch((error) => {
		                console.error('Error:', error);
		                alert('Error updating author information.');
		            });
            
            $('#update-author-form')[0].reset();
            
        });

        // Delete author
        $('#delete-author-form').on('submit', function(event) {
            event.preventDefault();
            const authorId = parseInt($('#delete-author-id').val());
            fetch(`http://localhost:8083/author/delete/${authorId}`, {
		                method: 'DELETE',
		                headers: {
		                    'Content-Type': 'application/json'
		                }		                
		            })
		            .then(response => response.json())
		            .then(data => {
		                console.log('Success:', data);
		                alert('Author information deleted successfully!');
		            })
		            .catch((error) => {
		                console.error('Error:', error);
		                alert('Error deleting author information.');
		            });
            $('#delete-author-form')[0].reset();
           
        });

        // Fetch author by name
        $('#fetch-author-name-form').on('submit', function(event) {
            event.preventDefault();
            const authorName = $('#fetch-author-name').val();
            
            fetch(`http://localhost:8083/author/getByName/${authorName}`)
                .then(response => response.json())
                .then(authors => {
                    const resultDiv = document.getElementById('result');
                    resultDiv.innerHTML = ''; // Clear previous results

                    if (authors.length === 0) {
                        resultDiv.innerHTML = '<div class="alert alert-warning" role="alert">No authors found with that name.</div>';
                    } else {
                        authors.forEach(author => {
                            const authorCard = `
                                <div class="card my-3">
                                    <div class="card-body">
                                        <h5 class="card-title">ID: ${author.id}</h5>
                                        <p class="card-text"><strong>Name:</strong> ${author.auth_name}</p>
                                        <p class="card-text"><strong>Date of Birth:</strong> ${author.dob}</p>
                                        <p class="card-text"><strong>Gender:</strong> ${author.gender}</p>
                                    </div>
                                </div>
                            `;
                            resultDiv.innerHTML += authorCard;
                        });
                    }
                })
                .catch(error => {
                    console.error('Error fetching author:', error);
                    const resultDiv = document.getElementById('result');
                    resultDiv.innerHTML = '<div class="alert alert-danger" role="alert">Error fetching author information.</div>';
                });
            $('#fetch-author-name-form')[0].reset();
        });
            

        // Fetch all authors
        function fetchAllauthors() {
            fetch('http://localhost:8083/author/getAll')
                .then(response => response.json())
                .then(authors => {
                    const resultDiv = document.getElementById('author-list');
                    resultDiv.innerHTML = ''; // Clear previous results

                    if (authors.length === 0) {
                        resultDiv.innerHTML = '<div class="alert alert-warning" role="alert">No authors found.</div>';
                    } else {
                        authors.forEach(author => {
                            const authorCard = `
                                <div class="card mb-3">
                                    <div class="card-body">
                                        <h5 class="card-title">ID: ${author.id}</h5>
                                        <p class="card-text"><strong>Name:</strong> ${author.auth_name}</p>
                                        <p class="card-text"><strong>Date of Birth:</strong> ${author.dob}</p>
                                        <p class="card-text"><strong>Gender:</strong> ${author.gender}</p>
                                    </div>
                                </div>
                            `;
                            resultDiv.innerHTML += authorCard;
                        });
                    }
                })
                .catch(error => {
                    console.error('Error fetching authors:', error);
                    const resultDiv = document.getElementById('result');
                    resultDiv.innerHTML = '<div class="alert alert-danger" role="alert">Error fetching author information.</div>';
                });
        }

        // Show and hide forms for authors
        function showAddAuthorForm() {
            hideAllForms();
            $('#author-form-container').show();
        }

        function showUpdateAuthorForm() {
            hideAllForms();
            $('#update-author-form-container').show();
        }

        function showDeleteAuthorForm() {
            hideAllForms();
            $('#delete-author-form-container').show();
        }

        function showFetchAuthorByNameForm() {
            hideAllForms();
            $('#fetch-author-name-form-container').show();
        }

        function showFetchAllAuthors() {
            hideAllForms();
            $('#fetch-all-authors-container').show();
            fetchAllauthors();
        }

        function hideAllForms() {
            $('#author-form-container').hide();
            $('#update-author-form-container').hide();
            $('#delete-author-form-container').hide();
            $('#fetch-author-name-form-container').hide();
            $('#fetch-all-authors-container').hide();
        }
}
});

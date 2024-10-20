// Using jQuery for document ready
$(document).ready(function() {
    // Check if the current page is the student page
    if ($('#student-page-identifier').length) {
        // Attach event listeners for student-related functionality
        $('#add-student-btn').click(showAddStudentForm);
        $('#update-student-btn').click(showUpdateStudentForm);
        $('#delete-student-btn').click(showDeleteStudentForm);
        $('#fetch-student-name-btn').click(showFetchStudentByNameForm);
        $('#fetch-all-students-btn').click(showFetchAllStudents);

        // Add student
        $('#student-form').on('submit', function(event) {
            event.preventDefault();
            const studentName = $('#student-name').val();
            const studentEmail = $('#student-email').val();
            const studentPhone = parseInt($('#student-phone').val());
            const data = {
				                name:studentName,
								email:studentEmail,
								phone:studentPhone
				            };
            fetch('http://localhost:8083/student', {
		                method: 'POST',
		                headers: {
		                    'Content-Type': 'application/json'
		                },
		                body: JSON.stringify(data)
		            })
		            .then(response => response.json())
		            .then(data => {
		                console.log('Success:', data);
		                alert('Student information submitted successfully!');
		            })
		            .catch((error) => {
		                console.error('Error:', error);
		                alert('Error submitting student information.');
		            });
            $('#student-form')[0].reset();
           
        });

        // Update student
        $('#update-student-form').on('submit', function(event) {
            event.preventDefault();
            const studentId = $('#update-student-id').val();
            const studentName = $('#update-student-name').val();
            const studentEmail = $('#update-student-email').val();
            const studentPhone = $('#update-student-phone').val();
            const data = {
				name:studentName,
				email:studentEmail,
				phone:studentPhone
			}
             fetch(`http://localhost:8083/student/edit/${studentId}`, {
		                method: 'PUT',
		                headers: {
		                    'Content-Type': 'application/json'
		                },
		                body: JSON.stringify(data)
		            })
		            .then(response => response.json())
		            .then(data => {
		                console.log('Success:', data);
		                alert('Student information updated successfully!');
		            })
		            .catch((error) => {
		                console.error('Error:', error);
		                alert('Error updating student information.');
		            });
            $('#update-student-form')[0].reset();
            
        });

        // Delete student
        $('#delete-student-form').on('submit', function(event) {
            event.preventDefault();
            const studentId = parseInt($('#delete-student-id').val());
            fetch(`http://localhost:8083/student/delete/${studentId}`, {
		                method: 'DELETE',
		                headers: {
		                    'Content-Type': 'application/json'
		                }		                
		            })
		            .then(response => response.json())
		            .then(data => {
		                console.log('Success:', data);
		                alert('Student information deleted successfully!');
		            })
		            .catch((error) => {
		                console.error('Error:', error);
		                alert('Error deleting student information.');
		            });
            $('#delete-student-form')[0].reset();
           
        });

        // Fetch student by name
        $('#fetch-student-name-form').on('submit', function(event) {
            event.preventDefault();
            const studentName = $('#fetch-student-name').val();
            fetch(`http://localhost:8083/student/getByName/${studentName}`)
                .then(response => response.json())
                .then(students => {
                    const resultDiv = document.getElementById('result');
                    resultDiv.innerHTML = ''; // Clear previous results

                    if (students.length === 0) {
                        resultDiv.innerHTML = '<div class="alert alert-warning" role="alert">No students found with that name.</div>';
                    } else {
                        students.forEach(student => {
                            const studentCard = `
                                <div class="card my-3">
                                    <div class="card-body">
                                        <h5 class="card-title">ID: ${student.id}</h5>
                                        <p class="card-text"><strong>Name:</strong> ${student.name}</p>
                                        <p class="card-text"><strong>Email</strong> ${student.email}</p>
                                        <p class="card-text"><strong>Phone:</strong> ${student.phone}</p>
                                    </div>
                                </div>
                            `;
                            resultDiv.innerHTML += studentCard;
                        });
                    }
                })
                .catch(error => {
                    console.error('Error fetching student:', error);
                    const resultDiv = document.getElementById('result');
                    resultDiv.innerHTML = '<div class="alert alert-danger" role="alert">Error fetching student information.</div>';
                });
            $('#fetch-student-name-form')[0].reset();
            
        });

        // Fetch all students
        function fetchAllStudents() {
           fetch('http://localhost:8083/student/getAll')
                .then(response => response.json())
                .then(students => {
                    const resultDiv = document.getElementById('student-list');
                    resultDiv.innerHTML = ''; // Clear previous results

                    if (students.length === 0) {
                        resultDiv.innerHTML = '<div class="alert alert-warning" role="alert">No students found.</div>';
                    } else {
                        students.forEach(student => {
                            const studentCard = `
                                <div class="card my-3">
                                    <div class="card-body">
                                        <h5 class="card-title">ID: ${student.id}</h5>
                                        <p class="card-text"><strong>Name:</strong> ${student.name}</p>
                                        <p class="card-text"><strong>Email:</strong> ${student.email}</p>
                                        <p class="card-text"><strong>Phone:</strong> ${student.phone}</p>
                                    </div>
                                </div>
                            `;
                            resultDiv.innerHTML += studentCard;
                        });
                    }
                })
                .catch(error => {
                    console.error('Error fetching students:', error);
                    const resultDiv = document.getElementById('result');
                    resultDiv.innerHTML = '<div class="alert alert-danger" role="alert">Error fetching student information.</div>';
                });
        }

        // Show and hide forms for Students
        function showAddStudentForm() {
            hideAllForms();
            $('#student-form-container').show();
        }

        function showUpdateStudentForm() {
            hideAllForms();
            $('#update-student-form-container').show();
        }

        function showDeleteStudentForm() {
            hideAllForms();
            $('#delete-student-form-container').show();
        }

        function showFetchStudentByNameForm() {
            hideAllForms();
            $('#fetch-student-name-form-container').show();
        }

        function showFetchAllStudents() {
            hideAllForms();
            $('#fetch-all-students-container').show();
            fetchAllStudents();
        }

        function hideAllForms() {
            $('#student-form-container').hide();
            $('#update-student-form-container').hide();
            $('#delete-student-form-container').hide();
            $('#fetch-student-name-form-container').hide();
            $('#fetch-all-students-container').hide();
        }
    }
});

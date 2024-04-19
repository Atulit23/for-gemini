fetch('http://localhost:8001/generate', {
	method: 'POST',
	headers: {
	  'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		prompt: "I am stressed"
	})
  })
  .then(response => {
	if (response.ok) {
	  return response.json();
	} else {
	  throw new Error('Failed to POST data');
	}
  })
  .then(data => {
	// Do something with the response data
	console.log(data);
  })
  .catch(error => {
	// Handle errors
	console.error('Error:', error);
  });
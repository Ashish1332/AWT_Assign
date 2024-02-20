// Original asynchronous function
async function fetchData() {
  // Simulating an asynchronous operation (e.g., fetching data)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulating successful data retrieval
      resolve('Data fetched successfully');
    }, 1500);
  });
}

// Converting asynchronous function to return a promise
function convertToPromise() {
  return new Promise((resolve, reject) => {
    // Call the original asynchronous function
    fetchData()
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

// Using the converted function
convertToPromise()
  .then(data => {
    console.log(data); // Output: Data fetched successfully
  })
  .catch(error => {
    console.error(error);
  });

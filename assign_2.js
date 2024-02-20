async function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Data fetched successfully');
    }, 1500);
  });
}

function convertToPromise() {
  return new Promise((resolve, reject) => {
    fetchData()
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

convertToPromise()
  .then(data => {
    console.log(data); 
  })
  .catch(error => {
    console.error(error);
  });

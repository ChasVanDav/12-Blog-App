import { useState, useEffect } from 'react'


function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    //fetch the message from the backend server
    fetch('http://localhost:5000')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );

}

export default App

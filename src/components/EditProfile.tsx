// EditProfileForm.tsx
import React, { useState,useEffect} from 'react';
import axios from 'axios';
import { useAuth } from './Auth'

const EditProfile: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [step, setStep] = useState<number>(1);
  const [username, setUsername] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const fetchUsernameFromApi = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/docs/users');
      setUsername(response.data.username);
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  const handleSubmit = async () => {
    // Submit data to the API
    try {
      await axios.post('https://dummyjson.com/docs/users', { username, address });
      // Optionally, handle success (e.g., show a success message)
    } catch (error) {
      console.error('Error submitting data:', error);
      // Optionally, handle error (e.g., show an error message)
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <button onClick={() => setStep(2)}>Next</button>
          </div>
        );
      case 2:
        return (
          <div>
            <label>Address:</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            <button onClick={() => setStep(3)}>Next</button>
          </div>
        );
      case 3:
        return (
          <div>
            <p>Username: {username}</p>
            <p>Address: {address}</p>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsernameFromApi();
    } else {
      // Redirect user or handle non-authenticated state
    }
  }, [isAuthenticated]);

  return <div>{renderStep()}</div>;
};

export default EditProfile;

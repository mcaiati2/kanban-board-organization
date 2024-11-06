import { UserLogin } from "../interfaces/UserLogin";
import Auth from '../utils/auth';

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    const data = await response.json();

    if (response.ok) {
      Auth.login(data.token);
      return { success: true };
    } else {
      return { success: false, message: data.message };
    }
  } catch (err) {
    return { success: false, message: 'An error occurred. Please try again.' };
  }
}

export { login };
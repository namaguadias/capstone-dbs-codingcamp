const BASE_URL = 'https://backend-capstone-22arcnm0u-namaguadias-projects.vercel.app';

const AuthPresenter = {
  register: async (form) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nama: form.name,
        usia: parseInt(form.age, 10),
        alamat: form.address,
        jenisKelamin: form.gender,
        email: form.email,
        password: form.password,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Register failed');
    }
    const data = await response.json();
    // Save token and user info to localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('currentUser', JSON.stringify(data.user));
    return data.user;
  },

  login: async ({ email, password }) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }
    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('currentUser', JSON.stringify(data.user));
    return data.user;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    console.log('User logged out');
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const response = await fetch(`${BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch current user');
    }
    const user = await response.json();
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  },

  updateProfile: async (profileData) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');
    const response = await fetch(`${BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Update profile failed');
    }
    const updatedUser = await response.json();
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    return updatedUser;
  },

  getUserInfo: async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');
    const response = await fetch(`${BASE_URL}/user-info`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }
    const userInfo = await response.json();
    return userInfo;
  },

  updateUserInfo: async (userInfoData) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');
    const response = await fetch(`${BASE_URL}/user-info`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userInfoData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Update user info failed');
    }
    const updatedUserInfo = await response.json();
    return updatedUserInfo;
  },
};

export default AuthPresenter;

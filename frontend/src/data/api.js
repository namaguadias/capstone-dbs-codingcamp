const BASE_URL = 'https://backend-capstone-henna.vercel.app';

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
    try {
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
    } catch (error) {
      // Return cached user if fetch fails (offline fallback)
      const cachedUser = localStorage.getItem('currentUser');
      if (cachedUser) {
        return JSON.parse(cachedUser);
      }
      throw error;
    }
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

const DiagnosisAPI = {
  // POST /diagnose - upload image for diagnosis
  diagnoseImage: async (file) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');
    const formData = new FormData();
    formData.append('image', file);
    const response = await fetch(`${BASE_URL}/diagnose`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Diagnosis failed');
    }
    return response.json();
  },

  // POST /diagnose - create new diagnose record
  createDiagnosis: async (data) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');
    const response = await fetch(`${BASE_URL}/diagnosis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Create diagnosis failed');
    }
    return response.json();
  },

  // GET /diagnosis/history - get diagnosis history
  getHistory: async (limit = 10, offset = 0) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');
    const url = new URL(`${BASE_URL}/diagnosis/history`);
    url.searchParams.append('limit', limit);
    url.searchParams.append('offset', offset);
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Fetch history failed');
    }
    const data = await response.json();
    // Assuming the response is an object with a data array containing history items
    return data.data || data;
  },

  // GET /diagnosis/{id} - get diagnosis detail
  getDiagnosis: async (id) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');
    const response = await fetch(`${BASE_URL}/diagnosis/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Fetch diagnosis failed');
    }
    return response.json();
  },

  // PUT /diagnosis/{id} - update diagnosis
  updateDiagnosis: async (id, data) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');
    const response = await fetch(`${BASE_URL}/diagnosis/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Update diagnosis failed');
    }
    return response.json();
  },

  // DELETE /diagnosis/{id} - delete diagnosis
  deleteDiagnosis: async (id) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');
    const response = await fetch(`${BASE_URL}/diagnosis/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Delete diagnosis failed');
    }
    return response.json();
  },
};

export default AuthPresenter;
export { DiagnosisAPI };

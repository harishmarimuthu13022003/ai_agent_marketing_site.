const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('aether_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  let data = {};
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = { message: await response.text() };
  }

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

export const api = {
  // Authentication
  auth: {
    login: async (email, password) => {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, password }),
      });
      const data = await handleResponse(res);
      if (typeof window !== 'undefined' && data.token) {
        localStorage.setItem('aether_token', data.token);
        localStorage.setItem('aether_user', JSON.stringify(data.user));
      }
      return data;
    },
    
    register: async (name, email, password, role = 'user') => {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await handleResponse(res);
      if (typeof window !== 'undefined' && data.token) {
        localStorage.setItem('aether_token', data.token);
        localStorage.setItem('aether_user', JSON.stringify(data.user));
      }
      return data;
    },

    getMe: async () => {
      const res = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: getHeaders(),
      });
      return handleResponse(res);
    },

    logout: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('aether_token');
        localStorage.removeItem('aether_user');
      }
    },

    getCurrentUser: () => {
      if (typeof window !== 'undefined') {
        const user = localStorage.getItem('aether_user');
        return user ? JSON.parse(user) : null;
      }
      return null;
    },
    
    isAuthenticated: () => {
      if (typeof window !== 'undefined') {
        return !!localStorage.getItem('aether_token');
      }
      return false;
    }
  },

  // Agents CRUD
  agents: {
    getAll: async (search = '') => {
      const queryParams = search ? `?search=${encodeURIComponent(search)}` : '';
      const res = await fetch(`${API_URL}/agents${queryParams}`, {
        method: 'GET',
        headers: getHeaders(),
      });
      return handleResponse(res);
    },

    getOne: async (id) => {
      const res = await fetch(`${API_URL}/agents/${id}`, {
        method: 'GET',
        headers: getHeaders(),
      });
      return handleResponse(res);
    },

    create: async (agentData) => {
      const res = await fetch(`${API_URL}/agents`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(agentData),
      });
      return handleResponse(res);
    },

    update: async (id, agentData) => {
      const res = await fetch(`${API_URL}/agents/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(agentData),
      });
      return handleResponse(res);
    },

    delete: async (id) => {
      const res = await fetch(`${API_URL}/agents/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      return handleResponse(res);
    }
  },

  // Admin User Management CRUD
  users: {
    getAll: async () => {
      const res = await fetch(`${API_URL}/users`, {
        method: 'GET',
        headers: getHeaders(),
      });
      return handleResponse(res);
    },

    getOne: async (id) => {
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: 'GET',
        headers: getHeaders(),
      });
      return handleResponse(res);
    },

    update: async (id, userData) => {
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(userData),
      });
      return handleResponse(res);
    },

    delete: async (id) => {
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      return handleResponse(res);
    }
  }
};

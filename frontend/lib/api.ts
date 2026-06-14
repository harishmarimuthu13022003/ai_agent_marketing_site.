const API_URL = process.env.NEXT_PUBLIC_API_URL || (
  process.env.NODE_ENV === 'development'
    ? (process.env.NEXT_PUBLIC_LOCAL_API_URL || 'http://localhost:5000/api')
    : (process.env.NEXT_PUBLIC_LIVE_API_URL || 'https://ai-agent-marketing-site.onrender.com/api')
);

export interface User {
  id: string;
  _id?: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt?: string;
}

export interface AgentConfig {
  description?: string;
  temperature?: number;
  systemPrompt?: string;
  agentApi?: string;
}

export interface Agent {
  _id: string;
  name: string;
  type: 'support' | 'research' | 'workflow' | 'custom';
  status: 'active' | 'idle' | 'failed';
  owner: string | User;
  config?: AgentConfig;
  createdAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  count?: number;
  message?: string;
  token?: string;
  user?: User;
  data?: T;
}

const getHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
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

const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  const contentType = response.headers.get('content-type');
  let data: any = {};
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = { message: await response.text() };
  }

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data as ApiResponse<T>;
};

export const api = {
  // Authentication
  auth: {
    login: async (email: string, password: string): Promise<ApiResponse<any>> => {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, password }),
      });
      const data = await handleResponse<any>(res);
      if (typeof window !== 'undefined' && data.token) {
        localStorage.setItem('aether_token', data.token);
        localStorage.setItem('aether_user', JSON.stringify(data.user));
      }
      return data;
    },
    
    register: async (name: string, email: string, password: string, role: string = 'user'): Promise<ApiResponse<any>> => {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await handleResponse<any>(res);
      if (typeof window !== 'undefined' && data.token) {
        localStorage.setItem('aether_token', data.token);
        localStorage.setItem('aether_user', JSON.stringify(data.user));
      }
      return data;
    },

    getMe: async (): Promise<ApiResponse<User>> => {
      const res = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: getHeaders(),
      });
      return handleResponse<User>(res);
    },

    logout: (): void => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('aether_token');
        localStorage.removeItem('aether_user');
      }
    },

    getCurrentUser: (): User | null => {
      if (typeof window !== 'undefined') {
        const user = localStorage.getItem('aether_user');
        return user ? JSON.parse(user) : null;
      }
      return null;
    },
    
    isAuthenticated: (): boolean => {
      if (typeof window !== 'undefined') {
        return !!localStorage.getItem('aether_token');
      }
      return false;
    },

    seed: async (): Promise<ApiResponse<any>> => {
      const res = await fetch(`${API_URL}/auth/seed`, {
        method: 'POST',
        headers: getHeaders(),
      });
      return handleResponse<any>(res);
    }
  },

  // Agents CRUD
  agents: {
    getAll: async (search: string = ''): Promise<ApiResponse<Agent[]>> => {
      const queryParams = search ? `?search=${encodeURIComponent(search)}` : '';
      const res = await fetch(`${API_URL}/agents${queryParams}`, {
        method: 'GET',
        headers: getHeaders(),
      });
      return handleResponse<Agent[]>(res);
    },

    getOne: async (id: string): Promise<ApiResponse<Agent>> => {
      const res = await fetch(`${API_URL}/agents/${id}`, {
        method: 'GET',
        headers: getHeaders(),
      });
      return handleResponse<Agent>(res);
    },

    create: async (agentData: Partial<Agent>): Promise<ApiResponse<Agent>> => {
      const res = await fetch(`${API_URL}/agents`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(agentData),
      });
      return handleResponse<Agent>(res);
    },

    update: async (id: string, agentData: Partial<Agent>): Promise<ApiResponse<Agent>> => {
      const res = await fetch(`${API_URL}/agents/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(agentData),
      });
      return handleResponse<Agent>(res);
    },

    delete: async (id: string): Promise<ApiResponse<any>> => {
      const res = await fetch(`${API_URL}/agents/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      return handleResponse<any>(res);
    }
  },

  // Admin User Management CRUD
  users: {
    getAll: async (): Promise<ApiResponse<User[]>> => {
      const res = await fetch(`${API_URL}/users`, {
        method: 'GET',
        headers: getHeaders(),
      });
      return handleResponse<User[]>(res);
    },

    getOne: async (id: string): Promise<ApiResponse<User>> => {
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: 'GET',
        headers: getHeaders(),
      });
      return handleResponse<User>(res);
    },

    update: async (id: string, userData: Partial<User>): Promise<ApiResponse<User>> => {
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(userData),
      });
      return handleResponse<User>(res);
    },

    delete: async (id: string): Promise<ApiResponse<any>> => {
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      return handleResponse<any>(res);
    }
  }
};

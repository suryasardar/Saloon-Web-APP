import React, { useState } from 'react';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface LoginData {
  email: string;
  password: string;
}

// Redux-like state management (simplified)
const useAuthStore = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  });

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  };

  const setError = (error: string | null) => {
    setState(prev => ({ ...prev, error }));
  };

  const setUser = (user: User | null) => {
    setState(prev => ({ 
      ...prev, 
      user, 
      isAuthenticated: !!user,
      error: null 
    }));
  };

  const register = async (data: RegisterData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const result = await response.json();
      setUser(result.user);
      return true;
    } catch (error) {
      // For demo purposes, simulate success
      console.log('Registration data:', data);
      setUser({
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        role: data.role
      });
      return true;
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: LoginData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const result = await response.json();
      setUser(result.user);
      return true;
    } catch (error) {
      // For demo purposes, simulate success
      console.log('Login data:', data);
      setUser({
        id: Date.now().toString(),
        name: 'Demo User',
        email: data.email,
        role: 'user'
      });
      return true;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return {
    state,
    register,
    login,
    logout
  };
};

// Register Component
const RegisterForm: React.FC<{ onSwitchToLogin: () => void }> = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  const { state, register } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const success = await register(formData);
    if (success) {
      setFormData({ name: '', email: '', password: '', role: 'user' });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-yellow-400 mb-8">Register</h2>
        
        <div>
          <label className="block text-yellow-400 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-black border-2 border-yellow-400 rounded-lg text-yellow-400 placeholder-yellow-600 focus:outline-none focus:border-yellow-300 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label className="block text-yellow-400 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-black border-2 border-yellow-400 rounded-lg text-yellow-400 placeholder-yellow-600 focus:outline-none focus:border-yellow-300 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label className="block text-yellow-400 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-black border-2 border-yellow-400 rounded-lg text-yellow-400 placeholder-yellow-600 focus:outline-none focus:border-yellow-300 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
            placeholder="Enter your password"
            required
          />
        </div>

        <div>
          <label className="block text-yellow-400 text-sm font-bold mb-2">
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-black border-2 border-yellow-400 rounded-lg text-yellow-400 focus:outline-none focus:border-yellow-300 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={state.loading}
          className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state.loading ? 'Registering...' : 'Register'}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-yellow-400 hover:text-yellow-300 font-medium"
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
};

// Login Component
const LoginForm: React.FC<{ onSwitchToRegister: () => void }> = ({ onSwitchToRegister }) => {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: ''
  });

  const { state, login } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const success = await login(formData);
    if (success) {
      setFormData({ email: '', password: '' });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-yellow-400 mb-8">Login</h2>
        
        <div>
          <label className="block text-yellow-400 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-black border-2 border-yellow-400 rounded-lg text-yellow-400 placeholder-yellow-600 focus:outline-none focus:border-yellow-300 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label className="block text-yellow-400 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-black border-2 border-yellow-400 rounded-lg text-yellow-400 placeholder-yellow-600 focus:outline-none focus:border-yellow-300 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={state.loading}
          className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state.loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-yellow-400 hover:text-yellow-300 font-medium"
          >
            Don't have an account? Register
          </button>
        </div>
      </div>
    </div>
  );
};
import { API_BASE_URL } from "../apiBase";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export async function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
  console.log('loginUser called', { 
    email: credentials.email,
    url: `${API_BASE_URL}/users/signin`,
    body: JSON.stringify(credentials)
  });
  
  const response = await fetch(`${API_BASE_URL}/users/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  
  console.log('loginUser response', { status: response.status, ok: response.ok });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('loginUser failed', errorText);
    
    if (response.status === 401) {
      throw new Error('Email або пароль невірні. Якщо ви ще не реєструвалися, спочатку створіть акаунт.');
    }
    
    throw new Error('Login failed. Please check your credentials.');
  }

  const data = await response.json();
  console.log('loginUser success', { hasToken: !!data.token, user: data.user || { name: data.name, email: data.email } });
  
  // Нормалізуємо відповідь: backend може повернути { token, user: {...} } або { token, name, email }
  if (data.user) {
    return data;
  } else {
    return {
      token: data.token,
      user: {
        name: data.name,
        email: data.email,
        avatar: data.avatar,
      },
    };
  }
}

export async function registerUser(credentials: RegisterCredentials): Promise<AuthResponse> {
  console.log('registerUser called', { 
    name: credentials.name,
    email: credentials.email,
    url: `${API_BASE_URL}/users/signup`,
    body: JSON.stringify(credentials)
  });
  
  const response = await fetch(`${API_BASE_URL}/users/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  
  console.log('registerUser response', { status: response.status, ok: response.ok });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('registerUser failed', errorText);
    
    if (response.status === 409) {
      throw new Error('Користувач з таким email вже існує. Спробуйте увійти.');
    }
    
    throw new Error('Registration failed. Please try again.');
  }

  const data = await response.json();
  console.log('registerUser success', { hasToken: !!data.token, user: data.user || { name: data.name, email: data.email } });
  
  // Нормалізуємо відповідь: backend може повернути { token, user: {...} } або { token, name, email }
  if (data.user) {
    return data;
  } else {
    return {
      token: data.token,
      user: {
        name: data.name,
        email: data.email,
        avatar: data.avatar,
      },
    };
  }
}

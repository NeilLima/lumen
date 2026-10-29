import axios, { type AxiosRequestConfig, type AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'

type CircuitBreakerState = {
  isOpen: boolean;
  failureCount: number;
  lastFailureTime: number | null;
  threshold: number;
  timeout: number;
};

const circuitBreakerState: CircuitBreakerState = {
  isOpen: false,
  failureCount: 0,
  lastFailureTime: null,
  threshold: 5,
  timeout: 30000,
};

const recordFailure = () => {
  circuitBreakerState.failureCount++;
  circuitBreakerState.lastFailureTime = Date.now();

  if (circuitBreakerState.failureCount >= circuitBreakerState.threshold) {
    circuitBreakerState.isOpen = true;
    console.log(`🚨 Circuit breaker ABERTO - ${circuitBreakerState.failureCount} falhas consecutivas`);
  }
};

const recordSuccess = () => {
  if (circuitBreakerState.failureCount > 0) {
    console.log('✅ Conexão restaurada - circuit breaker resetado');
  }
  circuitBreakerState.failureCount = 0;
  circuitBreakerState.isOpen = false;
};

const canReachApi = async (apiUrl: string): Promise<boolean> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    await fetch(`${apiUrl}/api`, {
      method: 'GET',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return true;
  } catch {
    return false;
  }
};

// URLs da API
const LOCAL_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
const PRODUCTION_API_URL = process.env.NEXT_PUBLIC_API_URL_PRODUCTION || 'https://backend-nine-snowy-sn0nvdilry.vercel.app';

// Estratégia DEFINITIVA:
// - Em produção (Vercel): usa SEMPRE a URL de produção
// - Em desenvolvimento no PC (localhost): usa NEXT_PUBLIC_API_URL (http://localhost:3002)
// - Em desenvolvimento no celular (Wi-Fi): usa o próprio frontend como proxy
//   O Next.js redireciona /api/* para o backend via rewrites()
const isProduction = process.env.NODE_ENV === 'production';

function isLocalhost(): boolean {
  if (typeof window === 'undefined') return true;
  const hostname = window.location.hostname;
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
}

function getInitialBaseURL(): string {
  if (isProduction) return PRODUCTION_API_URL;

  // Se estiver no PC (localhost), usa a URL configurada no .env
  if (isLocalhost() && process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // Se estiver no celular (Wi-Fi) ou sem env, usa o próprio frontend como proxy
  // O Next.js redireciona /api/* para o backend via rewrites no next.config.ts
  // Por isso, adicionamos /api ao final do baseURL para o proxy funcionar
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.host}/api`;
  }

  return LOCAL_API_URL;
}

const initialBaseURL = getInitialBaseURL();

// Configuração do axios
const apiConfig: AxiosRequestConfig = {
  baseURL: initialBaseURL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Cria a instância do axios
export const api = axios.create(apiConfig);

console.log(`🔌 API configurada para: ${initialBaseURL}`);
console.log(`🌍 Ambiente: ${isProduction ? 'PRODUÇÃO' : 'DESENVOLVIMENTO'}`);

// Função para resetar circuit breaker manualmente
export const resetCircuitBreaker = () => {
  circuitBreakerState.isOpen = false;
  circuitBreakerState.failureCount = 0;
  circuitBreakerState.lastFailureTime = null;
  console.log('🔄 Circuit breaker resetado manualmente');
};

// Verificar e tentar recuperar conexão
export const checkAndRecoverConnection = async (): Promise<boolean> => {
  const canConnect = await canReachApi(api.defaults.baseURL || LOCAL_API_URL);
  if (canConnect) {
    resetCircuitBreaker();
    return true;
  }
  return false;
};

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Debug log
    if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_DEBUG_LOGS === 'true') {
      try {
        const method = (config.method || 'get').toUpperCase();
        const url = config.url || '';
        const baseURL = config.baseURL || api.defaults.baseURL;
        const dataType = config.data == null ? 'null' : Array.isArray(config.data) ? 'array' : typeof config.data;
        console.log('📡 Requisição API:', method, url, { baseURL, dataType });
      } catch {
        // Não quebrar o fluxo por causa de log
      }
    }

    // Se for FormData, remover Content-Type para o Axios definir automaticamente como multipart/form-data
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    // Adicionar token de autenticação (exceto para rotas de auth)
    const url = config.url || '';
    const isAuthRoute = url.includes('/auth/login') || url.includes('/auth/register');
    
    // Log para debugar requisições problemáticas
    if (url.includes('suggestions') || url.includes('stories/feed') || url.includes('interactions/reactions')) {
      console.log(`🔍 [API Request] ${config.method?.toUpperCase()} ${url}`, {
        baseURL: config.baseURL,
        timeout: config.timeout,
        hasToken: !!localStorage.getItem('token'),
        hasAuthHeader: !!config.headers.Authorization,
      });
    }
    
    if (!isAuthRoute) {
      const token = localStorage.getItem('token');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Interceptor de resposta
api.interceptors.response.use(
  (response: AxiosResponse) => {
    recordSuccess();
    return response;
  },
  (error: AxiosError) => {
    if (error.code === 'ERR_NETWORK' || error.code === 'ERR_CONNECTION_REFUSED') {
      recordFailure();
    }

    // Log de erro mais limpo
    if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_DEBUG_LOGS === 'true') {
      const baseURL = error.config?.baseURL || api.defaults.baseURL;
      const url = error.config?.url;
      const fullUrl = typeof url === 'string' ? `${baseURL || ''}${url}` : baseURL;

      console.error('❌ Erro API:', {
        status: error.response?.status,
        url: url,
        fullUrl,
        message: error.message,
        code: error.code,
        response: error.response?.data,
        requestStatus: error.request?.status,
      });
    }
    return Promise.reject(error);
  }
);
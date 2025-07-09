import axios from 'axios';
import type {
  CustomContent,
  Quiz,
  QuizGenerationResponse,
  ContentStatusResponse,
  ContentListResponse,
  QuizListResponse,
  ApiResponse
} from '../interface/types';

// Configure axios defaults
const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  async initializeTopics(userId: string) {
    await api.post('/topic/initialize',{ userId });
  },

  async fetchTopics() {
    const response = await api.get('/topic');
    console.log(response);
    return response.data;

  },
  // Content Upload APIs
  async uploadPdf(file: File, title?: string): Promise<{
    success: boolean; contentId?: string; message: string 
}> {
    const formData = new FormData();
    formData.append('file', file);
    // if (title) formData.append('title', title);

    const response = await api.post('/content/upload/pdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async uploadImage(file: File, title?: string): Promise<{
    success: any; contentId: string; message: string 
}> {
    const formData = new FormData();
    formData.append('file', file);
    if (title) formData.append('title', title);

    const response = await api.post('/content/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async uploadVideo(file: File, title?: string): Promise<{
    success: any; contentId: string; message: string 
}> {
    const formData = new FormData();
    formData.append('file', file);
    if (title) formData.append('title', title);

    const response = await api.post('/content/upload/video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async uploadYoutube(url: string, title: string): Promise<{ contentId: string; message: string }> {
    const response = await api.post('/content/upload/youtube', { url, title });
    return response.data;
  },

  // Content Management APIs
  async getContentStatus(contentId: string): Promise<ContentStatusResponse> {
    const response = await api.get(`/content/content/${contentId}/status`);
    return response.data;
  },

  async getAllContent(page = 1, limit = 10): Promise<ContentListResponse> {
    const response = await api.get('/content/content', {
      params: { page, limit }
    });
    return response.data;
  },

  async deleteContent(contentId: string): Promise<{ success: boolean; message: string }> {
    const response = await api.delete(`/content/content/${contentId}`);
    return response.data;
  },

  // Quiz Management APIs
  async generateQuiz(
    contentId: string,
    questionCount = 5,
    difficulty = 'mixed',
    // type = 'default' // 'default' or 'new'
  ): Promise<QuizGenerationResponse> {
    const response = await api.post('/content/generate-quiz', {
      contentId,
      questionCount,
      difficulty,
      // type
    });
    return response.data;
  },

  async getQuiz(quizId: string): Promise<Quiz> {
    const response = await api.get(`/content/quiz/${quizId}`);
    return response.data;
  },

  async getAllQuizzes(page = 1, limit = 10): Promise<QuizListResponse> {
    const response = await api.get('/content/quizzes', {
      params: { page, limit }
    });
    return response.data;
  },

  // Health Check
  async checkOllamaHealth(): Promise<{ status: string; service: string }> {
    const response = await api.get('/content/health/ollama');
    return response.data;
  }
};

export default apiService;
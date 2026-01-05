import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://remark-ours-around-weight.trycloudflare.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export interface Hostel {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  is_verified: boolean;
  availability_summary: string;
  description: string;
  hostel_type: string;
  hostel_facilities: {
    id: number;
    facility: {
      id: number;
      name: string;
      slug: string;
    };
    facility_name: string;
  }[];
  mess_menu: {
    id: number;
    day: string;
    veg_breakfast: string;
    veg_breakfast_accompaniment: string;
    veg_lunch: string;
    veg_lunch_accompaniment: string;
    veg_dinner: string;
    veg_dinner_accompaniment: string;
    nonveg_breakfast: string;
    nonveg_breakfast_accompaniment: string;
    nonveg_lunch: string;
    nonveg_lunch_accompaniment: string;
    nonveg_dinner: string;
    nonveg_dinner_accompaniment: string;
  }[];
  rooms: {
    id: string;
    room_number: string;
    is_available: boolean;
    room_type: string;
    images: { id: string; image: string }[];
    description: string;
    monthly_price: number;
    daily_price: number;
    room_facilities: {
      id: number;
      facility: {
        id: number;
        name: string;
        slug: string;
      };
    }[];
    capacity: number;
  }[];
  rules: {
    id: string;
    title: string;
    rule_type: string;
    description: string;
  }[];
  images: {
    id: string;
    image: string;
    caption?: string;
  }[];
}

export const hostelService = {

  createHostel: async (payload: {
    name: string;
    description?: string;
    hostel_type: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    latitude?: number;
    longitude?: number;
    hostel_facilities: { facility_id: number }[];
    rules: { title: string; description: string }[];
  }) => {
    const response = await api.post(
      "/hostels/hostels/",
      payload
    );
    return response.data;
  },


  uploadHostelImage: async (hostelId: string, formData: FormData) => {
    const response = await api.post(
      `/hostels/hostels/`, // <- Correct endpoint
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },


  getHostels: async (page: number = 1) => {
    const response = await api.get(`/hostels/hostels/?page=${page}`);
    return response.data;
  },

  deleteHostel: async (id: string) => {
    const response = await api.delete(`/hostels/hostels/${id}/`);
    return response.data;
  },

  getHostelById: async (id: string) => {
    const response = await api.get(`/hostels/hostels/${id}/`);
    return response.data;
  },

  updateHostelImage: async (hostelId: string, imageId: string, formData: FormData) => {
    const response = await api.patch(
      `/hostels/api/v1/hostels/${hostelId}/images/${imageId}/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  deleteHostelImage: async (hostelId: string, imageId: string) => {
    const response = await api.delete(`/hostels/api/v1/hostels/${hostelId}/images/${imageId}/`);
    return response.data;
  },

};

export const facilityService = {

  getFacilities: async () => {
    const response = await api.get(
      '/rooms/facilities/'
    );
    return response.data;
  },
};

export const authService = {
  login: async (credentials: any) => {
    const response = await api.post('/token/', credentials);
    return response.data;
  },
  register: async (data: any) => {
    const response = await api.post('/users/register/', data);
    return response.data;
  },
  logout: () => {
    // If there's a server-side logout, call it here
    // await api.post('/users/logout/');
  },
};

export default api;

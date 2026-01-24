import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://remark-ours-around-weight.trycloudflare.com/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
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

export interface MessImage {
  id: number;
  image: string;
  alt_text: string;
  created_at: string;
}

export interface MessMenu {
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
  breakfast_image: string | null;
  lunch_image: string | null;
  dinner_image: string | null;
}

export interface MessDeliveryArea {
  id: number;
  area_name: string;
}

export interface MessMealPlan {
  id: number;
  plan_id: string;
  name: string;
  price: string;
  meals: number;
  features: string[];
}

export interface MessFeature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface Mess {
  id: number;
  owner: string;
  name: string;
  cover_image: string | null;
  address: string;
  city: string;
  state: string;
  pincode: string;
  description: string;
  latitude: string | null;
  longitude: string | null;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  images: MessImage[];
  mess_menus: MessMenu[];
  delivery_areas: MessDeliveryArea[];
  meal_plans: MessMealPlan[];
  features: MessFeature[];
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
    is_active?: boolean;

    facilities: number[];

    rules: {
      title: string;
      description: string;
      rule_type: string;
    }[];

    rooms: {
      room_number: string;
      room_type: string;
      description?: string;
      capacity: number;
      daily_price: number;
      monthly_price: number;
    }[];

    mess: {
      day: string;
      veg_breakfast?: string;
      veg_lunch?: string;
      veg_dinner?: string;
      nonveg_breakfast?: string;
      nonveg_lunch?: string;
      nonveg_dinner?: string;
    }[];

    images?: File[];
  }) => {
    const formData = new FormData();

    // ✅ Basic fields
    formData.append("name", payload.name);
    formData.append("description", payload.description || "");
    formData.append("hostel_type", payload.hostel_type);
    formData.append("address", payload.address);
    formData.append("city", payload.city);
    formData.append("state", payload.state);
    formData.append("pincode", payload.pincode);

    if (payload.latitude)
      formData.append("latitude", payload.latitude.toString());
    if (payload.longitude)
      formData.append("longitude", payload.longitude.toString());

    if (payload.is_active !== undefined)
      formData.append("is_active", String(payload.is_active));

    // ✅ Facilities (array → JSON)
    formData.append("facilities", JSON.stringify(payload.facilities));

    // ✅ Rules (array → JSON)
    formData.append("rules", JSON.stringify(payload.rules));

    // ✅ Rooms (array → JSON)
    formData.append("rooms", JSON.stringify(payload.rooms));

    // ✅ Mess menu (array → JSON)
    formData.append("mess", JSON.stringify(payload.mess));

    // ✅ Images (files)
    if (payload.images) {
      payload.images.forEach((file) => {
        formData.append("images", file);
      });
    }

    const response = await api.post("/hostels/hostels/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  updateHostel: async (
    id: string,
    payload: {
      name: string;
      description?: string;
      hostel_type: string;
      address: string;
      city: string;
      state: string;
      pincode: string;
      latitude?: number;
      longitude?: number;
      is_active?: boolean;

      facilities: number[];

      rules: {
        title: string;
        description: string;
        rule_type: string;
      }[];

      mess: {
        day: string;
        veg_breakfast?: string;
        veg_lunch?: string;
        veg_dinner?: string;
        nonveg_breakfast?: string;
        nonveg_lunch?: string;
        nonveg_dinner?: string;
      }[];
    }
  ) => {
    const formData = new FormData();

    // ✅ Basic fields
    formData.append("name", payload.name);
    formData.append("description", payload.description || "");
    formData.append("hostel_type", payload.hostel_type);
    formData.append("address", payload.address);
    formData.append("city", payload.city);
    formData.append("state", payload.state);
    formData.append("pincode", payload.pincode);

    if (payload.latitude)
      formData.append("latitude", payload.latitude.toString());
    if (payload.longitude)
      formData.append("longitude", payload.longitude.toString());

    if (payload.is_active !== undefined)
      formData.append("is_active", String(payload.is_active));

    // ✅ Facilities (array → JSON)
    formData.append("facilities", JSON.stringify(payload.facilities));

    // ✅ Rules (array → JSON)
    formData.append("rules", JSON.stringify(payload.rules));

    // ✅ Mess menu (array → JSON)
    formData.append("mess", JSON.stringify(payload.mess));

    // NOTE: Rooms and Images are updated via separate APIs as per requirements.

    const response = await api.patch(`/hostels/hostels/${id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  createRoom: async (
    hostelId: string,
    payload: {
      room_number: string;
      room_type: string;
      capacity: number;
      daily_price: number;
      monthly_price: number;
      description?: string;
      is_available: boolean;
      facility_ids: number[];
      uploaded_images: File[];
    }
  ) => {
    const formData = new FormData();

    formData.append("hostel", hostelId);
    formData.append("room_number", payload.room_number);
    formData.append("room_type", payload.room_type);
    formData.append("capacity", payload.capacity.toString());
    formData.append("daily_price", payload.daily_price.toString());
    formData.append("monthly_price", payload.monthly_price.toString());
    formData.append("description", payload.description || "");
    formData.append("is_available", String(payload.is_available));

    // Facilities (multiple values, same key 'facility_ids')
    payload.facility_ids.forEach((id) => {
      formData.append("facility_ids", id.toString());
    });

    // Images (multiple values, same key 'uploaded_images')
    if (payload.uploaded_images) {
      payload.uploaded_images.forEach((file) => {
        formData.append("uploaded_images", file);
      });
    }

    const response = await api.post("/rooms/rooms/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

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

  updateHostelImage: async (
    hostelId: string,
    imageId: string,
    formData: FormData
  ) => {
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
    const response = await api.delete(
      `/hostels/api/v1/hostels/${hostelId}/images/${imageId}/`
    );
    return response.data;
  },
};

export const messService = {
  getMessHomes: async () => {
    const response = await api.get("http://195.250.31.216:7000/api/mess/homes/");
    return response.data;
  },
};

export const facilityService = {
  getFacilities: async () => {
    const response = await api.get("/rooms/facilities/");
    return response.data;
  },
};

export const authService = {
  login: async (credentials: any) => {
    const response = await api.post("/token/", credentials);
    return response.data;
  },
  register: async (data: any) => {
    const response = await api.post("/users/register/", data);
    return response.data;
  },
  logout: () => {
    // If there's a server-side logout, call it here
    // await api.post('/users/logout/');
  },
};

export default api;

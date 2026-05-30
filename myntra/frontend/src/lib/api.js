import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = axios.create({
    baseURL,
    withCredentials: true,
});

export const getApiErrorMessage = (error, fallback = "Something went wrong. Please try again.") => {
    return (
        error?.response?.data?.message ||
        error?.message ||
        fallback
    );
};

export const authApi = {
    signup: (payload) => api.post("/auth/signup", payload),
    login: (payload) => api.post("/auth/login", payload),
    logout: () => api.post("/auth/logout"),
    me: async () => {
        try {
            return await api.get("/auth/me");
        } catch (error) {
            if (error?.response?.status === 401) {
                return { data: { user: null } };
            }

            throw error;
        }
    },
    forgotPassword: (payload) => api.post("/auth/forgot-password", payload),
};

export const productApi = {
    list: (params) => api.get("/products", { params }),
    get: (id) => api.get(`/products/${id}`),
};

export const orderApi = {
    create: (payload) => api.post("/orders", payload),
    mine: () => api.get("/orders/mine"),
};

export const adminApi = {
    analytics: () => api.get("/admin/analytics"),
    users: () => api.get("/admin/users"),
    importCsv: (formData) => api.post("/admin/products/import-csv", formData),
};

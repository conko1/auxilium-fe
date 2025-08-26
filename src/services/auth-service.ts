import api from "@/services/config/api-config";
import {LoginData} from "@/types/auth-types";
import axi from "@/services/config/axi-config";

export async function login(data: LoginData) {
    await api.post(`/auth/login/`, data);
}

export async function refresh() {
    await axi.post(`/auth/token/refresh/`);
}

export async function logout() {
    await api.post(`/auth/logout/`);
}
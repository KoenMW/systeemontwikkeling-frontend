import { useAuthStore } from "@/stores/auth";


export const requestHeader = () => {
    const authStore = useAuthStore();

    console.log(authStore.jwt);
    return {
        Authorization: `Bearer ${authStore.jwt}`,
    };
}
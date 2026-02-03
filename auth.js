class AuthManager {
    constructor() {
        this.userKey = "mitibora_user";
    }

    getUser() {
        const userStr = localStorage.getItem(this.userKey);
        return userStr ? JSON.parse(userStr) : null;
    }

    async login(email, password) {
        if (!backend.isConfigured) {
            // Mock Login
            if (email && password) {
                const mockUser = { email, role: "Partner", id: "mock-id" };
                this.saveUser(mockUser);
                return { success: true, user: mockUser };
            }
        }

        const res = await backend.post("login", { email, password });
        if (res.status === "success") {
            const user = {
                id: res.userId,
                email: res.email,
                role: res.role,
                relatedId: res.relatedId
            };
            this.saveUser(user);
            return { success: true, user };
        }
        return { success: false, message: res.message };
    }

    logout() {
        localStorage.removeItem(this.userKey);
        window.location.reload();
    }

    saveUser(user) {
        localStorage.setItem(this.userKey, JSON.stringify(user));
    }

    isAuthenticated() {
        return !!this.getUser();
    }
}

// Global instance
const Auth = new AuthManager();

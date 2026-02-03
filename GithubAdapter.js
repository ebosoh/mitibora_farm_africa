class GithubAdapter {
    constructor() {
        // INSTRUCTIONS FOR USER:
        // 1. Deploy your Google Apps Script as a Web App (Execute as Me, Access: Anyone).
        // 2. Paste the 'Current web app URL' below.
        this.BACKEND_URL = "https://script.google.com/macros/s/AKfycbwhNhj0sXNMQMHVa1c6fZE7R_-DZHj0z7zKcWFOhHVaYNaGrSv8xe-nkjBo4RkqQNJ3/exec";

        // Helper to check if backend is configured
        this.isConfigured = this.BACKEND_URL.includes("script.google.com") && !this.BACKEND_URL.includes("placeholder");
    }

    async get(action, params = {}) {
        if (!this.isConfigured) {
            console.warn("Backend URL not configured. Returning mock data.");
            return this.mockGet(action);
        }

        try {
            const query = new URLSearchParams({ action, ...params }).toString();
            const response = await fetch(`${this.BACKEND_URL}?${query}`, {
                method: "GET",
            });
            return await response.json();
        } catch (error) {
            console.error("API Get Error:", error);
            return { status: "error", message: "Connection failed" };
        }
    }

    async post(action, data = {}) {
        if (!this.isConfigured) {
            console.warn("Backend URL not configured. Returning mock response.");
            return this.mockPost(action, data);
        }

        try {
            // Google Apps Script requires text/plain or specific handling for CORS
            const payload = JSON.stringify({ action, ...data });
            const response = await fetch(this.BACKEND_URL, {
                method: "POST",
                body: payload,
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
            });
            return await response.json();
        } catch (error) {
            console.error("API Post Error:", error);
            return { status: "error", message: "Connection failed" };
        }
    }

    // --- MOCK DATA FOR LOCAL TESTING ---
    mockGet(action) {
        if (action === "getPartners") {
            return {
                status: "success",
                data: [
                    { Name: "Mock Partner A", LogoUrl: "https://placehold.co/150", FuelLiters: 500 },
                    { Name: "Mock Partner B", LogoUrl: "https://placehold.co/150", FuelLiters: 1200 }
                ]
            };
        }
        return { status: "success", data: [] };
    }

    mockPost(action, data) {
        console.log(`[MOCK POST] Action: ${action}`, data);
        return { status: "success", message: "Mock success", userId: "mock-123" };
    }
}

// Global instance
const backend = new GithubAdapter();

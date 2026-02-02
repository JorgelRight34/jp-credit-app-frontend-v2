export class PaginationLimitManager {
    private static storageKey = "paginationLimits";
    static limits: Record<string, number> = this.loadLimits();

    private static loadLimits(): Record<string, number> {
        if (typeof localStorage === "undefined") return {};

        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : {};
        } catch (e) {
            console.error("Failed to load pagination limits from localStorage", e);
            return {};
        }
    }

    private static saveLimits() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.limits));
        } catch (e) {
            console.error("Failed to save pagination limits to localStorage", e);
        }
    }

    static setLimit(key: string, value: number) {
        this.limits[key] = value;
        this.saveLimits();
    }

    static getLimit(key: string) {
        return this.limits[key];
    }
}

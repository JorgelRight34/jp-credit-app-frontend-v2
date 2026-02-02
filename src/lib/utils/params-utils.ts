export const setHashTab = (tab: string | null) => {
    window.location.hash = tab ?? ""
}

export const getHashTab = (defaultTab: string) => {
    if (typeof window === "undefined") return;
    return window.location.hash.replace('#', '') || defaultTab
}


export const setTabSearchParam = async (tab: string | null) => {
    if (!tab) return;

    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);

    window.history.replaceState(null, '', url)
}
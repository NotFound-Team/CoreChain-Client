import fetchAPI from "./fetchApi";

const checkAuth = async () => {
    console.log("Checking authentication...");
    try {
        const res = await fetchAPI("/auth/isAuthenticated");
        if (res?.data?.data?.isAuthenticated) {
            console.log("Authenticated");
            return {
                user: {
                    userId: res.data.data.user.userId,
                    role: res.data.data.user.role,
                },
                isAuthenticated: true,
            };
        } else {
            console.log("User not authenticated");
            return {
                user: { userId: null, role: null },
                isAuthenticated: true,
            };
        }
    } catch (error) {
        console.log("err:", error);
        return {
            user: { userId: null, role: null },
            isAuthenticated: false,
        };
    }
};

export default checkAuth;

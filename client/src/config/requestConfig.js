export const getClientRequestConfig = () => {
    const client = localStorage.getItem("auth_token");
    if (client) {
        const token = JSON.parse(client);
        return {
            headers: {
                'auth_token': token
            }
        }
    }
    else {
        return {};
    }

};

export const getAdminRequestConfig = () => {
    const admin = localStorage.getItem("admin_token");
    if (admin) {
        const token = JSON.parse(admin);
        return {
            headers: {
                'admin_token': token
            }
        }
    }
    else {
        return {};
    }

};


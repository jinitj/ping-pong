export const isAdminPage = (path) => {
    return path.slice(0, 7) === "/admin/";
};
import axiosWithAuth from "./axiosWithAuth"

const useApi = () => {
    return axiosWithAuth()
        .get("api/colors")
        .then((res) => res.data);
}

export default useApi;
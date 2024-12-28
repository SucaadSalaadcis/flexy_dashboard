import axios from "axios";

const axiosPublicURL = axios.create({
    baseURL: 'https://peculiar-darkness-68u4yutcfh.ploi.dev/',  // Ensure the base URL is correct
});

export default function AxiosHook() {
    return axiosPublicURL;
}

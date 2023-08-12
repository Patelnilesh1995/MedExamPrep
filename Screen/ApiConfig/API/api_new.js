const callApi = async (url, method, data = null) => {
    try {

        const requestOptions = {
            method,
            headers: {
                Authorization: 'CiSOtCc3cFhOJFwXWSddh5i7OtKcmuBfEKvHlcPfGPwYegGOfN',
                // Add any other common headers here
            },
        };

        if (data) {
            if (method === 'POST' || method === 'PATCH') {
                const formBody = Object.keys(data)
                    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                    .join('&');
                requestOptions.body = formBody;
            } else if (method === 'GET') {
                // Handle GET request data here if needed
                const queryParams = Object.keys(data)
                    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                    .join('&');
                url = `${url}?${queryParams}`;
            }
        }

        const response = await fetch(url, requestOptions);
        const responseJson = await response.json();

        return responseJson;
    } catch (error) {
        console.log("error=", error);
        throw error;
    }
};

export default callApi;


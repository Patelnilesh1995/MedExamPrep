
const callApi_PATCH = async (url, method, data = null) => {
    try {
        const requestOptions = {
            method,
            headers: {
                Authorization: 'CiSOtCc3cFhOJFwXWSddh5i7OtKcmuBfEKvHlcPfGPwYegGOfN',
                // Add any other common headers here
                'Content-Type': 'application/json', // Set the content type for PATCH requests
            },
        };

        if (data) {
            if (method === 'POST' || method === 'PATCH') {
                requestOptions.body = JSON.stringify(data); // Use JSON.stringify for POST and PATCH requests
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

export default callApi_PATCH;

export function getBaseURL() {
    if (__DEV__) {  //Development
        return 'https://medexam-com.stackstaging.com/api'// This is Testing url
    } else {    //Live
        return 'https://medexam-com.stackstaging.com/api'// DO NOT USE THIS. IT IS LIVE 
    }
}


export default {
    MainBaseURL: getBaseURL(),
    LOGIN: '/Login',
}
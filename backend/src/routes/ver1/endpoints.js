import AuthRourter from "@/routes/ver1/auth.route.js";

const EndpointRouterV1 = {
    v1 :  {
        users : {path : 'users', method : 'GET'},router : AuthRourter,
    }
}
export default EndpointRouterV1;
import AuthRourter from "@/routes/ver1/auth.route.js";

const EndpointRouterV1 = {
//  users : {path : '/users',router : AuthRourter}
    auth : {path : '/auth',router : AuthRourter}
}
export default EndpointRouterV1;
import { MsalAuthProvider, LoginType } from "react-aad-msal";
import { Logger, LogLevel } from "msal";

export const authProvider = new MsalAuthProvider(
    {
        auth: {
            authority: "https://login.microsoftonline.com/common",
            clientId: "fa220e7b-aefe-4aa4-bfb4-85bd553cf0f8",
            postLogoutRedirectUri: window.location.origin,
            redirectUri: window.location.origin,
            validateAuthority: true,
            navigateToLoginRequestUrl: true,
        },
        cache: {
            cacheLocation: 'sessionStorage',
            storeAuthStateInCookie: true,
        },
    },
    {
        scopes: ['api://fa220e7b-aefe-4aa4-bfb4-85bd553cf0f8/Read']
    },
    LoginType.Redirect,
);
export const auth = {
  errors: {
    invalidData: "Invalid authentication data received",
    loginFailed: "Login failed",
    logoutError: "Error during logout: {{error}}",
    authError: "Error handling authentication {{error}}",
    getTokenError: "Error getting refresh token:",
    setTokenError: "Error setting refresh token:",
    removeTokenError: "Error removing refresh token:",
    emptyToken: "Attempt to save empty refresh token"
  },
  success: {
    login: "Successfully logged in!",
    logout: "Successfully logged out!"
  }
}; 
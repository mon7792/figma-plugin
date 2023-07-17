
declare global {
    declare module 'express-session' {
      interface SessionData {
        userID?: string,
        userName?: string,
        userEmail?: string,
      }
    }
  }
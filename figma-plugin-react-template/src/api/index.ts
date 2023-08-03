import { routes } from "../routes";

export type loginKeys = {
    rKey: string
    wKey: string
}

export type user = {
    key?: string
    authenticated: boolean
}

// getLoginKeys returns the readKeys and writeKeys.
export async function getLoginKeys():Promise<loginKeys>{
  const response = await fetch(routes.loginKeys);
  const keys: loginKeys = await response.json() as loginKeys
  return keys
}


// getLoginStatus return the login status for a particular rKey.
export async function getLoginStatus(rKey: string):Promise<user>{
    const response = await fetch(`${routes.loginStatus}?rKey=${rKey}`);
    const usr: user = await response.json() as user
    return usr
  }

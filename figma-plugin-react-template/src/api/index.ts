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


// postGenerateContent will prepares the post request and get the response from the api.
export async function postGenerateContent(key: string, content: string):Promise<Array<genSVG>>{
  const data = {
    content: content,
  }
  console.log(key)
  const response = await fetch(`${routes.generate}`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  const result: Array<genSVG> = await response.json() as Array<genSVG>
  return result
}

// method: "POST", // *GET, POST, PUT, DELETE, etc.
// mode: "cors", // no-cors, *cors, same-origin
// cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
// credentials: "same-origin", // include, *same-origin, omit
// headers: {
//   "Content-Type": "application/json",
// },
// redirect: "follow", // manual, *follow, error
// referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
// body: JSON.stringify(data), // body data type must match "Content-Type" header

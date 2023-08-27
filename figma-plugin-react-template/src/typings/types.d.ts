declare module '*.svg' {
  const content: any;
  export default content;
}

type genSVG = {
  id: string
  name: string
  url: string
}

type user = {
  key: string
  authenticated: boolean
}
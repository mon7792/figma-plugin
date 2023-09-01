import { Pool } from "pg";
import { Postgres } from "../../dependencies/postgres";
import { SVGDriver } from "./svg.drivers";

const testUserName = "dummy-user" 

describe("getAccess", () => {
  
  let postgres: Postgres;
  let pgPool: Pool;
  let svgDriver: SVGDriver;
  beforeAll(async () => {
    const host: string = process.env.WF_DB_HOST_NAME || "";
    const database: string = process.env.WF_DB_NAME || "";
    const user: string = process.env.WF_DB_USER_NAME || "";
    const password: string = process.env.WF_DB_USER_PASSWORD || "";
    const dbSSL: boolean = (process.env.WF_ENV || "LOCAL") !== "LOCAL" ? true: false ;
    const portNO: number = parseInt(
      process.env.WF_DB_PORT_NO || "5432"
    );

    // assertions
    expect(host).not.toEqual("");
    expect(database).not.toEqual("");
    expect(user).not.toEqual("");
    expect(password).not.toEqual("");

    // initialise the class.
    postgres = new Postgres(host, database, user, password, portNO, dbSSL);

    pgPool = await postgres.connect();

    svgDriver = new SVGDriver(pgPool)
  });

  test("insertSvgPrompt", async () => {
    let uid=helperRandomUID()
    let prompt="Draw a dark shade of sun"
    await svgDriver.insertSVG(uid, prompt, testUserName)
  });


  test("getAllSVG", async () => {
    const resp = await svgDriver.getSVG(testUserName)
    console.log(resp)
    expect(resp.length).toBeGreaterThan(0)
  });

  test("getSVGByID", async () => {
    let testSvgID =  "svg-4680"
    const resp = await svgDriver.getSVGByID(testUserName, testSvgID)
    console.log(resp)
  });

  afterAll(async ()=>{
    expect.assertions(5);
    await postgres.disconnect()
  })
});


// helperRandomUID
function helperRandomUID(): string{
  let rnd: string = `${Math.random()}`.split(".")[1]
  return `svg-${rnd}`.slice(0,8)
}
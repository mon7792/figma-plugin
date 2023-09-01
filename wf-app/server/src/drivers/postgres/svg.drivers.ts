import { Pool } from "pg";
import { SVGResponse } from "../../types";
import { SVGGateway } from "../../gateways/svg.gateway";

// insertSVGQuery docs
const insertSVGQuery = `insert into svg(uid, prompt, user_id)
select $1, $2, id
from users
where username=$3`

// getSVGQuery docs
const getSVGQuery = `select svg.uid, svg.prompt, svg_response.gen_url as url from svg
inner join users on users.id = svg.user_id
left join svg_response on svg.id = svg_response.svg_id
and users.username=$1`

// getSVGQuery docs
const getSVGByIDQuery = `select svg.uid, svg.prompt, svg_response.gen_url as url from svg
inner join users on users.id = svg.user_id
left join svg_response on svg.id = svg_response.svg_id
and users.username=$1
and svg.uid=$2`



// SVGDriver implements the SVG Functionality.
export class SVGDriver implements SVGGateway {
  private pgClient: Pool;

  constructor(pgClient: Pool) {
    this.pgClient = pgClient;
  }

  // insertSVG creates a entry in svg table with unqiue id and prompt.
  async insertSVG(uid: string, prompt: string, userID: string): Promise<void> {
    const values = [uid, prompt, userID];
    try {
      await this.pgClient.query(insertSVGQuery, values);
    } catch (error) {
      console.error(error)
      throw error
    }
    return;
  }

  // getSVG returns a list of SVG for a particular user.
  async getSVG(userID: string): Promise<Array<SVGResponse>> {
    const values = [userID];
    const res = await this.pgClient.query(getSVGQuery, values);
    if (res.rows.length === 0) {
      return []
    }

    let resp = this.getUIDSvgRespMap(res.rows)
    return Array.from(resp.values());
  }


  // getSVGByID return single svg entry for particular user. 
  async getSVGByID(userID: string, uid: string): Promise<SVGResponse> {
    const values = [userID, uid];
    const res = await this.pgClient.query(getSVGByIDQuery, values);
    if (res.rows.length === 0) {
      throw Error("no such svg id exists")
    }

    let resp = this.getUIDSvgRespMap(res.rows)
    return Array.from(resp.values())[0];
  }


  // getUIDSvgRespMap return map contains the unique values
  private getUIDSvgRespMap(rows: Array<any>): Map<string, SVGResponse> {
    let uidSvgResp: Map<string, SVGResponse> = new Map();
    rows.forEach((elem) => {
      // check if uid exists 
      if (uidSvgResp.has(elem.uid)) {
        let resp: SVGResponse = uidSvgResp.get(elem.uid) as SVGResponse
        if (typeof resp === "undefined") {
          // skip current iteration
          return
        }

        if (elem.url !== null) {
          resp.url.push(elem.url)
          uidSvgResp.set(elem.uid, resp)
        }

        return
      }

      //  if uid doesnot exists, create a new entry.
      let urls = []
      if (elem.url !== null) {
        urls.push(elem.url)
      }

      uidSvgResp.set(elem.uid, { id: elem.uid, prompt: elem.prompt, url: urls })
    });

    return uidSvgResp
  }

}

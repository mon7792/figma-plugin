import { SVGGateway } from "../../gateways/svg.gateway";
import { SVGResponse } from "../../types";

export class ListSVG {
  constructor(private svgGateway: SVGGateway) {}

  // TODO: work on the pagination parameters
  async exec(userID: string): Promise<Array<SVGResponse>> {
    return await this.svgGateway.getSVG(userID);
  }
}

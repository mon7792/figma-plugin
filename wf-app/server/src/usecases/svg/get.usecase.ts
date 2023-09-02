import { validateSvgUID } from "../../entities/svg";
import { SVGGateway } from "../../gateways/svg.gateway";
import { SVGResponse } from "../../types";

export class GetSVG {
  constructor(private svgGateway: SVGGateway) {}
  // TODO: work on the pagination parameters
  async exec(userID: string, svgUID: string): Promise<SVGResponse> {
    // TODO: check if SVG UID follow the format.
    if (validateSvgUID(svgUID)){
        throw Error("invalid svg uid")
    }
    
    return await this.svgGateway.getSVGByID(userID, svgUID);
  }
}

import { genSvgUID, validSVGPrompt } from "../../entities/svg";
import { SVGGateway } from "../../gateways/svg.gateway";

export class AddSVG {
  constructor(private svgGateway: SVGGateway) {}

  async exec(prompt: string, userID: string): Promise<string> {

    if (!validSVGPrompt(prompt)){
      throw Error("invalid prompt error")
    }

    const svgUID = genSvgUID()

    // TODO: work on this to return ID
    await this.svgGateway.insertSVG(svgUID, prompt, userID)
    return ""
  }
}

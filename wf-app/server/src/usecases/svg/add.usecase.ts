import { SVGGateway } from "../../gateways/svg.gateway";

export class AddSVG {
  constructor(private svgGateway: SVGGateway) {}

  async exec(prompt: string): Promise<void> {
    // TODO: perform svg prompt validation
    await this.svgGateway.insertSVG(prompt);
  }
}

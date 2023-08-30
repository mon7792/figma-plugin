import { Request, Response } from "express";

// SVGController returns all the handler related to SVG functionality.
export class SVGController {
  constructor() {}


  // addSVG creates an entry in db & generate the SVG Generation
  addSVG = async (req: Request, res: Response) => {
    res.sendStatus(200);
  };

  // getSVG returns the list of svg for a particular user. 
  getSVG = async (req: Request, res: Response) => {
    res.send([]);
  };


  // getSVGByID return the svg status by ID
  getSVGByID = (req: Request, res: Response) => {
    res.send({ title: "sadfs" });
  };
}

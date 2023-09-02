import { Request, Response } from "express";

// SVGController returns all the handler related to SVG functionality.
export class SVGController {
  constructor() {}

  // addSVG creates an entry in db & generate the SVG Generation
  addSVG = async (req: Request, res: Response) => {
    // 0. check if the user has enough credits

    // 1. validate the svg prompt.
  
    // 2. send the request to ai api to get the response.

    // 3. store the svg in google bucket.

    // 4. add the svg entry and svg response entry
    
    // 5. return the response.
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

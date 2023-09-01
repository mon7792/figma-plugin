import { SVGResponse } from "../types"

// SVGGateway contains all methods to be implemented on svg entity.
export interface SVGGateway{
    insertSVG(uid: string, prompt: string, userID: string): Promise<void> 
    getSVG(userID: string): Promise<Array<SVGResponse>>
    getSVGByID(userID: string, uid: string): Promise<SVGResponse>
}
import { validationResult } from "express-validator";

 /**
  * Palauttaa virhekutsun. Jos kutsussa oli virheitä, palautetaan virheellinen kutsu, muuten
  * funktio palauttaa null, kun kutsu on virheetön.
  * @param {*} request 
  * @param {*} response 
  * @returns errResponse
  */
  export default function ValidationResponse(request, response){
    const err = validationResult(request);
    if(!err.isEmpty()){
        return response.status(400).json({
            method: request.method,
            status: response.statusCode,
            errors: err.array()
        })
    }

    return null
 }
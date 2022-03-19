import { validationResult } from 'express-validator';
import { getReviewsByID, createReview } from './model/book.js'

/** 
 * hae käyttäkän kaikki arvostelut
 * 
 * @name books get
 * @route {GET} /api/books/reviews/:id
 */
 export default (async (request, response) => {
     if(request.params.id){
        const success = await getReviewsByID(request.params.id)
        return response.status(200).json({rows: success, message: "OK"})
     }

     return response.status(401).json({message: "Invalid Collection"})
})


/** 
 * hae käyttäkän kaikki arvostelut
 * 
 * @name books post
 * @route {POST} /api/books/reviews/addreview
 */
export async function addreview(request, response){
    const err = validationResult(request);
    if(!err.isEmpty()){
        return response.status(400).json({
            method: request.method,
            status: response.statusCode,
            errors: err.array()
        })
    }

    const success = await createReview({
        user: request.body.user,
        book: request.body.book,
        score: request.body.score
    })



    

}
import { Router } from 'express'
import { body, param } from 'express-validator';
import { authentication } from '../../auth/pwd.js';
import ValidationResponse from '../../utils/ValidationResponse.js';

import { createReview, deleteReview, getReview, getReviewsByBook, getReviewsByUser, getReviewUnique } from './model/review.js';

/**
 * Arvostelujen hallinta
 * 
 * @module reviews
 * @category API
 * @route {GET} /api/reviews
 */

 const router = Router();

/** Hae yksittäinen kommentti
* @route {GET} /reviews/:id
*/
router.get("/:id", param("id").not().isEmpty().isInt(), authentication, async (request, response) => {
    const errResponse = ValidationResponse(request, response)
    if(errResponse != null){
        return errResponse
    }

    const row = await getReview(request.params.id)

    if(row != null){
        return response.status(200).json({rows: row, message:"OK"})
    }

    return response.status(401).json({message: "Unable to load user comment"})
})


/**
 * Lisää käyttäjän kommentti kirjalle
 * @route {POST} reviews/book/:tag
 */
router.post("/book/:tag", 
    body("comment").isLength({min: 5, max: 280}).withMessage('Comment  must be between 5 and 280 characters long').matches(/^[A-Za-z0-9 .,'!&]+$/).withMessage('Invalid string literal was used'),
    param("tag").not().isEmpty().isString(), 
    authentication, async (request, response) => {
        const errResponse = ValidationResponse(request, response)
        if(errResponse != null){
            return errResponse
        }

        const duplicate = await getReviewUnique(request.id, request.params.tag)

        if(duplicate){
            return response.status(401).json({message: "A user comment already exists"})
        }

        const success = await createReview({
            user: request.id,
            book: request.params.tag,
            comment: request.body.comment
        })

        if(success){
            return response.status(200).json({rows: success, message:"OK"})
        }

        return response.status(401).json({message: "Unable to create user comment"})

})


/**
 * Poista käyttäjän kommentti kirjalle
 * @route {DELETE} reviews/book/:tag
 */
router.delete("/book/:tag",  param("tag").not().isEmpty().isString(), authentication, async (request, response) => {
    const errResponse = ValidationResponse(request, response)
    if(errResponse != null){
        return errResponse
    }

    const success = await deleteReview({
        user: request.id,
        book: request.params.tag
    })

    if(success){
        return response.status(200).json({rows: success, message:"OK"})
    }

    return response.status(401).json({message: "Unable to delete user comment"})

})

 /**
 * Muokkaa käyttäjän kommentti kirjalle
 * @route {UPDATE} reviews/book/:tag
 */
router.put("/book/:tag", param("tag").not().isEmpty().isString(), authentication, async (request, response) => {
    const errResponse = ValidationResponse(request, response)
    if(errResponse != null){
        return errResponse
    }

    return response.status(501).json({message: "Feature unavailable"})
})



 /**
 * Hae kaikki kirjan kommentit
 * @route {GET} reviews/book/:tag
 */
router.get("/book/:tag", param("tag").not().isEmpty().isString(), authentication, async (request, response) => {
    const errResponse = ValidationResponse(request, response)
    if(errResponse != null){
        return errResponse
    }

    const rows = await getReviewsByBook(request.params.tag)

    if(rows != null){
        return response.status(200).json({rows: rows, message:"OK"})
    }

    return response.status(401).json({message: "Nothing to fetch"})

})


/**
 * Hae kaikki käyttäjän kommentit 
 * @route {GET} /reviews/user/:id
 */
 router.get("/user/:id", param("id").not().isEmpty().isInt(), authentication, async (request, response) => {
    const errResponse = ValidationResponse(request, response)
    if(errResponse != null){
        return errResponse
    }

    const rows = await getReviewsByUser(request.params.id)

    if(rows != null){
        return response.status(200).json({rows: rows, message:"OK"})
    }

    return response.status(401).json({message: "Nothing to fetch"})

 })

 

 export default router;
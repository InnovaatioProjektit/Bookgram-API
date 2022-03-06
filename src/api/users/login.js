/**
 * Reitittää kirjautumisen
 * 
 * @module login
 * @category Routes
 */

export default ((request, response ) => {
    return response.status(200).send({
        message: "within login"
    })
})
/**
 * Reitittää poiskirjautumisen
 * 
 * @module logout
 * @category Routes
 */

 export default ( async (request, response) => {
    return response.status(200).send({
        message: "within logout"
    })
})
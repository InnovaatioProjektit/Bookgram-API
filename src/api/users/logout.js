/**
 * Reitittää poiskirjautumisen
 * 
 * @module logout
 * @category Routes
 */

 export default ((request, response) => {
    return response.status(200).send({
        message: "within logout"
    })
})
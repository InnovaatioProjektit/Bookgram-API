/** 
 * Kirjaa käyttäjä ulko
 * 
 * @name users post
 * @route {POST} /api/users
 */
 export default ((request, response) => {
    return response.status(200).send("goodbye")
})
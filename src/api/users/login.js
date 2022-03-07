/** 
 * Kirjaa käyttäjä sisälle
 * 
 * @name users post
 * @route {POST} /api/users
 */
export default ((request, response ) => {
    return response.status(200).send("within login")
})
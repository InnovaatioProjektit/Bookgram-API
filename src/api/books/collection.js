import { validationResult } from 'express-validator';
import { getBooksByCollection, getCollectionByID, getBook, createBook } from './model/book.js'

/** 
 * Hae kirjakokoelman kaikki kirjat
 * 
 * @name books get
 * @route {GET} /api/books/collection/:id
 */
 export default (async (request, response) => {
   const err = validationResult(request);
   if(!err.isEmpty()){
       return response.status(400).json({
           method: request.method,
           status: response.statusCode,
           errors: err.array()
       })
   }

   if(request.params.id){
      const success = await getBooksByCollection(request.params.id)

      if(success){
         return response.status(200).json({rows: success, message: "OK"})
      }

      return response.status(400).json({message: "No books in such collection"})
   }

   return response.status(401).json({message: "Invalid Collection"})
})


/** 
 * Hae kirjakokoelma id:llä
 * 
 * @name books get
 * @route {GET} /api/books/collections/:id
 */
export async function collections(request, response){
    if(request.params.id){
        const success = await getCollectionByID(request.params.id)
        return response.status(200).json({rows: success, message: "OK"})
     }
 
     return response.status(401).json({message: "Invalid Collection"})

}

/** 
 * Hae kirja tag:llä
 * 
 * @name books get
 * @route {GET} /api/books/volume/:tag
 */
 export async function volume(request, response){
    if(request.params.tag){
        const success = await getBook(request.params.tag)

        if(success){
            return response.status(200).json({rows: success, message: "OK"})
        }
        
     }
 
     return response.status(401).json({message: "Invalid book tag"})
}


/** 
 * Lisää kirja käyttäjän kokoelmaan
 * 
 * @name books post
 * @route {POST} /api/books/volume
 */
 export async function addVolume(request, response){
   const err = validationResult(request);
   if(!err.isEmpty()){
       return response.status(400).json({
           method: request.method,
           status: response.statusCode,
           errors: err.array()
       })
   }

   try{
      const id = await createBook({
         user: request.body.user,
         tag: request.body.tag
      })

      console.log(`A user ${request.body.user} added a book '${request.body.tag}' to their collection`)
   
      return await response.status(200).json({rows: id, message:"Book added to user collection"})

   }catch(err){
      console.log(err)
      return response.status(401).json({message: "Unable to add book to user collection"})
   }
}



/** 
 * Poista kirja käyttäjän kokoelmasta
 * 
 * @name books delete
 * @route {DELETE} /api/books/volume
 */
 export async function removeVolume(request, response){
   const err = validationResult(request);
   if(!err.isEmpty()){
       return response.status(400).json({
           method: request.method,
           status: response.statusCode,
           errors: err.array()
       })
   }

   const rows = await removeBook({
      user: request.body.user,
      tag: request.body.tag
   })

   if(rows >= 1){

      console.log(`A user ${request.body.user} removed a book ${request.body.tag} from their collection`)
      return response.status(200).json({rows: id, message:"Book removed from user collection"})
   }

   return response.status(401).json({message: "Unable to remove book from collection"})
}
import { validationResult } from 'express-validator';
import { 
   createCollection, 
   removeCollection, 
   clearCollection,
   getBooksByCollection, 
   getCollectionByID, 
   getCollectionsByUser,
   addBookToCollection, 
   removeBookFromCollection, 
   getCollectionsByBook,
   getCollectionFavourited,
   updateCollectionFavourited, 
   updateBookStarred} from './model/book.js'

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
      const success = await getBooksByCollection(request.params.shelf)

      if(success){
         return response.status(200).json({rows: success, message: "OK"})
      }

      return response.status(400).json({message: "No books in such collection"})
   }

   return response.status(401).json({message: "Invalid Collection"})
})


/** 
 * Hae käyttäjän kaikki kokoelmat
 * 
 * @name books get
 * @route {GET}  /books/collections
 */
 export async function collections(request, response){
   if(request.id){
       const success = await getCollectionsByUser(request.id)

       return response.status(200).json({rows: success, message: "OK"})
    }

    return response.status(401).json({message: "Invalid User"})
}


/** 
 * Hae kirjakokoelma id:llä
 * 
 * @name books get
 * @route {GET} /api/books/collections/:id
 */
export async function collectionByID(request, response){
    if(request.params.id || request.id){
        const success = await getCollectionByID(request.params.id)
        return response.status(200).json({rows: success, message: "OK"})
     }
 
     return response.status(401).json({message: "Invalid Collection"})
}

/** 
 * Hae kirja tag:llä
 * 
 * TODO
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
 * @route {POST} /api/books/collections/:shelf/addBook
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
      const id = await addBookToCollection({
         user: request.body.user,
         tag: request.body.tag,
         shelf: request.params.shelf
      })

      console.log(`A user ${request.body.user} added a book '${request.body.tag}' to collection '${request.params.shelf}'`)
   
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
 * @route {DELETE} /api/books/collections/:shelf/removeBook
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


   const rows = await removeBookFromCollection({
      shelf: request.params.shelf,
      tag: request.body.tag
   })

   if(rows >= 1){
      console.log(`A user ${request.body.user} removed a book ${request.body.tag} from their collection '${request.params.shelf}'`)
      return response.status(200).json({rows: rows, message:"Book removed from user collection"})
   }

   return response.status(401).json({message: "Unable to remove book from collection"})
}


/** 
 * Luo uusi kokoelma käyttäjälle
 * 
 * @name books post
 * @route {POST} /api/books/collections/createCollection
 */
 export async function createUserCollection(request, response){
   const err = validationResult(request);
   if(!err.isEmpty()){
       return response.status(400).json({
           method: request.method,
           status: response.statusCode,
           errors: err.array()
       })
   }

   const id = await createCollection({
      user: request.body.user,
      collectionName: request.body.collectionName
   })

   if(id != null){
      console.log(`A user ${request.body.user} created a new collection'`)
      return response.status(200).json({rows: id, message:"A new collection was added to user collections"})
   }

   return response.status(401).json({message: "Unable to create a collection"})

 }


 
/** 
 * Poista käytäjän kokoelma
 * 
 * @name books delete
 * @route {DELETE} /api/books/collections/removeCollection
 */
 export async function removeUserCollection(request, response){
   const err = validationResult(request);
   if(!err.isEmpty()){
       return response.status(400).json({
           method: request.method,
           status: response.statusCode,
           errors: err.array()
       })
   }

   const id = await removeCollection({
      user: request.body.user,
      shelf: request.body.shelf
   })

   if(id != null){
      console.log(`A user ${request.body.user} removed a collection '${request.params.shelf}'`)
      return response.status(200).json({rows: id, message:"The collection was removed"})
   }

   return response.status(401).json({message: "Unable to remove the collection"})

 }



 /**
  * Tyhjennä käyttäjän kokoelma
  * @name books post
  * @route {POST} /api/books/collections/clearCollection
  */
  export async function clearUserCollection(request, response){
   const err = validationResult(request);
   if(!err.isEmpty()){
       return response.status(400).json({
           method: request.method,
           status: response.statusCode,
           errors: err.array()
       })
   }

   const data = await clearCollection({
      user: request.body.user,
      shelf: request.body.shelf
   })

   if(data){
      return response.status(200).json({rows: data, message: "The collection was cleared"})
   }

   return response.status(401).json({message: "Unable to clear the collection"})

  }


  /**
   * Hae kaikki kokoelmat, jossa haettava kirja sijaitsee
   * @name books get
   * @route {GET} /books/collections/book/:tag
   */
   export async function collectionsByBook(request, response){
      const err = validationResult(request);
      if(!err.isEmpty()){
         return response.status(400).json({
            method: request.method,
            status: response.statusCode,
            errors: err.array()
         })
      }

      const success = await getCollectionsByBook(request.params.tag);

      if(success){
         return response.status(200).json({rows: rows, message: "OK"})
      }


      return response.status(401).json({message: "Unable fetch collections"})

   }


/** 
 * Hae kokoelman tykkäykset
 * 
 * @name books get
 * @route {GET} /books/collections/:shelf/likes
 */
 export async function collectionLikes(request, response){
   const err = validationResult(request);
   if(!err.isEmpty()){
       return response.status(400).json({
           method: request.method,
           status: response.statusCode,
           errors: err.array()
       })
   }

   const likes = await getCollectionFavourited(request.params.shelf)

   if(likes != null){
      return response.status(200).json({rows: likes, message:"OK"})
   }

   return response.status(401).json({message: "Unable to get likes from collection"})

 }



 /** 
 * Lisää tykkäys kokoelmalle
 * 
 * @name books post
 * @route {POST} /books/collections/:shelf/likes
 */
  export async function collectionLikesAdd(request, response){
   const err = validationResult(request);
   if(!err.isEmpty()){
       return response.status(400).json({
           method: request.method,
           status: response.statusCode,
           errors: err.array()
       })
   }

   const success = await updateCollectionFavourited(request.params.shelf, request.body.count)

   if(success != null){
      return response.status(200).json({rows: success, message:"OK"})
   }

   return response.status(401).json({message: "Unable to add likes from collection"})

 }


/** 
 * Lisää tykkäys kirjalle
 * 
 * @name books post
 * @route {POST} /books/collections/:shelf/starred
 */
export async function setBookStarred(request, response){
   const err = validationResult(request);
   if(!err.isEmpty()){
         return response.status(400).json({
            method: request.method,
            status: response.statusCode,
            errors: err.array()
         })
   }

   const success = await updateBookStarred(request.body.booktag, request.body.count)

   if(success != null){
      return response.status(200).json({rows: success, message:"OK"})
   }

   return response.status(401).json({message: "Unable to add likes from collection"})

}

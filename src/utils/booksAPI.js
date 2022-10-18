/**
 * Google Books Middleware
 */


import { get } from 'https';
import { stringify } from 'querystring';
  
  
  // https://developers.google.com/books/docs/v1/using#st_params
  var defaultOptions = {
      // Google API key
      key: null,
      // Search in a specified field
      field: null,
      // The position in the collection at which to start the list of results (startIndex)
      offset: 0,
      // The maximum number of elements to return with this request (Max 40) (maxResults)
      limit: 10,
      // Restrict results to books or magazines (or both) (printType)
      type: 'all',
      // Order results by relevance or newest (orderBy)
      order: 'relevance',
      // Restrict results to a specified language (two-letter ISO-639-1 code) (langRestrict)
      lang: 'en'
  };
  
  
  // Special Keywords
  var fields = {
      title: 'intitle:',
      author: 'inauthor:',
      publisher: 'inpublisher:',
      subject: 'subject:',
      isbn: 'isbn:'
  };
  
  
  // Base url for Google Books API
  var API_BASE_URL = 'https://www.googleapis.com/books/v1';
  
  
  
/**
 * Send a Google Books API request
 */
async function sendRequest(path, params) {
    var url = API_BASE_URL;
  
    if (path) {
        url += path;
    }

    if (params) {
        url += '?' + stringify(params);
    }

    return new Promise((resolve, reject) => {
        let data = ''

        get(url, res => {

            res.on('data', chunk => { data += chunk }) 

            res.on('end', () => {
                let json, err;
                try{
                    json = JSON.parse(data)
                }catch(e){
                    err = new Error("Invalid response from Google Books")
                }

                if(json.error){
                    reject(new Error(json.error.message))
                }else if(err){
                    reject(err)
                }

               resolve(json);

            })
        }) 
    })
}

/**
 * Search Google Books
 *
 * https://developers.google.com/books/docs/v1/reference/volumes/list
 *
 * @param  {String}   query
 * @param  {object}   options
 * @param  {Function} callback
 */
async function search(query, options) {
  
    options = defaultOptions

    // Set any special keywords
    if (options.field) {
        query = fields[options.field] + query;
    }
  
    // Create the request uri
    var query = {
        q: query,
        startIndex: options.offset,
        maxResults: options.limit,
        printType: options.type,
        orderBy: options.order,
        langRestrict: options.lang
    };
  
    if (options.key) {
        query.key = options.key;
    }
  
    return sendRequest('/volumes', query);

};
  
  
/**
 * Retrieves a Volume resource based on ID.
 *
 * https://developers.google.com/books/docs/v1/reference/volumes/get
 *
 * @param  {String}   volumeId
 * @param  {Function} callback
 */
async function lookup(volumeId, key) {
    var query = {};
    if(key != null){
        query.key = key;
    }
    return sendRequest('/volumes/' + volumeId);
};
  
  
  



export default { search, lookup }
/**
 * Inputtien validointiin käytettyt työkalut
 */


/**
 * Sähköpostiosoitteen oikeinkirjoituksen validointi
 * @param {string} e 
 * @returns palauttaa totta jos teksti vastaa odotettua formaattia
 */
 export const validateEmail = (e) => {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(e) && isRequired(e)
}


/**
 * input tekstin sanitaasio
 * @param {string} value 
 * @returns palauttaa totta, jos teksti on ei ole tyhjä
 */
 export function isRequired(value){
    return value != null && value.trim().length > 0;
}

/**
 * Todella iso teksti katkaista pieneksi pätkäksi, preview muotoon.
 * 
 * Käyttö:
 * 
 * const str = limit("hello World", 6)
 * // 'hello ...'
 * 
 * @param {string} string 
 * @param {number} limit 
 * @returns 
 */
export function limit (string = '', limit = 0, cut = ' ...') {  
    return string.substring(0, limit) + cut
  }
  
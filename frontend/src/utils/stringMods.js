/**
 * Stringien muokkauksia
 */

/**
 * Palauta stringiä vastaavan väri hexadecimaalina.
 * 
 * @param {*} string 
 * @returns hexadecimal color
 */
 export function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
/**
 * Palauta MUI-tyyppinen tyyliobjekti, jossa on tekstin alkukirjaimet ja 
 * alkukirjaimia vastaa taustaväri. Käytetään avatar/käyttäjä iconissa.
 * 
 * @param {*} name käyttäjän nimi
 * @returns styleObject
 */
export function stringAvatar(name, sx) {
return {
    sx: {
      ...sx,
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
};
}
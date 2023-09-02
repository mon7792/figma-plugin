const maxPromptLen = 50;
const minPromptLen = 5;

const svgUIDLen = 15;
const svgUIDPrefix = `svg-`;
const svgUIDPfLen = 4;

// addTodo validates and returns todos to be added to the database.
export const validSVGPrompt = (prompt: string): boolean => {
  let promptLen = prompt.trim().length;
  if (promptLen < minPromptLen || promptLen > maxPromptLen) {
    console.error(
      `prompt length must within ${minPromptLen}-${maxPromptLen} length`
    );
    throw false;
  }

  return true;
};

// genSvgUID generates random SVG ID
export const genSvgUID = (): string => {
  let rnd: string = `${Math.random()}`.split(".")[1];
  return `${svgUIDPrefix}${rnd}`.slice(0, svgUIDLen);
};


// validateSvgUID checks if svgUID is valid
export const validateSvgUID = (svgUID: string): boolean => {
    svgUID = svgUID.trim()
    if (svgUID.length !== svgUIDLen){
        return false
    }

    if (svgUID.slice(0,svgUIDPfLen) !== svgUIDPrefix){
        return false
    }

    // check if the postfix is a number
    if (isNaN(parseInt(svgUID.slice(svgUIDPfLen, svgUIDLen)))){
        return false
    }
        
    return true
  };

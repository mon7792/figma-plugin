// wap to read a file.
// 1. store the file in the memory
// 2. look for char <
// 3. store all the character after that in tag until > is found
// 4. push it into stack

// wap to retrieve tags
function getTags(str: string): Array<string> {
    let tags: Array<string> = [];
    let tg: string = "";
    for (let i = 0; i < str.length; i++) {
      switch (str[i]) {
        case "<":
          console.log(tg);
          tg = "";
          break;
        case ">":
          if (tg !== "" && tg[0] !== "/") {
            tags.push(tg);
          }
          tg = "";
          break;
        default:
          tg = tg + str[i];
          break;
      }
    }
  
    return tags;
  }
  
  function prettyPrint(str: string) {
    let tags: Array<string> = [];
    let tg: string = "";
    var htmlLine: string = "";
    let strLen = str.length;
    for (let i = 0; i < strLen; i++) {
      // spacing logic
      switch (str[i]) {
        case "<":
          tg = "";
          break;
        case ">":
          if (tg !== "" && tg[0] !== "/") {
            tags.push(tg);
          } else {
            tags.pop();
          }
          console.log(tags);
          tg = "";
          break;
        default:
          tg = tg + str[i];
          break;
      }
  
      // print logic
      if (str[i] === "<" && str[i - 1] === ">") {
        let spaceStr = "";
        if (i + 1 < strLen && str[i + 1] === "/") {
          spaceStr = " ".repeat(tags.length + 1);
        } else {
          spaceStr = " ".repeat(tags.length);
        }
  
        console.log(spaceStr + htmlLine);
        htmlLine = "";
      }
      htmlLine += str[i];
    }
  }
  
  function stack() {
    let a = [];
  
    a.push(1);
    a.push(2);
    a.push(3);
    console.log(a);
    a.pop();
    console.log(a);
    a.pop();
    console.log(a);
    a.pop();
    console.log(a);
  }
  
  // console.log(getTags(sampleHTML));
  
  // console.log(Node);
  // console.log(prettyPrint(sampleHTML));
  

//find the max number in an array in golang.



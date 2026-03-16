async function extractPageText(tabId) {
    const [{result}] = await chrome.scripting.executeScript({
      target:{tabId},
  
      func:()=>{
        const title = document.title;
        const url = location.href;
  
        document
          .querySelectorAll("script,style,noscript")
          .forEach(n=>n.remove());
  
        const text =
        document.body.innerText
          .replace(/\s+\n/g,"\n")
          .trim();
  
        return {title,url,text};
      }
    });
  
    return result;
}

export { extractPageText };

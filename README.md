## PDF

A node app exposing an API that returns a PDF download to the browser of the POSTed URL as rendered in Chrome using the document's own print styles.

POST endpoint https://storm-pdf.herokuapp.com

Test UI https://storm-pdf.herokuapp.com/ui

Embed code for print button (with no default styles and a .sp-button className for customisation):
```
<div id="sp-root"></div><script async src="/button/index.js"></script>
```
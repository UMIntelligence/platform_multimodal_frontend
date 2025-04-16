import FileSaver from "file-saver"; 
import htmlDocx from "html-docx-js/dist/html-docx";
 
export function exportWord(htmlContent,name){
  const fullHtmlContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <style>
            .analysis-title {
    font-weight: bold;
    font-size: 20px;
    color: #000000;
}
    .keyPoint{
    margin-bottom:16px;
    }
    .keyPoint .title{
      font-weight: bold;
    font-size: 16px;
    color: #000000;
    line-height: 19px;
    }
    .overview{
      margin-bottom: 16px;
    }
.overview .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
    font-size: 16px;
    color: #000000;
    line-height: 19px;
    margin-bottom: 16px;
}
.overview .title img {
    width: 24px;
    height: 24px;
    cursor: pointer;
}
.analysis-container .title {
    font-weight: bold;
    font-size: 16px;
    color: #000000;
    line-height: 19px;
    margin-bottom: 16px;
}
.analysis-container .content {
    font-weight: 400;
    font-size: 14px;
    color: #000000;
    line-height: 24px;
}
.speedReading-card {
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-bottom: 20px;
}
.speedReading-card .speedReading-item-pageNum {
    width: 48px;
    height: 24px;
    line-height: 24px;
    background: #F2F2F2;
    border-radius: 5px 5px 5px 5px;
    font-weight: bold;
    font-size: 12px;
    color: #666666;
    text-align: center;
    margin-top: 19px;
    box-sizing: border-box;
}
.speedReading-card .speedReading-card-divider {
    margin-left: 10px;
    margin-right: 16px;
    position: relative;
}
.speedReading-card-circle {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-top: 28px;
    background: #003FFF;
}
.speedReading-card .speedReading-card-line {
    display: block;
    border-right: 1px dashed #DAE0F2;
    height: 100%;
    position: absolute;
    left: 50%;
    top: 40px;
    transform: translate(-50%);
}
.speedReading-card .speedReading-card-content {
    flex: 1 1;
    background: #EAEFFF;
    border-radius: 16px 16px 16px 16px;
    border: 1px solid #E6ECFF;
    padding: 20px;
    box-sizing: border-box;
    height: auto;
}
.speedReading-card .speedReading-card-content .text {
    font-weight: 400;
    font-size: 12px;
    color: #000000;
    line-height: 24px;
}
.speedReading-card .speedReading-card-content .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
    font-size: 14px;
    color: #000000;
    margin-bottom: 12px;
    
}
.copyImg {
  width: 24px;
  height: 24px;
  cursor: pointer;
  opacity: 0;
}
.analysis-container {
    width: 100%;
    height: calc(100% - 74px);
    padding: 30px;
    padding-top: 10px;
    box-sizing: border-box;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 30px;
    position: relative;
}</style>

      </style>
      </head>
    <body>
      ${htmlContent}
    </body>
  </html>`
  console.log(fullHtmlContent)
 let wordYang = htmlDocx.asBlob(fullHtmlContent);
 FileSaver.saveAs(wordYang,name)
}
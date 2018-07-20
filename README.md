# Node.js backend for college.uni-dubna.ru

### .editorconfig

Для стандартизации отображения в разных IDE

### /test

Используется mocha для тестирования

script in package.json:

npm run start - run server  
npm run test - run tests  
npm run docs - generate docs

mocha + chai:

https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai  
http://www.chaijs.com/guide/styles/  
http://www.chaijs.com/plugins/chai-http/  
https://mochajs.org/#delayed-root-suite

esdoc:

https://esdoc.org/manual/usage.html#configuration

node.js realworld:

https://github.com/gothinkster/node-express-realworld-example-app

### Uploading files

https://github.com/felixge/node-formidable

### For downloading file with right name

https://www.w3schools.com/tags/att_a_download.asp

# TODO list

-   site:
    -   API:
        -   news:
            -   getPhotoByNewsID
            -   getDocsByNewsId
            -   getNewsById
            -   get6news for main page
            -   getAllNews:
                -   getNewsCount
                -   getNewsByPage
        -   education + educationannotation
        -   getAllNewsByPage
        -   pages:
            -   getById
        -   sveden:
            -   budget
                -   link to the uni-dubna
            -   common
                -   getMainSveden
            -   document
                -   link to the uni-dubna
            -   education
                -   getEduAccred
                -   eduaccred +
                    -   edupriem
                    -   eduperevod
                    -   eduop
                    -   educhislen
            -   eduStandarts
                -   getEduStandartDoc
            -   employees
                -   getHeads
                -   getTeachingStaff
            -   grants
                -   getGraduateJob
                -   getHostelInfo
                -   getGrantsDocs
            -   objects
                -   getPurposeCab
                -   getPurposeLibr
                -   getPurposeEios
            -   paid_edu
                -   link to the uni-dubna
            -   struct
                -   getHeads
            -   vacant
                -   getVacant

*   Admin
    -   API
        -   sveden:
            -   budget
                -   nothing
            -   common
            -   document
                -   nothing
            -   education
            -   eduStandarts
            -   employees
            -   grants
            -   objects
            -   paid_edu
                -   nothing
            -   struct
            -   vacant
        *   news:
        *   pages content

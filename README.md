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

### Tutorial?

https://codeburst.io/build-a-rest-api-for-node-mysql-2018-jwt-6957bcfc7ac9

# TODO list

-   site:
    -   API:
        -   news:
            -   getPhotoByNewsID +
            -   getDocsByNewsId +
            -   getNewsById +
            -   get6news for main page +
            -   getAllNews: +
                -   getNewsCount +
                -   getNewsByPage +
        -   education + educationannotation
        -   pages:
            -   getById
        -   sveden:
            -   budget
                -   link to the uni-dubna
            -   common +
                -   getMainSveden
            -   document
                -   link to the uni-dubna
            -   education +
                -   getEduAccred
                -   eduaccred and
                    -   edupriem
                    -   eduperevod
                    -   eduop
                    -   educhislen
            -   eduStandarts +
                -   getEduStandartDoc
            -   employees +
                -   getHeads
                -   getTeachingStaff
            -   grants +
                -   getGraduateJob
                -   getHostelInfo
                -   getGrantsDocs
            -   objects +
                -   getPurposeCab
                -   getPurposeLibr
                -   getPurposeEios
            -   paid_edu
                -   link to the uni-dubna
            -   struct (employees)
                -   getHeads
            -   vacant +
                -   getVacant

*   Admin
    -   API
        -   upload_files
        -   change_page
        -   News:
            -   **add news and logo**
            -   add files
            -   add photos
            -   delete files
            -   delete photos
            -   delete news
            -   update news
        -   sveden:
            -   budget +
                -   nothing
            -   common +
            -   document +
                -   nothing
            -   education
                1.  Add information about programm and years
                2.  **Change education table (5 tuples). Adding files**
                3.  Chislen, Priem, Perevod
            -   eduStandarts + (upload.js)
                -   **name, link**
            -   employees + (heads and teachers)
            -   grants + (grants + upload.js)
                -   **purposelibr (name, link)**
            -   objects +
                -   **objects (documents copies)**
            -   paid_edu +
                -   nothing
            -   struct +
            -   vacant +

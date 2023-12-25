# API DOCUMENTASI

### GET STARTED

1. If using yarn :

   > installation
   > `$ yarn`
   > run
   > `$ yarn dev `

2. If using npm :
   > installation
   > `$ npm install`
   > run
   > `npm run dev`

# API ENDPOINT

- [A] PRODUCTS

  - > GET ALL PRODUCTS
    - > METHOD : `GET`
    - > URL : `http://localhost:3000/api/v1/products`
    - > RESULT :
  - > GET ONE PRODUCT
    - > METHOD : `GET`
    - > URL : `http://localhost:3000/api/v1/product/{id_product}`
    - > example : `http://localhost:3000/api/v1/product/6f0480fa-48e7-45ce-b171-8e301c4c2e79`
    - > RESULT :
  - > CREATED PRODUCT
    - > MEHTOD : `POST`
    - > URL : `http://localhost:3000/api/v1/product`
    - > note : " Making products requires quite complex body data"
    - > example :
    - > RESULT :
  - > DELETED PRODUCT
    - > METHOD : `DELETE`
    - > URL : `http://localhost:3000/api/v1/product/{id_product}`
    - > example : `http://localhost:3000/api/v1/product/fac08e5c-096f-4c0c-8eda-96468d544728`
    - > RESULT :

- [B] REVIEWS

  - > MAKE REVIEWS FOR PRODUCTS
    - > METHOD : `POST`
    - > URL : `http://localhost:3000/api/v1/review`
    - > note : `REVIEWS REQUIRE DATA FROM THE BODY`
    - > example :
    - > RESULT

- [C] USERS
  - > REGISTER
    - > METHOD : `POST`
    - > URL : `http://localhost:3000/api/v1/register`
    - > example :
    - > RESULT:
  - > LOGIN
    - > METHOD : `POST`
    - > URL :`http://localhost:3000/api/v1/login`
    - > example :
    - > RESULT :

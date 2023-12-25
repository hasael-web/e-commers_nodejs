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

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": "dc1cf850-5b79-4422-b648-3829a0b72f4d",
      "name": "products baru",
      "description": "test description product",
      "material": "besi",
      "categories": ["test 1 categories"],
      "features": ["test 1 features", "test 2 features"],
      "image_src": [
        "https://res.cloudinary.com/dxjezbg17/image/upload/v1703389508/j2c9win03hynrj6wbxto.png",
        "https://res.cloudinary.com/dxjezbg17/image/upload/v1703389509/ky466xv44arvskyhuzo4.jpg",
        "https://res.cloudinary.com/dxjezbg17/image/upload/v1703389510/ui3alfn1geoqbmyukunb.png"
      ],
      "rating_average": 5,
      "rating_count": 2,
      "created_at": "2023-12-24T03:45:06.172Z",
      "updated_at": "2023-12-24T03:45:06.172Z",
      "varians": [
        {
          "id": "5f9440a9-d75b-49a3-bf24-ef9eec748979",
          "color": "black",
          "variant_detail": [
            {
              "id": "78a935d2-bdcb-4c96-a53e-57830a83f4f7",
              "size": "xl",
              "stock": 20,
              "price": 2000
            }
          ]
        }
      ]
    }
    // ... (similar structure for other items)
  ]
}
```

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

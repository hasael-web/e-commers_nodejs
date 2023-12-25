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

- > GET ONE PRODUCT

  - > METHOD : `GET`
  - > URL : `http://localhost:3000/api/v1/product/{id_product}`
  - > example : `http://localhost:3000/api/v1/product/6f0480fa-48e7-45ce-b171-8e301c4c2e79`
  - > RESULT :

```json
{
  "code": 200,
  "message": "success",
  "data": {
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
    "reviews": [
      {
        "id": "9489d56f-9c70-4216-b406-36e40fcc2049",
        "username": "hasael1244",
        "rating": 4,
        "comment": "test comment",
        "created_at": "2023-12-24T01:21:07.702Z",
        "updated_at": "2023-12-24T01:21:07.702Z",
        "deleted_at": "2023-12-24T01:21:07.702Z"
      },
      {
        "id": "33362f2c-9a96-4f1f-ab61-980d03e40758",
        "username": "hasael1244",
        "rating": 5,
        "comment": "test comment",
        "created_at": "2023-12-24T22:04:19.485Z",
        "updated_at": "2023-12-24T22:04:19.485Z",
        "deleted_at": "2023-12-24T22:04:19.485Z"
      }
    ],
    "varians": [
      {
        "id": "5f9440a9-d75b-49a3-bf24-ef9eec748979",
        "color": "black",
        "varian_detail": [
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
}
```

- > CREATED PRODUCT
  - > MEHTOD : `POST`
  - > URL : `http://localhost:3000/api/v1/product`
  - > note : " Making products requires quite complex body data"
  - > example :

```json
// The product is created through form data, and the structure of the product data looks like this:
{
  "categories": [
    "test 1 categories",
    "test 2 categories"
  ],
  "features": [
    "test 1 features",
    "test 2 features"
  ],
  "image_src": [
    "https://res.cloudinary.com/dxjezbg17/image/upload/v1703389508/j2c9win03hynrj6wbxto.png",
    "https://res.cloudinary.com/dxjezbg17/image/upload/v1703389509/ky466xv44arvskyhuzo4.jpg",
    "https://res.cloudinary.com/dxjezbg17/image/upload/v1703389510/ui3alfn1geoqbmyukunb.png"
  ],
  "description": "test description product",
  "material": "besi",
  "name": "products baru",
   "varians": [
    {
      "color": "black",
      "varian_detail": [
        {
          "price": "2000",
          "stocks": "20",
          "size": "xl"
        }
      ]
    }
  ]
}
// This is an example of a key that I created to create a product
// to try it on postman
{
"image_src": [],
"categories[]": "test 1 categories",
"categoreis[]": "test 2 categories",
"description": "test description product",
"features[]": ["test 1 features", "test 2 features"],
"material": "besi",
"name": "products baru",
"varians[0][color]": "black",
"varians[0][varian_detail][0][price]": "2000",
"varians[0][varian_detail][0][stocks]": "20",
"varians[0][varian_detail][0][size]": "xl"
}
```

- > RESULT :

```json
{
  "code": 201,
  "message": "success",
  "data": {
    "id": "fafa2ab7-c702-4773-8c68-0c0d88878a31",
    "name": "products baru",
    "material": "besi",
    "description": "test description product",
    "image_src": [
      "https://res.cloudinary.com/dxjezbg17/image/upload/v1703490767/bswpaupdozlq36dqsknj.png",
      "https://res.cloudinary.com/dxjezbg17/image/upload/v1703490768/qc2lkh2edvrlue2sjeli.jpg",
      "https://res.cloudinary.com/dxjezbg17/image/upload/v1703490770/nkb1yzww0qao5o2bknke.png"
    ],
    "features": ["test 1 features", "test 2 features"],
    "varians": [
      {
        "color": "black",
        "varian_detail": [
          {
            "price": "2000",
            "stocks": "20",
            "size": "xl"
          }
        ]
      }
    ],
    "categories": ["test 1 categories"],
    "created_at": "2023-12-25T07:52:45.728Z",
    "updated_at": "2023-12-25T07:52:45.728Z"
  }
}
```

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

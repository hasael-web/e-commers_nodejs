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
  - > AUTH :
    - > true
    - > the role must be that of "supplier"
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
  - > AUTH :
    - > true
    - > role: "supplier"
    - > Only the creator can delete it
  - > example : `http://localhost:3000/api/v1/product/fac08e5c-096f-4c0c-8eda-96468d544728`
  - > RESULT :

```json
{
  "code": 200,
  "message": "success to delete data"
}
```

- [B] REVIEWS

  - > MAKE REVIEWS FOR PRODUCTS
    - > METHOD : `POST`
    - > AUTH :
      - > true
      - > Users must log in or register first
    - > URL : `http://localhost:3000/api/v1/review`
    - > note : `REVIEWS REQUIRE DATA FROM THE BODY`
    - > example :

```json
// from body
{
  "rating": 4,
  "comment": "test comment",
  "id_product": "dc1cf850-5b79-4422-b648-3829a0b72f4d"
}
```

    - > RESULT :

```json
{
  "code": 201,
  "message": "success",
  "data": {
    "id": "ff4d8839-d408-4a59-84f9-2ffe2018f424",
    "id_user": "28133c8a-5345-4be9-b2b4-4a9c8faac1cb",
    "username": "hasael1244",
    "rating": 4,
    "comment": "test comment",
    "id_product": "dc1cf850-5b79-4422-b648-3829a0b72f4d"
  }
}
```

- [C] USERS
  - > REGISTER
    - > METHOD : `POST`
    - > URL : `http://localhost:3000/api/v1/register`
    - > example :

```json
// from body
{
  "username": "hasaej66123",
  "email": "haselbutar623423@gmail.com",
  "password": "1234"
}
```

    - > RESULT:

```json
{
  "code": 201,
  "message": "successs",
  "data": {
    "id": "1b0cbe4e-21c6-46e0-92ad-c00a9da715ee",
    "email": "haselbutar623423@gmail.com",
    "username": "hasaej66123",
    "password": "$2b$10$8Y3ZtbwX0l/Pj/2S3uZp8eYXYiBZbg0kOSE1ZjWV1g1i8qX4q.Kpm",
    "role": "customer",
    "created_at": "2023-12-25T07:59:37.769Z",
    "updated_at": "2023-12-25T07:59:37.769Z",
    "deleted_at": "2023-12-25T00:59:37.771Z",
    "profile_image": "empty"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFiMGNiZTRlLTIxYzYtNDZlMC05MmFkLWMwMGE5ZGE3MTVlZSIsImVtYWlsIjoiaGFzZWxidXRhcjYyMzQyM0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6Imhhc2FlajY2MTIzIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzAzNDkxMTc3LCJleHAiOjE3MDM0OTgzNzd9.b29onCxwu8Va2bkCcZ9ivhlnYeWp3Ce_YaXWYh1wf_c"
}
```

- > LOGIN
  - > METHOD : `POST`
  - > URL :`http://localhost:3000/api/v1/login`
  - > example :

```json
// from body
{
  "emailORusername": "haselbutar@gmail.com",
  "password": "1234"
}
```

    - > RESULT :

```json
{
  "code": 201,
  "message": "successs",
  "data": {
    "id": "28133c8a-5345-4be9-b2b4-4a9c8faac1cb",
    "email": "haselbutar@gmail.com",
    "username": "hasael1244",
    "password": "$2b$10$gSOweSmATJ1ME8Apcpt3lOZyCxCiCpbcFXolvaiicynqrneD0Sb7C",
    "role": "supplier",
    "profile_image": "empty",
    "created_at": "2023-12-24T03:26:19.793Z",
    "updated_at": "2023-12-24T03:26:19.793Z",
    "deleted_at": "2023-12-23T20:26:19.822Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI4MTMzYzhhLTUzNDUtNGJlOS1iMmI0LTRhOWM4ZmFhYzFjYiIsImVtYWlsIjoiaGFzZWxidXRhckBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Imhhc2FlbDEyNDQiLCJyb2xlIjoic3VwcGxpZXIiLCJpYXQiOjE3MDM0OTA3NjAsImV4cCI6MTcwMzQ5Nzk2MH0.NhSYgvPCuF4RXDD_R9doiRlW1FLTWsEDytIhO6R1yN0"
}
```

- > UPDATE ROLE USER
  - > METHOD : `PATCH`
  - > AUTH :
    - > true
    - > Users must log in or register first
  - > URL :`http://localhost:3000/api/v1/login`
  - > example :

```json
// from body
{
  "role": "supplier"
}
```

- > RESULT :

```json
{
  "code": 201,
  "message": "successs",
  "data": {
    "id": "1b0cbe4e-21c6-46e0-92ad-c00a9da715ee",
    "role": "supplier",
    "profile_image": "empty",
    "created_at": "2023-12-25T07:59:37.769Z",
    "updated_at": "2023-12-25T07:59:37.769Z",
    "deleted_at": "2023-12-25T00:59:37.771Z"
  }
}
```

# EShop project with TDD

![Eshop](https://prnt.sc/nZHiYcu0Fs-D)

This is simple EShop implementation following TDD principle 

## Tech stacks

### Frontend

- React
- TailwindCSS
- Testing library (unit testing)

### Backend

- Nest
- Jest
- mongoose (ORM)

### Database
MongoDB local server

## Guide to Run


### Before install

Ensure all these software requirements are met

- Git
- Docker 18 or higher, with docker-compose
- Node.js 16.x or higher, with npm and npx
- Port 3000 open
- Port 5000 open.

### Cloning from git

```
  ### SSH Clone
  git clone --recurse-submodules --remote-submodules git@gitlab.com:minds/minds.git

  ### HTTP Clone
  git clone --recurse-submodules --remote-submodules https://gitlab.com/minds/minds.git
```

First clone main repository from git

### Running with Docker

``` 
  $ docker-compose up --build
```

### Running manually with script

MongoDB server should be installed before running backend.

``` 
    # Frontend
    $ cd eshop
    $ npm i
    $ npm start

    # Backend
    $ cd eshop-api
    $ npm i
    $ npm start
```

Go to http://localhost:3000 to see project running.


### Available Scripts

#### Frontend (React)



In the project directory, you can run:

##### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

##### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

##### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

#### Backend


##### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

##### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## TDD Guide

This project was developed following TDD principle in frontend and backend.

### TDD principle

Test Driven Development (TDD) is software development approach in which test cases are developed to specify and validate what the code will do. In simple terms, test cases for each functionality are created and tested first and if the test fails then the new code is written in order to pass the test and making code simple and bug-free.

### Approach to TDD

#### Frontend (React)

`testing-library` was used for unit testing in frontend.

1. Determining feature of component

To display list of item, we need ProductItem component which shows the property of product including title, price, image, description and also buy and add to cart button.

This component receives the product information as props and display them.

This is requirements of ProductItem component.

2. Write a unit test

```javascript
    import React from "react"
    import { render, screen } from "@testing-library/react"
    import ProductItem from "../../components/ProductItem"
    import { Product } from "../../utils/Type"

    test("Product Item test", () => {
        const product: Product = {
            id: "1",
            title: "Orange",
            image: "https://html.design/demo/floram/images/p1.png",
            description:
            "Fresh, juicy oranges now available at our shop - perfect for a healthy snack or addition to your daily diet.",
            price: 10,
        }

        render(<ProductItem product={product} onAddToCart={() => {}} />)
        const linkElements = screen.queryAllByText(/Orange/i)
        const priceElements = screen.queryAllByText(/10/i)
        const descriptionElements = screen.queryAllByText(/Fresh, juicy/i)
        
        expect(linkElements.length).toBeGreaterThan(0)
        expect(priceElements.length).toBeGreaterThan(0)
        expect(descriptionElements.length).toBeGreaterThan(0)
    })
```

3. Execute test

Because there is no ProductItem component. It will be failed.

4. Implement ProductItem compoenent to pass the unit test

```javascript
    import React from "react"
    import { Product } from "../utils/Type"

    type PropType = {
    product: Product
    onAddToCart: () => void
    }

    const ProductItem = (props: PropType) => {
    return (
        <div className='flex flex-col items-center bg-amber-50 w-80 p-4 m-4'>
            <div className='flex flex-col items-center mb-2 grow'>
                <img src={props.product.image} alt={props.product.title} className='w-48 my-1' />
                <div className='text-lg font-semibold my-1'>{props.product.title}</div>
                <div className='text-sm text-gray-500 my-1'>{props.product.description}</div>
                <div className='my-1'>$ {props.product.price}</div>
            </div>
            <div className='flex flex-row'>
                <button className='px-4 py-2 mx-2 bg-primary text-white font-semibold rounded-full'>
                Buy now
                </button>
                <button
                className='px-4 py-2 mx-2 bg-secondary text-white font-semibold rounded-full'
                onClick={props.onAddToCart}
                >
                Add to Cart
                </button>
            </div>
        </div>
    )
    }

    export default ProductItem
```

Repeat the process modifying the code until it passes the unit test

#### Backend(Nest)

`Jest` was used for backend testing.
Working flow following TDD principle is similar.

1. Determining the feature of component

We need addToCart API to implement 'Add to Cart' feature.
This API will receive productId and add this product to cart.
If there exist this product in the cart, it will increase the count or it will add new product to cart

If productId does not exist in product list, it should return error code.

This is main feature of add to cart API. 

2. Write unit test of API.

Write unit test to reflect all the requirements and failing cases.

```javascript
  it('should return error for not registered productId', async () => {
    try {
      await controller.addCartItem({ productId: '7' });
    } catch (err) {
      console.log(JSON.stringify(err));
      expect(err.response.status).toBe(400);
    }
  });

  it('should return 1 cart item after adding first item', async () => {
    const cartItems = await controller.addCartItem({ productId: '1' });
    console.log('cartItem: ', cartItems);
    expect(cartItems.length).toBe(1);
  });

  it('should return 1 item but count increased after adding same product to cart', async () => {
    // Adding prduct 1
    await controller.addCartItem({ productId: '1' });

    // Adding Product 1 again
    const cartItems = await controller.addCartItem({ productId: '1' });
    expect(cartItems.length).toBe(1);
    expect(cartItems[0].count).toBe(2);
  });

  it('should return 2 items after adding two different products', async () => {
    // Adding prduct 2
    await controller.addCartItem({ productId: '1' });

    // Adding Product 2
    const cartItems = await controller.addCartItem({ productId: '2' });
    expect(cartItems.length).toBe(2);
    expect(cartItems[0].count).toBe(1);
    expect(cartItems[1].count).toBe(1);
  });
```

3. Execute test.

It will fail because there is no implementation of API.

4. Implement API to pass the unit test


```javascript  cart.controller.ts
  @Post()
  async addCartItem(@Body() { productId }: { productId: string }) {
    return await this.cartService.addCartItem(productId);
  }
```

```javascript cart.service.ts
  async addCartItem(productId: string): Promise<Array<CartItem>> {
    const cartItem = await this.cartModel.findOne({
      'product.id': productId,
    });

    if (cartItem) {
      await this.cartModel.findOneAndUpdate(
        {
          'product.id': productId,
        },
        { $inc: { count: 1 } },
      );
    } else {
      const products = await this.productService.getProduct('');
      try {
        const product = products.find((item) => item.id === productId);
        if (!product)
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              errors: {
                message: `productId ${productId} is not found`,
              },
            },
            HttpStatus.BAD_REQUEST,
          );
        const newCart = new this.cartModel({ product: product, count: 1 });
        await newCart.save();
      } catch {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            errors: {
              message: `productId ${productId} is not found`,
            },
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
```

Repeat modifying code until it passes the unit test.

5. Write E2E test for checking API fully.

```javascript test/app.e2e-spec.ts
  it('/cart (POST)', async () => {
    await request(app.getHttpServer())
      .post('/cart')
      .send({ productId: '1' })
      .expect(201);

    return request(app.getHttpServer())
      .get('/cart')
      .expect(200)
      .expect((response) => {
        expect(response.body.length).toBe(1);
      });
  });
```

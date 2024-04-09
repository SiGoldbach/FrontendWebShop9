import {basketReducer,creasteNewEmptyBasket, BasketItemKind} from "../State/BasketState"
import { assert, test } from 'vitest'
import {ProductInfo} from "../TSReusedTypes/ItemsAndPrices"
import { useReducer } from "react"

//I am using mogging instead of fetching the data to make sure it is not async problems or networking since this test does test that.
//But rather the new reducer for basketstate 
const mockProductData: ProductInfo[] = [
    {
      "id": "vitamin-d-90-120",
      "name": "D-vitamin, 90ug, 120 stk",
      "price": 116,
      "currency": "DKK",
      "rebateQuantity": 3,
      "rebatePercent": 10,
      "upsellProductId": null,
      "imageUrl": "https://apopro.dk/Images/d3-vitamin-staerk-kapsler-90-%C2%B5g-kosttilskud-120-stk-214878"
    },
    {
      "id": "vitamin-c-500-200",
      "name": "C-vitamin, 500mg, 200 stk",
      "price": 150,
      "currency": "DKK",
      "rebateQuantity": 2,
      "rebatePercent": 25,
      "upsellProductId": "vitamin-c-depot-500-250",
      "imageUrl": "https://images.matas.dk/Assets_v3/600001-700000/636001-637000/636601-636700/636640/productlist_v1_x2.jpg"
    },
    {
      "id": "vitamin-c-depot-500-250",
      "name": "C-vitamin Depot, 500mg, 200 stk",
      "price": 175,
      "currency": "DKK",
      "rebateQuantity": 3,
      "rebatePercent": 10,
      "upsellProductId": null,
      "imageUrl": "https://images.matas.dk/Assets_v3/600001-700000/631001-632000/631601-631700/631666/product_v1_x2.jpg"
    },
    {
      "id": "fish-oil-1000-120",
      "name": "Omega 3 fiskeolie, 1000mg, 120 stk",
      "price": 69,
      "currency": "DKK",
      "rebateQuantity": 5,
      "rebatePercent": 10,
      "upsellProductId": null,
      "imageUrl": "https://www.weightworld.dk/assets/weightworld/weightworld.dk/images/product/ls_high_res/krill-oil-softgels.jpg"
    },
    {
      "id": "coffee-grinder",
      "name": "Kaffekværn",
      "price": 145,
      "currency": "DKK",
      "rebateQuantity": 0,
      "rebatePercent": 0,
      "upsellProductId": "coffee-grinder-pro",
      "imageUrl": "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1582063504-3113bdgisL.jpg"
    },
    {
      "id": "coffee-grinder-pro",
      "name": "Kaffekværn Præcision",
      "price": 320,
      "currency": "DKK",
      "rebateQuantity": 0,
      "rebatePercent": 0,
      "upsellProductId": null,
      "imageUrl": "https://breville-production-aem-assets.s3.us-west-2.amazonaws.com/BCG820/dna1_en_UK.jpg"
    },
    {
      "id": "toothbrush",
      "name": "Tandbørste, 5stk",
      "price": 40,
      "currency": "DKK",
      "rebateQuantity": 0,
      "rebatePercent": 0,
      "upsellProductId": "toothbrush-bamboo",
      "imageUrl": "https://images.matas.dk/trs/w365/Assets_v3/700001-800000/742001-743000/742801-742900/742846/product_v1_x2.jpg"
    },
    {
      "id": "toothbrush-bamboo",
      "name": "Tandbørste i bambus, 3stk",
      "price": 40,
      "currency": "DKK",
      "rebateQuantity": 2,
      "rebatePercent": 10,
      "upsellProductId": null,
      "imageUrl": "https://www.okofamilien.dk/wp-content/uploads/2021/04/pandoo_bambus_tandboerste_boern-450x450.jpg"
    },
    {
      "id": "trimmer",
      "name": "Barbermaskine",
      "price": 200,
      "currency": "DKK",
      "rebateQuantity": 0,
      "rebatePercent": 0,
      "upsellProductId": "trimmer-battery",
      "imageUrl": "https://www.coolpriser.dk/images/bb/2501/5608475013072_S4700085_P0-v_1-p.jpg"
    },
    {
      "id": "trimmer-battery",
      "name": "Barbermaskine m batteri",
      "price": 350,
      "currency": "DKK",
      "rebateQuantity": 0,
      "rebatePercent": 0,
      "upsellProductId": null,
      "imageUrl": "https://www.helsebixen.dk/shop/media/catalog/product/cache/1/image/400x/9df78eab33525d08d6e5fb8d27136e95/f/3/f3_1.png"
    },
    {
      "id": "hair-clip",
      "name": "Hårklemme",
      "price": 25,
      "currency": "DKK",
      "rebateQuantity": 2,
      "rebatePercent": 20,
      "upsellProductId": "hair-clip-large",
      "imageUrl": "https://thumbs.nosto.com/quick/uv79anmc/9/320256/e370f5e6fc5dd7a48645339f1b3d82bd86f8f1b9426bcb9f78eb770626956412/A"
    },
    {
      "id": "hair-clip-large",
      "name": "Hårklemme, stor",
      "price": 45,
      "currency": "DKK",
      "rebateQuantity": 0,
      "rebatePercent": 0,
      "upsellProductId": null,
      "imageUrl": "https://www.emborgdesign.dk/images/115StorklemmeBRUN-p.jpg"
    },
    {
      "id": "scarf-cotton",
      "name": "Tørklæde, bomuld",
      "price": 100,
      "currency": "DKK",
      "rebateQuantity": 2,
      "rebatePercent": 10,
      "upsellProductId": "scarf-wool",
      "imageUrl": "https://sw4604.sfstatic.io/upload_dir/shop/04-07-11-samso-nature-fotoshare/_thumbs/IMG_2399.w610.h610.fill.jpg"
    },
    {
      "id": "scarf-wool",
      "name": "Tørklæde, uld",
      "price": 150,
      "currency": "DKK",
      "rebateQuantity": 2,
      "rebatePercent": 10,
      "upsellProductId": "scarf-silk",
      "imageUrl": "https://www.bestman.dk/images/10121124-p.jpg"
    },
    {
      "id": "scarf-silk",
      "name": "Tørklæde, silke",
      "price": 250,
      "currency": "DKK",
      "rebateQuantity": 2,
      "rebatePercent": 10,
      "upsellProductId": null,
      "imageUrl": "https://oestensperle.dk/wp-content/uploads/2020/01/DSC_0003.jpg"
    },
    {
      "id": "cap",
      "name": "Kasket",
      "price": 150,
      "currency": "DKK",
      "rebateQuantity": 2,
      "rebatePercent": 10,
      "upsellProductId": "cap-flat",
      "imageUrl": "https://reklamedimser.dk/wp-content/uploads/2016/08/kasket-med-logo-tryk-navy-reklamedimser3.jpg"
    },
    {
      "id": "cap-flat",
      "name": "Kasket, sixpence",
      "price": 590,
      "currency": "DKK",
      "rebateQuantity": 0,
      "rebatePercent": 0,
      "upsellProductId": null,
      "imageUrl": "https://shop13851.sfstatic.io/upload_dir/shop/_thumbs/Towny-100-Linen-Brown.w610.h610.fill.jpg"
    },
    {
      "id": "teddy",
      "name": "Plysbamse",
      "price": 75,
      "currency": "DKK",
      "rebateQuantity": 0,
      "rebatePercent": 0,
      "upsellProductId": "teddy-large",
      "imageUrl": "https://cdn.shopify.com/s/files/1/0748/9103/products/jellycat_23_Bumbly_Bear_small_BUM6BR.jpg?v=1673451290"
    },
    {
      "id": "teddy-large",
      "name": "Plysbamse, stor",
      "price": 150,
      "currency": "DKK",
      "rebateQuantity": 0,
      "rebatePercent": 0,
      "upsellProductId": null,
      "imageUrl": "https://cdn11.bigcommerce.com/s-kaxlmzv/images/stencil/1280x1280/products/1476/6036/Teddy_Bear_-_Steve_Large_Bear_Family_70cm__65681.1656458493.JPG?c=2"
    },
    {
      "id": "kids-songbook",
      "name": "De små synger",
      "price": 120,
      "currency": "DKK",
      "rebateQuantity": 0,
      "rebatePercent": 0,
      "upsellProductId": "kids-songbook-hardcover",
      "imageUrl": "https://imgcdn.saxo.com/_9788714195519"
    },
    {
      "id": "kids-songbook-hardcover",
      "name": "De små synger, indbundet",
      "price": 180,
      "currency": "DKK",
      "rebateQuantity": 0,
      "rebatePercent": 0,
      "upsellProductId": null,
      "imageUrl": "https://imgcdn.saxo.com/_9788714195519"
    },
    {
      "id": "coffeebeans-500g",
      "name": "Kaffebønner",
      "price": 50,
      "currency": "DKK",
      "rebateQuantity": 4,
      "rebatePercent": 25,
      "upsellProductId": "coffeebeans-organic-500g",
      "imageUrl": "https://www.logicvending.co.uk/wp-content/uploads/2019/07/kokebi-rwanda-100-arabica-speciality-coffee-beans-500g-10-e1665501397947.jpg"
    },
    {
      "id": "coffeebeans-organic-500g",
      "name": "Kaffebønner, økologiske",
      "price": 60,
      "currency": "DKK",
      "rebateQuantity": 2,
      "rebatePercent": 10,
      "upsellProductId": null,
      "imageUrl": "https://www.caffemolinari.com.cy/eshop/image/cache/catalog/products/molinari/organic_line_bio/8550-800x800.jpg"
    },
    {
      "id": "the-english-100g",
      "name": "Sort te, 100g",
      "price": 20,
      "currency": "DKK",
      "rebateQuantity": 4,
      "rebatePercent": 25,
      "upsellProductId": "the-darjeeling-100g",
      "imageUrl": "https://images.squarespace-cdn.com/content/v1/5d4d363a6ff1830001300098/1605016085638-WR1W5JHVM8FO006LY32X/English+Breakfast+%282%29.jpg?format=300w"
    },
    {
      "id": "the-darjeeling-100g",
      "name": "Sort te, Darjeeling, 100g",
      "price": 30,
      "currency": "DKK",
      "rebateQuantity": 4,
      "rebatePercent": 25,
      "upsellProductId": "the-organic-100g",
      "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMmNN_8Lv6sV_rE4SmAAydhBsV4SHeWWD3K5G2LlPIRhG0plHQwHOyNSDt0lro-GH17Kk&usqp=CAU"
    },
    {
      "id": "the-organic-100g",
      "name": "Sort te, Darjeeling, økologisk, 100g",
      "price": 35,
      "currency": "DKK",
      "rebateQuantity": 2,
      "rebatePercent": 10,
      "upsellProductId": null,
      "imageUrl": "https://cdn.shopify.com/s/files/1/0724/4451/products/hamstead_LT_pouch_Darjeeling_rgb_S._600x.png?v=1614230711"
    },
    {
      "id": "sugar-white-1kg",
      "name": "Sukker, hvidt, 1000g",
      "price": 30,
      "currency": "DKK",
      "rebateQuantity": 4,
      "rebatePercent": 25,
      "upsellProductId": "sugar-cane-1kg",
      "imageUrl": "https://www.dansukker.dk/Admin/Public/GetImage.ashx?image=%2FFiles%2Fproduct-cataloge%2Fproduct_large%2Fdansk-sukker-1kg.png&width=640&format=webp"
    },
    {
      "id": "sugar-cane-1kg",
      "name": "Rørsukker, 1000g",
      "price": 40,
      "currency": "DKK",
      "rebateQuantity": 4,
      "rebatePercent": 25,
      "upsellProductId": "sugar-organic-1kg",
      "imageUrl": "https://www.fotoagent.dk/single_picture/11731/138/mega/1354824_1.jpg"
    },
    {
      "id": "sugar-organic-1kg",
      "name": "Rørsukker, økologisk, 1000g",
      "price": 45,
      "currency": "DKK",
      "rebateQuantity": 2,
      "rebatePercent": 10,
      "upsellProductId": null,
      "imageUrl": "https://cdn.shopify.com/s/files/1/2854/8548/products/roersukker-brasilien-oe_800x.jpg?v=1587692100"
    }
  ];

test('i am creating a state with reducer and seeing if it works', async() => {
    const [state,dispatch]= useReducer(basketReducer,creasteNewEmptyBasket());
    dispatch({type: BasketItemKind.ADDTOBASKET,productinfo: mockProductData[0]})
    dispatch({type: BasketItemKind.ADDTOBASKET,productinfo: mockProductData[0]})
    dispatch({type: BasketItemKind.ADDTOBASKET,productinfo: mockProductData[1]})
    dispatch({type: BasketItemKind.ADDTOBASKET,productinfo: mockProductData[2]})
    //Now i have added three types of items to the basket and therefore try to assert that there actually are 3 items
    assert(state.basketItems.length==3);




  })
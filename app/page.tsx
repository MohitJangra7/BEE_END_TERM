/* eslint-disable react/jsx-key */
import { products } from "@/utils/products";
import { truncateText } from "@/utils/truncateText";
import Container from "./component/Container";
import HomeBanner from "./component/HomeBanner";
import ProductCart from "./component/products/ProductCard";

export default function Home() {
  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner/>
        </div>
        <div className="grid grid-cols-2 sm:grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {products.map((product: any) =>{
            return <ProductCart data={product}/>
          })}
        </div>
      </Container>
    </div>
  )
}

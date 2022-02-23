import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_DATA = [
  {
    id: "p1",
    title: "test",
    price: 6,
    description: "This is a first product - amazing!",
  },
  {
    id: "p2",
    title: "test1",
    price: 7,
    description: "This is a second product - super amazing!",
  },
  {
    id: "p3",
    title: "test2",
    price: 10,
    description: "This is a thrid product - very super amazing!",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        <ProductItem productData={DUMMY_DATA} />
      </ul>
    </section>
  );
};

export default Products;

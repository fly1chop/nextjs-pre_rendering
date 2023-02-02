import fs from 'fs/promises';
import path from 'path';

function ProductDetailPage({ product }) {
  // if (!product) {
  //   return <p>Loading...</p>;
  // }

  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
}

const getData = async () => {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');

  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
};

export async function getStaticProps(context) {
  const { params } = context; // contains key: value pairs of the route parameters
  const { productId } = params;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({
    params: { productId: id },
  }));
  return {
    paths: pathsWithParams,
    fallback: 'blocking',
  };
}

export default ProductDetailPage;

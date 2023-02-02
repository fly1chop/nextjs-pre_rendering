import fs from 'fs/promises';
import Link from 'next/link.js';
import path from 'path';

function HomePage({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');

  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  // use redirect prop to redirect page on condition
  if (!data) {
    return {
      redirect: {
        destination: '/',
      },
    };
  }

  // use notFound prop to return 404 status on condition
  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

export default HomePage;

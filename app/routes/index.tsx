import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { gql } from 'graphql-request';
import { client } from '~/api/shopify';
import { formatter } from '~/utils/formatprice';
import { Link } from '@remix-run/react';

const getProducts = gql`
  {
    collection(handle: "frontpage") {
      id
      title
      products(first: 25) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const loader = async () => {
  const { collection } = await client.request(getProducts);
  if (!collection) throw new Response('Something Went wrong', { status: 404 });

  return json(collection);
};

export default function Index() {
  const { products } = useLoaderData();
  console.log(products);
  return (
    <div
      style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}></div>
  );
}

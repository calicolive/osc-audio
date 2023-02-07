import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { gql } from 'graphql-request';
import { client } from '~/api/shopify';
import { formatter } from '~/utils/formatprice';
import { Link } from '@remix-run/react';

export default function Index() {
  const { products } = useLoaderData();

  return <main className='bg-black min-h-screen'></main>;
}

// GraphQL query to get products from Shopify

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

// Loader function to fetch product info from Shopify
export const loader = async () => {
  const { collection } = await client.request(getProducts);

  return json(collection);
};

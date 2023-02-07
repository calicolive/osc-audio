import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { gql } from 'graphql-request';
import { client } from '~/api/shopify';
import { formatter } from '~/utils/formatprice';
import { Link } from '@remix-run/react';
import { useScroll, useTransform, motion } from 'framer-motion';

export default function Index() {
  const { products } = useLoaderData();
  console.log(products);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <main className='bg-black min-h-screen'>
      {/* Hero Section */}
      <section className='isolate bg-black'>
        <div className='relative px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl py-24 sm:py-36 lg:py-48 '>
            <motion.img
              style={{ y }}
              className='absolute inset-0 h-full w-full object-cover opacity-25 blur'
              src='https://images.pexels.com/photos/164745/pexels-photo-164745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              alt=''
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className='relative text-center'>
              <h1 className='text-4xl font-bold tracking-tight text-gray-100 sm:text-6xl'>
                Take your productions to new heights
              </h1>
              <p className='mt-6 text-lg leading-8 text-gray-300'>
                Our audio plugins are both affordable and lightweight, making
                them the perfect solution for enhancing your sound without
                sacrificing performance.
              </p>
              <div className=' mt-12 flex items-center justify-center gap-x-6'>
                <div className='group relative'>
                  <div
                    className=' absolute -inset-3  rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 opacity-75 blur-xl transition duration-1000 group-hover:opacity-100 group-hover:duration-200'
                    aria-hidden='true'></div>
                  <Link
                    to='/plugins'
                    className=' relative rounded-lg bg-black px-7 py-4 leading-none text-gray-100'>
                    Shop Plugins!
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
          <div className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'></div>
        </div>
      </section>

      {/* Featured Plugins */}
      <section>
        <div className='bg-black'>
          <div className='mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8'>
            <div className='sm:flex sm:items-baseline sm:justify-between'>
              <h2 className='text-2xl font-bold tracking-tight text-gray-100'>
                Featured Plugins
              </h2>
            </div>

            <div className='mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:gap-x-8'>
              {products.edges.map((item: any) => {
                const product = item.node;
                const image = product.images.edges[0].node;
                const price = product.priceRange.minVariantPrice.amount;
                return (
                  <div key={product.handle} className='group relative'>
                    <div className='aspect-w-4 aspect-h-3  absolute  h-auto w-full rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 opacity-75 blur-md transition duration-700   group-hover:opacity-100 group-hover:blur-lg group-hover:duration-200'></div>
                    <div className=' aspect-w-4 aspect-h-3 relative h-auto w-full overflow-hidden rounded-lg '>
                      <img
                        className='  h-full w-full object-cover object-center'
                        alt=''
                        src={image.url}
                      />
                    </div>
                    <h3 className='mt-4 text-base font-semibold text-gray-100'>
                      <Link to={`/products/${product.handle}`}>
                        <span className='absolute inset-0' />
                        {product.title}
                      </Link>
                    </h3>
                    <p className='mt-1 text-sm text-gray-500'>
                      {formatter.format(price)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Freebies CTA */}
      <section>
        <div className='bg-black'>
          <div className='relative mx-auto max-w-7xl py-8 sm:px-6 sm:py-12 lg:px-8'>
            <div className='  px-6 py-16 text-center '>
              <h2 className='mx-auto max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-6xl'>
                Not looking to spend money?
              </h2>
              <p className='mx-auto mt-6 max-w-xl text-2xl leading-8 text-gray-300'>
                Check out our collection of 100% free plugins!
              </p>
              <div className='mt-10 flex items-center justify-center gap-x-6'>
                <Link
                  to='/freebies'
                  className=' text-base font-semibold leading-7 text-white'>
                  Take me to the free stuff! <span aria-hidden='true'>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
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

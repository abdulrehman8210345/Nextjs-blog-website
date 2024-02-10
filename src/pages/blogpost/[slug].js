import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import styles from "@/styles/blogpost.module.css";
// import * as fs from 'fs';

const Slug = (props) => {
    //The below 2 lines are use to find query by using useRouter
    // const router=useRouter();
    // const {slug}=router.query;
   
    const [blog, setBlog] = useState(props.filecontent);
  return (
    <div className={styles.container}>
    <main className={styles.main}> 
      <h1>{blog && blog.title}</h1>
      <hr/>
      <div className={styles.content}>
        {blog && blog.content}
      </div>

    </main>
    </div>
  )
}

export default Slug;

// export async function getStaticPaths() {
//   return {
//       paths: [
//         { params: { slug: 'learn-js' } },
//         { params: { slug: 'learn-mongodb' } },
//         { params: { slug: 'learn-nodejs' } },
        
//       ],
//       fallback: true // false or 'blocking'
//   };
// }



// export async function getStaticProps(context) {
//   const {slug} = context.params;
//   let data=await fs.promises.readFile(`blogdata/${slug}.json`,'utf-8');
//   let filecontent = await JSON.parse(data);
//     // console.log(req.query.slug);
//     // console.log(data)
//     // res.status(200).json(JSON.parse(data));

  
//   return {
//     props: { filecontent }, // will be passed to the page component as props
//   }
// }

//Static side generation of slugs(quesries), here we have three slugs (quesries) possibilities thats why we use getstaicpaths() function for genearting number of slugs and and getstaicprops for fetching data at export/build time, once it is exported then no changes updation takes place it (out) directory : out: is our static site having html files


// ------------------------------------------------------------------

//This below function is used for SSR, as explained in blog.js
//this function runs on a server side before the page rendered
export async function getServerSideProps(context) {

  // console.log(context.query);
  const {slug}=context.query;
   let data=await fetch(`http://localhost:3000/api/getblog?slug=${slug}`);
   let getblog=await data.json();

  
  return {
    props: { getblog }, // will be passed to the page component as props
  }
 }
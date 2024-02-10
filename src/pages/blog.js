import React, { useEffect, useState } from 'react'
import styles from "@/styles/blog.module.css";
import Link from 'next/link';
import * as fs from 'fs';


const Blog = (props) => {
  const [blogs, setBlogs] = useState(props.getdata);
  // console.log(props);
  

  return(
    <main className={styles.main}>
    {blogs.map((blogitem) => {
        return <div key={blogitem.slug} className={styles.blog_items}>
            <Link href={`/blogpost/${blogitem.slug}`}>
                <h3>{blogitem.title}</h3></Link>
            <p>{blogitem.content.substr(0,100)}.......</p>
            <Link href={`/blogpost/${blogitem.slug}`}><button className={styles.btn}>Read more</button></Link>
        </div>
    })}
</main>
  )
  
 }
export default Blog

// getstaic props(Static side generation)
export async function getStaticProps(context) {
  let tableofContent=await fs.promises.readdir("blogdata");
  // console.log(tableofContent);
  
  let filecontent;
  let getdata=[];
  for (let index = 0; index < tableofContent.length; index++) {
    const path = tableofContent[index];
    filecontent=await fs.promises.readFile(("blogdata/"+path),'utf-8');
    getdata.push(JSON.parse(filecontent));
  }
  return {
    props: { getdata }, // will be passed to the page component as props
  }
}






// ------------------------------------------------------------------

//This is server-side rendering in which client send request to server and in this case nextjs server and it returns html by running javascript on his server , means it does not allow browser to run js , it runs js itself and sends only html.The basic pros of SSR is if any chnage in any data takes place it updates on the browser if any client request it.But in static side generation once all javascript runs and when client send request , it gives the response of already solved js into html and returns html .The cons of this type is that if any changes in the server takes place , no updation on the client side occur, means link has broken,thus we have to export it again and again when updation takes place
//This function is pre-defined in nextjs used for server-side rendering means by the help of this function first we fetch data , and then it returns a prop so we return our data in terms of props.and thus by taking the props in the component we render it on the client side.The advantage of this rendering is that our data on the client side(front-end) can be viewed in the "view page source".
// export async function getServerSideProps(context) {
//   // console.log(context);
    
//     let data=await fetch("http://localhost:3000/api/getallblogs");
//     //convert this fetch data into json so that we use it.
//     let getallblogs=await data.json();
//   return {
//     props: { getallblogs } // will be passed to the page component as props
//   }
// }
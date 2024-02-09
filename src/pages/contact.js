import React, { useState } from "react";
import styles from "@/styles/contact.module.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [mesg, setMesg] = useState("");

   async function HandleSubmit(e)  {
    e.preventDefault();
    //when form submit i will store all input values entered by user
    console.log(name,email,phone,mesg);
    const data={name,email,phone,mesg};
    try {
      const response = await fetch("http://localhost:3000/api/postcontact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json" // Set Content-Type header to JSON
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("Success:", result);
      alert("Thanks for contacting us");
      setName('');
      setEmail('');
      setPhone('');
      setMesg('');
    } catch (error) {
      console.error("Error:", error);
    }

  };
  const handleChange = (e) => {
    // console.log(e);
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    }
    else  if(e.target.name=="message"){
      setMesg(e.target.value);
  } 
  };
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1>Contact Us</h1>
        <form onSubmit={HandleSubmit}>
          <div className={styles.inputtag}>
            <label className={styles.label} htmlFor="name">
              Enter your Name
            </label>
            <input
            className={styles.input}
              value={name}
              onChange={handleChange}
              id="name"
              type="text"
              name="name"
              required
            />
          </div>

          <div className={styles.inputtag}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
             className={styles.input}
              value={email}
              onChange={handleChange}
              id="email"
              type="text"
              name="email"
              required
            />
            <p>We will not share your email with anyone else</p>
          </div>
          <div className={styles.inputtag}>
            <label className={styles.label} htmlFor="phone">
              Phone Number
            </label>
            <input
             className={styles.input}
              value={phone}
              onChange={handleChange}
              id="phone"
              type="tel"
              name="phone"
              required
            />
          </div>
          <div className={styles.inputtag}>
            <label className={styles.label} htmlFor="message">
              Enter your concern
            </label>
            <textarea required
             className={styles.input}
              onChange={handleChange}
              value={mesg}
              id="message"
              name="message"
            ></textarea>
          </div>

          <button className={styles.btn} type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

"use server";

import { sendMail } from "@/lib/mailer/mailer";


export async function sendmailtest() {
    console.log("trying to send mail");
    try{
  await sendMail({
    to: "yogeshsodhi88@gmail.com",
    subject: "📉 Price Dropped!",
    html: `
  <h1> this is a testing </h1>
    <h2>Yo! Your product is cheaper 🎉</h2>
    <p>The price dropped below your target. <a href="https://amazon.in/product-url">Check it here</a></p>
  `,
  });
}catch{
    console.log("error in sending mail");
}
}

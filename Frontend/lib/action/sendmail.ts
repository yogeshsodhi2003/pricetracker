"use server";

import { sendMail } from "@/lib/mailer/mailer";

type MailData = {
 email : string
 title : string
 url : string
 targetPrice : number
  
}

export async function sendmailtest(product : MailData) {
  console.log(product)
    console.log("trying to send mail");
    try{
  await sendMail({
    to: product.email,
    subject: "📉 Price Dropped!",
    html: `

    <h2>Yo! Your product ${product.title} is cheaper 🎉</h2>
    <p>The price dropped below your target. <a href=${product.url}>Check it here</a></p>
  `,
  });
}catch{
    console.log("error in sending mail");
}
}

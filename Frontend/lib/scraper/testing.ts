import axios from "axios";

export async function scrapeTestProduct(url: string) {
  try {
    console.log(url);
    const response = await axios.post("http://localhost:4000/scrapper" , {url});
    const data = response.data
    console.log("data on the frontend ",data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

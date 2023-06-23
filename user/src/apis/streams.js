import axios from "axios";

export default axios.create({
  baseURL: 'https://crud-api-topaz.vercel.app/db.json/'
})
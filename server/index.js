import 'dotenv/config'
import app from './app.js'
const port=process.env.PORT||4000
app.listen(port,()=>{console.log(`Server running: http://127.0.0.1:${port}/`)})

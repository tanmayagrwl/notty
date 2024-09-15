import { Hono } from "hono"
import { poweredBy } from "hono/powered-by"
import { logger } from "hono/logger"
import dbConnect from "./db/connect"
import NotesModel from "./db/notes-model"
import { isValidObjectId } from "mongoose"
import { cors } from 'hono/cors'


const app = new Hono()

app.use('*', cors())

// middlewares
app.use(logger())
app.use(poweredBy())

dbConnect()
  .then(() => {

    // get all notes
    app.get("/", async (c) => {
      const docs = await NotesModel.find()
      return c.json(docs, 200)
    })

    // get note by ID
    app.get("/:documentId", async (c)=>{
      const id = c.req.param("documentId")
      if(!isValidObjectId){
        return c.json("invalid id", 400)
      }
      try {
        const note  = await NotesModel.findById(id)
        if (!note) {
          return c.json("Document not found", 400)
        }
        return c.json(note, 200)
      } catch (error) {
        return c.json((error as any)?.message || "Internal server error", 500)
      }
    })

    // create new note
    app.post("/", async (c) => {
      const formData = await c.req.json()
      if (!formData.body) {
        delete formData.body
      }
      const notesObj = new NotesModel(formData)
      try {
        const document = await notesObj.save()
        return c.json(document,200)
      } catch (error) {
        return c.json((error as any)?.message || "Internal server error", 500)
      }
    })

    // update notes by ID
    app.patch("/:documentId", async (c)=>{
      const id = c.req.param("documentId")
      if(!isValidObjectId(id)){
        return c.json("Invalid Id", 400)
      }
      const formData = await c.req.json()
      if(!formData.body){
        delete formData.body
      }
      try {
        const updatedDocument = await  NotesModel.findByIdAndUpdate(id,formData,{new:true})
        return c.json(updatedDocument, 200)
      } catch (error) {
        return c.json((error as any)?.message || "Internal server error", 500)
      }
    })

    // delete a note
    app.delete("/:documentId", async(c)=>{
      const id = c.req.param("documentId")
      if(!isValidObjectId){
        return c.json("Invalid ID", 400)
      }
      try {
        const deletedDocument = await NotesModel.findByIdAndDelete(id)
        return c.json(deletedDocument, 200)
      } catch (error) {
        return c.json((error as any)?.message || "Internal server error", 500)
      }
    })

  })


  // mongodb catch
  .catch((error: any) => {
    app.get("/*", (c) => {
      return c.text(`failed to connect mongoDB: ${error}`, 400)
    })
  })
// error on app initialization
app.onError((err, c) => {
  return c.text(`Error initializing app: ${err}`, 500)
})

export default app

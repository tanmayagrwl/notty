import { Schema, model } from "mongoose";

export interface INotesSchema{
    title:"string"
    body:"string"
}

const NotesSchema = new Schema<INotesSchema>({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:false,
    }
})

const NotesModel = model('notes',NotesSchema)
export default NotesModel
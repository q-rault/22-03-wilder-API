import mongoose from 'mongoose';

interface Skills {
  title: string;
  votes: number;
}

interface Wilder {
  name: string;
  city: string;
  skills?: Skills[];
}

const { Schema } = mongoose;

const WilderModel = new Schema<Wilder>({
  name: { type: String, unique: true },
  city: String,
  skills: [{ title: String, votes: Number }],
});

module.exports = mongoose.model<Wilder>('wilder', WilderModel);

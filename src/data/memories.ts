import firstSparkVideo from '@assets/videos/the-first-spark.mp4';
import summerCanopyImage from '@assets/photos/First-rose.jpg';
import goldenHourImage from '@assets/photos/golden.jpg';
import rainyEscapeImage from '@assets/photos/rainyescape.jpeg';
import midnightVideo from '@assets/videos/us.mp4';

export interface Memory {
  id: string;
  title: string;
  date: string;
  image: string;
  video?: string;
  description: string;
  details: string;
  x: number; // Percent position on screen for the constellation timeline
  y: number; // Percent position on screen for the constellation timeline
}

export const memories: Memory[] = [
  {
    id: "memory-1",
    title: "The First Spark",
    date: "August 19, 2025",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=800",
    video: firstSparkVideo,
    description: "The moment our eyes met, and the universe seemed to hold its breath.",
    details: "Hey bubu did you remember about the first time i officially proposed to you ? You were being such a cutie and blushing hard .I still remember the feeling of holding out the first rose for you expressing my love infront of the great statue",
    x: 15,
    y: 65,
  },
  {
    id: "memory-2",
    title: "Under the Summer Canopy",
    date: "August 19, 2025",
    image: summerCanopyImage,
    description: "Holding hands and praying it to hold forever",
    details: "You are the still the most beautiful rose among all that i have gifted you..my sunshine ..keep smiling and showering me with that light of yours",
    x: 30,
    y: 35,
  },
  {
    id: "memory-3",
    title: "Cozy Rainy Escape",
    date: "",
    image: rainyEscapeImage,
    description: "Our first outing and wild adventure to the sacred ghat",
    details: "Hey remember this ? I want so hesitant to bunk out on our exam and go  and was soo nervous but then couldn't let you go also ..and it turned out to be one of our best memories ....and also i got it that if we are beside each other there is no place for any nervousness or tnsion",
    x: 50,
    y: 55,
  },
  {
    id: "memory-4",
    title: "Only Mine Forever",
    date: "",
    image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=800",
    video: midnightVideo,
    description: "We are meant to be together and we have got enough signals from the universe",
    details: "Well what can i say bubu? U know it that you belong to me and i belong to you the most than anyone else ....stand beside my side forever and ever love ...so grateful to whoever maybe out there for giving you to me ..muaaaaaaaah",
    x: 70,
    y: 25,
  },
  {
    id: "memory-5",
    title: "My sweetest headache",
    date: "",
    image: goldenHourImage,
    description: "No matter how much you argue ...we will keep coming back to each other cause everyone has to return to their cozy home at the end",
    details: "Maybe we fight a lot bb a lot more than other ...but we love a lot too .....and thik eiram bhabei joriye dhore thakbo jibon er sesh obdi toke sob rag obhiman bhangiye ...forever yourss",
    x: 88,
    y: 60,
  }
];

export interface Reason {
  id: number;
  title: string;
  shortDesc: string;
  detailedMessage: string;
  x: number; // Percentage coordinate for the custom galaxy visualization
  y: number; // Percentage coordinate for the custom galaxy visualization
  color: string; // Tailored glow color to represent different energies of love
}

export const reasons: Reason[] = [
  {
    id: 1,
    title: "Your Stellar Warmth",
    shortDesc: "You bring heat and energy to my coldest days.",
    detailedMessage: "Just like a star radiating energy through the infinite cold of space, your presence fills my life with an unyielding warmth. Even on my most difficult days, a single smile from you can thaw any worries.",
    x: 20,
    y: 30,
    color: "rgba(253, 224, 71, 0.8)", // Bright yellow star
  },
  {
    id: 2,
    title: "The Gravity of Your Touch",
    shortDesc: "You keep my feet anchored on earth.",
    detailedMessage: "You are my gravitational anchor. Whenever my thoughts start drifting aimlessly into the void, your touch, your embrace, and your voice pull me back safely to the ground.",
    x: 35,
    y: 65,
    color: "rgba(167, 139, 250, 0.8)", // Soft purple star
  },
  {
    id: 3,
    title: "The Nebula of Your Eyes",
    shortDesc: "I get lost in them every single time.",
    detailedMessage: "Looking into your eyes is like peering into a vibrant nebula—full of mystery, color, and infinite depth. I see a whole galaxy of love, kindness, and dreams that we share together.",
    x: 60,
    y: 20,
    color: "rgba(96, 165, 250, 0.8)", // Cosmic blue star
  },
  {
    id: 4,
    title: "Your Supernova Laugh",
    shortDesc: "Your happiness is a beautiful explosion of light.",
    detailedMessage: "Your laugh is an explosion of pure joy that instantly lights up the entire room. It is the most beautiful soundtrack in the universe, and I would spend a thousand lifetimes just to keep you laughing.",
    x: 80,
    y: 45,
    color: "rgba(244, 114, 182, 0.8)", // Soft pink star
  },
  {
    id: 5,
    title: "Our Quiet Shared Orbit",
    shortDesc: "Perfect comfort in silent companionable space.",
    detailedMessage: "I love that we don't always need words. Just being in the same space, reading, working, or resting in quiet synchronization is the most comfortable and peaceful orbit I could ever ask for.",
    x: 50,
    y: 75,
    color: "rgba(52, 211, 153, 0.8)", // Emerald star
  },
  {
    id: 6,
    title: "Your Infinite Kindness",
    shortDesc: "Your heart spans wider than the cosmos.",
    detailedMessage: "The way you care for the smallest details, the empathy you hold for others, and your endless patience inspire me daily. You make this cold world a gentler, more beautiful planet to live on.",
    x: 15,
    y: 70,
    color: "rgba(251, 146, 60, 0.8)", // Amber star
  },
  {
    id: 7,
    title: "Your Stellar Courage",
    shortDesc: "How you stand brave against any dark sky.",
    detailedMessage: "I admire your strength and resilience. When storms brew and clouds block the sky, you continue to shine with a quiet, fierce grace that guides me through any uncertainty.",
    x: 75,
    y: 80,
    color: "rgba(252, 165, 165, 0.8)", // Soft red star
  },
  {
    id: 8,
    title: "My Home in the Cosmos",
    shortDesc: "In a vast universe, you are my safe harbor.",
    detailedMessage: "No matter how far we travel or how busy life becomes, your arms are my ultimate destination. You are my home, my peace, and the center of my universe.",
    x: 45,
    y: 40,
    color: "rgba(197, 192, 255, 0.8)", // Lavender star
  }
];

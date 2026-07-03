import {
  proposalRoleDefinitions,
  proposalRoleIdAliases,
} from "@/content/proposal-roles"

export const siteConfig = {
  couple: {
    bride: "Alyanna Dyan Gallardo Manzano", //Alyanna Dyan Gallardo Manzano
    brideNickname: "Alyanna", //Ltryl
    groom: "Dean Jay Belwa Balcanao", //Ltryl B. Benitez
    groomNickname: "Dean",
    monogram:"/monogram/new-monogram.png" ,//Ltryl
    backgroundMusic:"/background_music/Taylor Swift - Labyrinth (Official HD Audio) (mp3cut.net).mp3"
  },
  googleAPI:{
    messageForm: "https://docs.google.com/forms/d/e/1FAIpQLSeA2Vr4PgwxPNpS7HNbyivgnrRYRw33NV8RU313Ch88ERy4mg/formResponse",   //done
    message: "https://script.google.com/macros/s/AKfycbwnn9NPmZDxBcwKBpWI41MORUco217BHHdT-SsCZ_v4V6DKh-s1r4k45iCkDkzDtCc5/exec",  //done
    guestList: "https://script.google.com/macros/s/AKfycbx43JBhDpAHeWt3Z5U75E0ZTHbBfD_-p14llASXDCohtmrUvNMwNtJBapO3uUXxGPkg/exec",  //done
    guestRequest: "https://script.google.com/macros/s/AKfycbxW0drh2MhTB3PVesj6g96SHGlGGyZlFVF8Vip7j9xxzFjNhiCTLQY0P2wnt4btGEpn/exec",   //done
    entourage: "https://script.google.com/macros/s/AKfycbwF8KDuS75fYdsDVWF-hlu89bM-lpJ4eOXE5EaZM2ItS4Sh-rNGSCf7GZUBQ7hCvOq_/exec",  //done
    sponsors: "https://script.google.com/macros/s/AKfycbwsTQ2ZJVXW2R_Zrv7uifVcyKVtONMj9-rFM1Jsfse959CIsLt-5t1faGwTZFjqdnlM/exec",  //done 
    proposalResponses: "https://script.google.com/macros/s/AKfycbz3A3jOxkirdVVqA-WVneK0yDtz_Pb0emMeuHZlIWKJ_QIz-miPSZ-hpXKiyxd7fm8/exec", // uses entourage script with action: proposal
    weddingDetails: "https://script.google.com/macros/s/AKfycbxxRTzQFgdn0nsa8Cu1mn9QegioFFv9uSvBstRSZu6m8vOSEU2QnbSs7f-nVIsQSbrT/exec",   //done
////google share 
    googleShare: "https://docs.google.com/spreadsheets/d/1G304je_b5PvxzIVO7YsOEuiiJ_JvGDWgHbkuAzgQNkA/edit?usp=sharing", 
  },
  wedding: {
    date: "December 7, 2026",
    time: "1:00 PM",
    venue: "Chapel of the Mountains, Itogon Mountain Village",
    tagline: "are getting married!",
    theme: "Our wedding palette is inspired by timeless elegance and warmth.Motif Colors: Champagne Gold, Soft Beige, Warm Soft Brown",
    motif: "#BBCED5, #B9C3A8, #F3D8C5, #D1C4D4, #ECD8BA, #F4E8D8, #E1DCCF",
  },
  proposal: {
    // Use "Maid of Honor" for unmarried, "Matron of Honor" for married
    honorAttendant: "Matron of Honor" as "Matron of Honor" | "Maid of Honor",
    roles: proposalRoleDefinitions,
    roleIdAliases: proposalRoleIdAliases,
  },
  details: {
    rsvp: {
      deadline: "November 1, 2026",
      coordinator: "Dean Jay Belwa Balcanao",
      phone: "09154347932",
    },
  },
  contact: {
    bridePhone: "09052290015",
    groomPhone: "09154347932",
    email: "",
  },
  giftRegistry: {
    QR_1:{
    id: "AUB Bank",
    src: "public/QR/AUB Bank.png",
    label: "AUB Bank",
    accountNumber: "DYANDJ : xxxxxxxxx938",
    },
    // QR_2:{
    // id: "Zelle",
    // src: "/QR/pleaseProvideQR.png",
    // label: "Zelle",
    // accountNumber: "Please Provide QR",
    // }
  },
  ceremony: {
    location: "Chapel of the Mountains, Itogon Mountain Village",
    venue: "Brgy Loacan, Ambuklao Road, Benguet - Nueva Vizcaya Rd, La Trinidad, Benguet",
    map: "https://maps.app.goo.gl/i5MoJL8H9zTG2Jyq5",
    date: "December 7, 2026",
    day: "Monday",
    time: "1:00 PM",
    entourageTime: "11:00 AM",
    guestsTime: "11:30 AM",
    image: ["/Details/Chapel of the Mountains Itogon (2).jpg"],
  },
  reception: {
    location: "Montesierra Events Place",
    venue: "733 Ambuklao Rd, Itogon, 2604 Benguet",
    map: "https://maps.app.goo.gl/NAFDLFFgvHYeNiVY9",
    date: "December 7, 2026",
    day: "Monday",
    time: "6:00 PM",
    image: ["/Details/receptionnew.png"],
  },
  dressCode: {
      theme: "FORMAL",
    colors: "#BBCED5, #B9C3A8, #F3D8C5, #D1C4D4, #ECD8BA, #F4E8D8, #E1DCCF",
    sponsors: {
      photo: "/Details/sponsors-new.png",
      male: "Barong and Black Pants",
      female: "Dusty Blue Long Gown",
    },
    entourage: {
      photo: "/Details/sponsors.png",
      male: "Barong and Black Pants",
      female: "Dusty Blue Long Gown",
    },
    guests: {
      photo: "/Details/new-guest.png",
      male: "Black Suit without Tie",
      female: "Champagne Gold, Chocolate Brown, Beige and Sage Green Long Dress",
    },
    note: "We kindly request our guests to dress in attire following our wedding palette."
  },
  narratives: {
    ourStory: `Once upon a signature…

Our story began with a simple signature, one that slowly turned into something magical. He was my financial advisor, and I was there to sign documents. It was July 5, 2021, and we met at the Lobby of the building. Little did we know, that ordinary day would start a story neither of us expected.

I wasn't looking for anything, yet somehow, our connection grew in its own gentle, unexpected way. And then, on June 1, 2022, our story truly began—we became us. We found a love that feels like home.

Our journey wasn't rushed, but perfectly timed. We believe that God brought us together in His own way and season.

With hearts full of gratitude, we step into this new chapter hand in hand, trusting His plan and celebrating a love rooted in faith, patience, and grace.

Today, we choose each other- again and again- and we can't wait to celebrate this new chapter with the people we love most.`,
    groom: `The first time Mark saw Catherine, time seemed to slow down. It was an ordinary day that instantly became unforgettable: one smile, one hello, and suddenly his world had a new center. He didn't have the perfect words ready, but he knew he had met someone who felt like home.

Early conversations turned into late-night talks, sharing dreams, favorite meals, and whispered prayers for a future together. With every small adventure—coffee runs, long drives, quiet walks—Mark found himself choosing her over and over again. He loved how she laughed freely, how she listened with her whole heart, and how her faith steadied him.

There were seasons of distance and long workdays, but every reunion reminded him why he stayed patient: because Catherine was worth every mile and every minute apart. When he finally knelt to ask for her hand, it wasn't a question of "if," only "when can we start forever?"`,
    bride: `Catherine remembers the first time Mark said her name. It was gentle but sure, a kindness that made her feel both seen and safe. In that softness, she found a partner who met her with the same grace she prayed to give.

Mark's steadiness won her heart: the way he showed up, even when schedules were tight, and how he always found lightness in the small things. He celebrated her wins, held space for her worries, and never hesitated to choose "us" in every decision.

Now, as they prepare to say yes before God and the people they love most, Catherine is grateful for the patience, humor, and hope Mark brings to every day. She knows this next chapter is just the start of the love story they get to write together.`,
  },
  colors: {
    primary: "#87AE73",
    secondary: "#F5F5DC",
  },
  playlist: {
    title: "A Playlist from our hearts",
    subtitle: "Songs that have been part of our journey together",
    playlistName: "Dean and Alyanna Wedding",
    // Use the normal Spotify share link (Share → Copy link), not the embed URL.
    ///https://open.spotify.com/embed/playlist/11xYpNn0JwafRyKUsNSZyn
    spotifyUrl: "https://open.spotify.com/playlist/11xYpNn0JwafRyKUsNSZyn",
  },
  snapShare: {
    googleDriveLink:
      "https://drive.google.com/drive/folders/1pRdDqtIDwRLisfyeQblnGGyEVac1jUwA?usp=sharing",
    albumQR: "/QR/AlbumQR.png",
    hashtag: ["#DeanAndAlyannaTieTheKnot"],
    instructions: "Please scan this QR Code and upload the photos and videos you have taken during our wedding reception. We are delighted to see your snaps too!",
  },
  accommodation: {
    coordinator: {
      name: "Gayle Kathleen Asoy Gable",
      phone: "0909 912 3844",
    },
    hotels: [
      {
        name: "La Luna Resort",
        discount: "Offered 20% discount for early booking",
        facebook: "https://www.facebook.com/lalunabeachresortofficial",
      },
      {
        name: "GOSAM Beach Resort",
        discount: "Offered 10% discount",
        facebook: "https://www.facebook.com/profile.php?id=100083461714073",
      },
      {
        name: "Calicoan Villa",
        discount: "Offered 10% discount",
        facebook: "https://www.facebook.com/CalicoanVilla",
      },
      {
        name: "G Camp Beachfront",
        discount: "Offered 10% discount",
        facebook: "https://www.facebook.com/profile.php?id=100085772194096",
      },
      {
        name: "Punta Viajero Beach Resort",
        discount: "Offered 15% discount",
        phone: "0932 214 6408",
        facebook: "https://www.facebook.com/puntoviajeroresort",
      },
      { name: "Balay Sunset" },
      { name: "Balay Pacifico" },
      { name: "Casa Nala" },
      { name: "The Grey Inn" },
    ],
    carRentals: [
      {
        name: "Apex Car Rental Tacloban",
        facebook: "https://www.facebook.com/profile.php?id=61574882327115",
      },
      {
        name: "Cassey Wheels Car Rental",
        facebook: "https://www.facebook.com/search/top?q=casseywheels%20car%20rental",
      },
    ],
  },
}

export const entourage = [
  // Best Man & Maid/Matron of Honor
  { role: "Best Man", name: "Red Casallo" },
  { role: "Matron of Honor", name: "Imeeliza Timpug" },

  // Parents of the Bride
  { role: "Father", name: "Jaime Balajadia (Uncle)", group: "kate-family" },
  { role: "Mother", name: "Eloida Ricohermoso", group: "kate-family" },

  // Parents of the Groom
  { role: "Brother", name: "Perry Ticbaen (Brother)", group: "christian-family" },
  { role: "Mother", name: "Felicitas Ticbaen", group: "christian-family" },

  // Bridesmaids
  { role: "Bridesmaid", name: "Thea Lynn Dela Cruz" },
  { role: "Bridesmaid", name: "Keara Zane A Cariño" },
  { role: "Bridesmaid", name: "Fidnah Gracia Padallan" },
  { role: "Bridesmaid", name: "Lorna Ladisla" },
  { role: "Bridesmaid", name: "Carla Vanessa Tabilin" },
  { role: "Bridesmaid", name: "Romela Tolentino" },
  { role: "Bridesmaid", name: "Emmalyn Lipio" },
  { role: "Bridesmaid", name: "Carmen Pascual" },
  { role: "Bridesmaid", name: "Ciddie Manota" },

  // Groomsmen
  { role: "Groomsman", name: "Noah Alcaria" },
  { role: "Groomsman", name: "Jervin Garcia" },
  { role: "Groomsman", name: "Myric Mateo" },
  { role: "Groomsman", name: "Caughvan Faustino" },
  { role: "Groomsman", name: "Jayson Torquiano" },
  { role: "Groomsman", name: "Jendah Egino" },
  { role: "Groomsman", name: "Vincent Saguinsin" },
  { role: "Groomsman", name: "Frederick Manota" },
  { role: "Groomsman", name: "Emerson Sulit" },

  // Secondary Sponsors
  // Candle Sponsors
  { role: "Bridesmaid", name: "Romela Tolentino", group: "candle" },
  // Cord Sponsors
  { role: "Bridesmaid", name: "Emmalyn Lipio", group: "cord" },

  // Flower Girls and Little Bride
  { role: "Flower Girl", name: "Kirsten Elija Leyson" },
  { role: "Flower Girl", name: "Blake Juan" },
  { role: "Flower Girl", name: "Reign Arastel Rivera" },
  { role: "Little Bride", name: "Paige Yael Ticbaen" },

  // Ring / Coin Bearers
  { role: "Ring Bearer", name: "Khaleb Dwayne M. Beltran" },
  { role: "Coin Bearer", name: "Lucas Rhaiden Beltran" },
  { role: "Ring Bearer", name: "Dean James Ticbaen" },
]

export const principalSponsors = [
  // Paired from provided Male and Female Sponsors (order-based)
  { name: "Mr. Jony Balao", spouse: "Mrs. Conception Balao" },
  { name: "Mr. Cresencio Francisco", spouse: "Dr. Editha Francisco" },
  { name: "Mr. Aurelio Sab-it", spouse: "Mrs. Ester Sab-it" },
  { name: "Mr. Pio McLiing", spouse: "Mrs. Edna Boloma" },
  { name: "Mr. Fabian Dupiano", spouse: "Mrs. Mary Christine Dupiano" },
  { name: "Mr. Roberto Dosdos", spouse: "Mrs. Angelica Dosdos" },
  { name: "Mr. George Sacla", spouse: "Mrs. Minda De Bolt Sacla" },
  { name: "Mr. Elmo Casallo", spouse: "Mrs. Nora Casallo" },
  { name: "Engr. Jimmy Atayoc Sr", spouse: "Mrs. Mercedes Atayoc" },
  { name: "Mr. Tomas Moyongan", spouse: "Mrs. Betty Moyongan" },
  { name: "Mr. Roger Balantin", spouse: "Mrs. Delia Balantin" },
  { name: "Honorable Mayor Roderick Awingan", spouse: "Mrs. ____ Awingan" },
  { name: "Engr Roy Kepes", spouse: "Vice Gove MaryRose Kepes Fongwan" },
  { name: "Mr. Bobos Nestor Fongwan", spouse: "Mrs. Marga Sison" },
  { name: "Mr. Junvic Suguinsin", spouse: "Mrs. Lavenia Inson" },
  { name: "Mr. Salino Dosdos Jr", spouse: "Mrs. Gina Guiang" },
  { name: "Mr. Pampilo Balajadia", spouse: "Mrs. Angelica Balajadia" },
  { name: "Mr. Alan M. Serduar", spouse: "Mrs. Oliva Serduar" },
  { name: "Mr. Miguel Franco", spouse: "Mrs. Angela Balajadia" },
  // Remaining Female Sponsors without paired male
  { name: "Mrs. Carina C. Watanabe", spouse: "" },
  { name: "Mrs. Cecile Palilio", spouse: "" },
  { name: "Mrs. Nida Saguinsin", spouse: "" },
  { name: "Mrs. Araceli Pitogo", spouse: "" },
  { name: "Mrs. Alda Unidad", spouse: "" },
  { name: "Mrs. Reine Bernadeth Bolanos", spouse: "" },
]

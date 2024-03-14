import axios from 'axios';
  //Attention ce nest pas le meme nom que la vrai function Raph*
async function testAddCandidat() {
  try {
    const response = await axios.post('https://api-3.fly.dev/candidates', {
      description: "website efficiency.",
      email: "remond.dubreuil@example.com",
      firstName: "Remond",
      lastName: "Dubreuil",
      address: "1234 des érables",
      phone: "514-966-0002",
      city: "Techville",
      skills: ["React", "Vue.js", "CSS"],
      province: {
        _id: "65e4dff388da6547197b1229",
        value: "NUNAVUT",
        __v: 0
      },
      postalCode: "K1A 0B1",
      __v: 0
    });
    console.log("Success:", response.data);
  } catch (error) {
    console.error("Error:", error.response.data);
  }
}


//Pour tester dans la consol cela effectera vraiment la BDD !! vous pouvez proceder a un delete par la suite selon votre bon jugement
testAddCandidat();

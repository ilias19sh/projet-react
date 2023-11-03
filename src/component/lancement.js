// import { useState } from "react";
// import perso from "./data/perso.json";
// import user from "./data/user.json";
// import { getValue } from "@testing-library/user-event/dist/utils";

// function Lancement() {
//     const [listeuser, setListeUser] = useState([]);
    

  
//     function adduser() {
//       if (inputValue.trim() !== '') {
//         setListeUser((prevList) => [
//           ...prevList,
//           {
//             Name: inputValue,
//             Victoires: 0,
//             Défaites: 0,
//           },
//         ]);
//         setInputValue('');
//       }
//     }
  
//     return (
//       <>
//         <div>
//         <div>Quel est votre nom ?</div>
//         <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
//         <button onClick={adduser}>Ajouter</button>
  
//         {listeuser.length > 0 && (
//           <ul>
//             {listeuser.map((user, index) => (
//               <li key={index}>
//                 Salut {user.Name} ! Votre prime est de {user.Prime} berry
//               </li>
//             ))}
//           </ul>
//         )}
//         {user.push({"Name" : inputValue , "Prime" : 0})}
//         </div>
//       </>
//     );
//   }
  
//   export default Lancement;
import { useState , useEffect } from "react";
import perso from "./data/perso.json";
import Logo from '../images/logo.png';
import Luffy from '../images/Luffy.gif';
import Zoro from '../images/zoro.gif';
import Ace from '../images/Ace.gif';
import Kaido from '../images/Kaido.gif';
import Katakuri from '../images/Katakuri.png';
import Shanks from '../images/shanks.gif';
import Bigmom from '../images/big-mom.gif';
import Brook from '../images/brook.gif';
import Crocodile from '../images/crocodile.gif';
import Franky from '../images/Franky.gif';
import Fujitora from '../images/fujitora.gif';
import gorosei from '../images/gorosei.png';
import hancock from '../images/hancock.png';
import kid from '../images/kid.png';
import marco from '../images/marco.png';
import Mihawk from '../images/mihawk.png';
import oden from '../images/oden.png';
import sanji from '../images/Sanji.gif';
import usopp from '../images/usopp.gif';
import vergo from '../images/vergo.gif';
import yamato from '../images/Yamato.png';
import ym from '../images/ym.png';


function Attaque() {
    const [combatStarted, setCombatStarted] = useState(0);
    const [pointvie, Setpointvie] = useState(300);
    const [pv, setpv] = useState(300);
    const [choixperso, setChoixperso] = useState([Logo, 0]);
    const [choixpersoadverse, setChoixpersoadverse] = useState([Logo, 0]);
    const [tours,settours]= useState(0);
    const [user, setuser] = useState('');
    const [prime, setprime] = useState(0);
    const [inputValue, setInputValue] = useState('');
    console.log(perso[choixperso[1]].attaques[0])
      
    
    const calculateDamage = (attaque, adversaire) => {
        const multiplier = damageMultiplier(attaque, adversaire);
        return 30 * multiplier; 
    };

    const damageMultiplier = (attaque, adversaire) => {
        let degat = 1
        const attaqueType = attaque[1]; 
        const adversaireType = adversaire[0];
        if (attaqueType === "Poing" && adversaireType === "Logia"){
            degat = 1.5
        }
    
        if ((attaqueType === "Zoan" && adversaireType === "Logia") || (attaqueType === "Zoan" && adversaireType === "Sabre")){
            degat = 1.5
        }
    
        if ((attaqueType === "Sabre" && adversaireType === "Poing") || (attaqueType === "Sabre" && adversaireType === "Paramecia")){
            degat = 1.5
        }
    
        if ((attaqueType === "Paramecia" && adversaireType === "Zoan") || (attaqueType === "Paramecia" && adversaireType === "Distance")){
            degat = 1.5
        }
    
        if ((attaqueType === "Logia" && adversaireType === "Paramecia") || (attaqueType === "Logia" && adversaireType === "Sabre") || (attaqueType === "Logia" && adversaireType === "Distance")){
            degat = 1.5
        }
    
        if (attaqueType === "Distance" && adversaireType === "Zoan"){
            degat = 1.5
        }
    
        if (attaqueType === "combinée"){
            degat = 2
        }
    
        if (attaqueType === "spéciale"){
            degat = 4.5
        }
        return degat
    }

    function vie() {
        Setpointvie(perso[choixpersoadverse[1]].PV)
        setpv(perso[choixperso[1]].PV)
    }

    const attaqueAdverse = () => {

        const attaquesAdverses = perso[choixpersoadverse[1]].attaques;
        const attaqueIndex = Math.floor(Math.random() * attaquesAdverses.length);
        const attaque = perso[choixpersoadverse[1]].attaques[attaqueIndex];
    

        const degat = calculateDamage(attaque, perso[choixpersoadverse[1]].type, perso[choixperso[1]].type);
    
        setpv(pv - degat);
    }

    useEffect(() => {
        if (pv <= 0) {
          setprime(prevPrime => prevPrime - pointvie);
        } else {
          setprime(prevPrime => prevPrime + pv * 10 );
        }
      }, [pv, pointvie]);
      
    

    return (
        <>
            {/* page de combat */}
            {combatStarted === 1 && pointvie > 0 && pv > 0?(
                <div name="combat">
                    <button onClick={() => setCombatStarted(0)}>Changer de Personnage</button>
                    <div name="skins combat">
                        <div id="images">
                            <div>
                                <h3>{pv}</h3>
                                <progress id="health" value={pv} max={perso[choixperso[1]].PV}> / {perso[choixperso[1]].PV}</progress>
                                <img src={choixperso[0]} alt="Personnage choisi" />
                            </div>
                            <div id="image-adverse">
                                <h3 id = "pv-adverse">{pointvie}</h3>
                                <progress id="health" value={pointvie} max={perso[choixpersoadverse[1]].PV}> / {perso[choixperso[1]].PV}</progress>
                                <img src={choixpersoadverse[0]} alt="Personnage choisi" />
                            </div>
                        </div>
                    </div>
                    {/* Logique des attaques, pv, etc ... */}
                    <div id="attaques">
                    {tours === 0 ? (
                    <div>
                        <button id='attaque1' onClick={() => { Setpointvie(pointvie - calculateDamage(perso[choixperso[1]].attaques[0], perso[choixpersoadverse[1]].type));
                                                                settours(1);}}>
                          {perso[choixperso[1]].attaques[0][0]}
                        </button>
                        <button id='attaque2' onClick={() => { Setpointvie(pointvie - calculateDamage(perso[choixperso[1]].attaques[1], perso[choixpersoadverse[1]].type));
                                                                settours(1);}}>
                          {perso[choixperso[1]].attaques[1][0]}
                        </button>
                        <br></br>
                        <button id='attaque3' onClick={() => { Setpointvie(pointvie - calculateDamage(perso[choixperso[1]].attaques[2], perso[choixpersoadverse[1]].type));
                                                                settours(1);}}>
                          {perso[choixperso[1]].attaques[2][0]}
                        </button>
                        {pv < 40 ? (
                          <button id='attaque4' onClick={() => { Setpointvie(pointvie - calculateDamage(perso[choixperso[1]].attaques[3], perso[choixpersoadverse[1]].type));
                                                                settours(1);}}>
                                                <h3> Technique spéciale : {perso[choixperso[1]].attaques[3][0]} !</h3>
                          </button>
                        ) : null }
                    </div>
                        ) : ( 
                        <button id='attaque-adverse' onClick={() => {settours(0);
                                                                    attaqueAdverse();}}>
                            Subir l'attaque de {perso[choixpersoadverse[1]].Name} 
                        </button>
                        )}
                     </div>
                        </div>
                         ): null}  

        

            {/* Page d'accueil ou séléction des personnages */}
            {combatStarted === 0 ? (
                <>
            <div name = "connexion">
                <div>Quel est votre nom ?</div>
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <button onClick={() => {setuser(inputValue) }}>Ajouter</button>
          
                
                      <li>
                        Salut {user} ! Votre prime est de {prime} berry
                      </li>
                    
                </div>
            <div name = "selection-perso">
                                <div id = "images">
                    <div>
                        <img src ={choixperso[0]} alt = "Personnage choisi"/>
                    </div>
                    <div id = "image-adverse">
                        <img src ={choixpersoadverse[0]} alt = "Personnage choisi"/>
                    </div>
                </div>

                <div id = "choix-perso">
                    <div>
                        <h1>Choisissez votre combattant</h1>
                        <button onClick={() => setChoixperso([Luffy,0])}>
                            Luffy
                        </button>
                        <button onClick={() => setChoixperso([Zoro, 1])}>
                            Zoro
                        </button>
                        <button onClick={() => setChoixperso([Ace, 2])}>
                            Ace
                        </button>
                        <button onClick={() => setChoixperso([Kaido, 3])}>
                            Kaido
                        </button>
                        <button onClick={() => setChoixperso([Katakuri, 4])}>
                            Katakuri
                        </button>
                        <button onClick={() => setChoixperso([Shanks, 5])}>
                            Shanks
                        </button>
                        <button onClick={() => setChoixperso([Bigmom, 6])}>
                            Big mom
                        </button>
                        <button onClick={() => setChoixperso([Brook, 7])}>
                            Brook
                        </button>
                        <button onClick={() => setChoixperso([Crocodile, 8])}>
                            Crocodile
                        </button>
                        <button onClick={() => setChoixperso([Franky, 9])}>
                            Franky
                        </button>
                        <button onClick={() => setChoixperso([Fujitora, 10])}>
                            Fujitora
                        </button>
                        <button onClick={() => setChoixperso([Mihawk, 12])}>
                            Mihawk
                        </button>
                        <button onClick={() => setChoixperso([hancock, 13])}>
                            hancock
                        </button>
                        <button onClick={() => setChoixperso([gorosei, 14])}>
                            gorosei
                        </button>
                        <button onClick={() => setChoixperso([kid, 15])}>
                            kid
                        </button>
                        <button onClick={() => setChoixperso([marco, 16])}>
                            marco
                        </button>
                        <button onClick={() => setChoixperso([oden, 17])}>
                            oden
                        </button>
                        <button onClick={() => setChoixperso([sanji, 18])}>
                            sanji
                        </button>
                        <button onClick={() => setChoixperso([usopp, 19])}>
                            usopp
                        </button>
                        <button onClick={() => setChoixperso([vergo, 20])}>
                            vergo
                        </button>
                        <button onClick={() => setChoixperso([yamato, 21])}>
                            yamato
                        </button>
                        <button onClick={() => setChoixperso([ym, 22])}>
                            ym
                        </button>
                    </div>

                    <div id = "choix-perso-adverse">
                        <h1>Choisissez votre combattant Adverse</h1>
                        <button onClick={() => setChoixpersoadverse([Luffy,0])}>
                            Luffy
                        </button>
                        <button onClick={() => setChoixpersoadverse([Zoro, 1])}>
                            Zoro
                        </button>
                        <button onClick={() => setChoixpersoadverse([Ace, 2])}>
                            Ace
                        </button>
                        <button onClick={() => setChoixpersoadverse([Kaido, 3])}>
                            Kaido
                        </button>
                        <button onClick={() => setChoixpersoadverse([Katakuri, 4])}>
                            Katakuri
                        </button>
                        <button onClick={() => setChoixpersoadverse([Shanks, 5])}>
                            Shanks
                        </button>
                        <button onClick={() => setChoixpersoadverse([Bigmom, 6])}>
                            Big mom
                        </button>
                        <button onClick={() => setChoixpersoadverse([Brook, 7])}>
                            Brook
                        </button>
                        <button onClick={() => setChoixpersoadverse([Crocodile, 8])}>
                            Crocodile
                        </button>
                        <button onClick={() => setChoixpersoadverse([Franky, 9])}>
                            Franky
                        </button>
                        <button onClick={() => setChoixpersoadverse([Fujitora, 10])}>
                            Fujitora
                        </button>
                        <button onClick={() => setChoixpersoadverse([Mihawk, 12])}>
                            Mihawk
                        </button>
                        <button onClick={() => setChoixpersoadverse([hancock, 13])}>
                            hancock
                        </button>
                        <button onClick={() => setChoixpersoadverse([gorosei, 14])}>
                            gorosei
                        </button>
                        <button onClick={() => setChoixpersoadverse([kid, 15])}>
                            kid
                        </button>
                        <button onClick={() => setChoixpersoadverse([marco, 16])}>
                            marco
                        </button>
                        <button onClick={() => setChoixpersoadverse([oden, 17])}>
                            oden
                        </button>
                        <button onClick={() => setChoixpersoadverse([sanji, 18])}>
                            sanji
                        </button>
                        <button onClick={() => setChoixpersoadverse([usopp, 19])}>
                            usopp
                        </button>
                        <button onClick={() => setChoixpersoadverse([vergo, 20])}>
                            vergo
                        </button>
                        <button onClick={() => setChoixpersoadverse([yamato, 21])}>
                            yamato
                        </button>
                        <button onClick={() => setChoixpersoadverse([ym, 22])}>
                            ym
                        </button>
                    </div>
                </div>
                <button id = "start" onClick={() => (choixperso != [Logo,0] && choixpersoadverse != [Logo,0]? (setCombatStarted(1)) + (vie()) :(setCombatStarted(0)))}><h2>Start Fight</h2></button>


            </div>
            </>
            ) : null}
                

                {/* new fight */}
                {combatStarted === 2 || pointvie <= 0 || pv <= 0 ? (

<>
<div>
    {pv <= 0 ? (
      <h1>
        Game Over ! <br />
        Ta prime diminue, ta tête est actuellement à {prime} berry
      </h1>
    ) : (
      <h1>
        Vous avez gagné ! <br />
        Ta prime augmente ! ta tête est actuellement à {prime} berry
      </h1>
    )}
  </div>

  
            <div name = "selection-perso">
                
                <div id = "images">
                    <div>
                        <img src ={choixperso[0]} alt = "Personnage choisi"/>
                    </div>
                    <div id = "image-adverse">
                        <img src ={choixpersoadverse[0]} alt = "Personnage choisi"/>
                    </div>
                </div>

                <div id = "choix-perso">
                    <div>
                        <h1>Choisissez votre combattant</h1>
                        <button onClick={() => setChoixperso([Luffy,0])}>
                            Luffy
                        </button>
                        <button onClick={() => setChoixperso([Zoro, 1])}>
                            Zoro
                        </button>
                        <button onClick={() => setChoixperso([Ace, 2])}>
                            Ace
                        </button>
                        <button onClick={() => setChoixperso([Kaido, 3])}>
                            Kaido
                        </button>
                        <button onClick={() => setChoixperso([Katakuri, 4])}>
                            Katakuri
                        </button>
                        <button onClick={() => setChoixperso([Shanks, 5])}>
                            Shanks
                        </button>
                        <button onClick={() => setChoixperso([Bigmom, 6])}>
                            Big mom
                        </button>
                        <button onClick={() => setChoixperso([Brook, 7])}>
                            Brook
                        </button>
                        <button onClick={() => setChoixperso([Crocodile, 8])}>
                            Crocodile
                        </button>
                        <button onClick={() => setChoixperso([Franky, 9])}>
                            Franky
                        </button>
                        <button onClick={() => setChoixperso([Fujitora, 10])}>
                            Fujitora
                        </button>
                        <button onClick={() => setChoixperso([Mihawk, 12])}>
                            Mihawk
                        </button>
                        <button onClick={() => setChoixperso([hancock, 13])}>
                            hancock
                        </button>
                        <button onClick={() => setChoixperso([gorosei, 14])}>
                            gorosei
                        </button>
                        <button onClick={() => setChoixperso([kid, 15])}>
                            kid
                        </button>
                        <button onClick={() => setChoixperso([marco, 16])}>
                            marco
                        </button>
                        <button onClick={() => setChoixperso([oden, 17])}>
                            oden
                        </button>
                        <button onClick={() => setChoixperso([sanji, 18])}>
                            sanji
                        </button>
                        <button onClick={() => setChoixperso([usopp, 19])}>
                            usopp
                        </button>
                        <button onClick={() => setChoixperso([vergo, 20])}>
                            vergo
                        </button>
                        <button onClick={() => setChoixperso([yamato, 21])}>
                            yamato
                        </button>
                        <button onClick={() => setChoixperso([ym, 22])}>
                            ym
                        </button>
                    </div>

                    <div id = "choix-perso-adverse">
                        <h1>Choisissez votre combattant Adverse</h1>
                        <button onClick={() => setChoixpersoadverse([Luffy,0])}>
                            Luffy
                        </button>
                        <button onClick={() => setChoixpersoadverse([Zoro, 1])}>
                            Zoro
                        </button>
                        <button onClick={() => setChoixpersoadverse([Ace, 2])}>
                            Ace
                        </button>
                        <button onClick={() => setChoixpersoadverse([Kaido, 3])}>
                            Kaido
                        </button>
                        <button onClick={() => setChoixpersoadverse([Katakuri, 4])}>
                            Katakuri
                        </button>
                        <button onClick={() => setChoixpersoadverse([Shanks, 5])}>
                            Shanks
                        </button>
                        <button onClick={() => setChoixpersoadverse([Bigmom, 6])}>
                            Big mom
                        </button>
                        <button onClick={() => setChoixpersoadverse([Brook, 7])}>
                            Brook
                        </button>
                        <button onClick={() => setChoixpersoadverse([Crocodile, 8])}>
                            Crocodile
                        </button>
                        <button onClick={() => setChoixpersoadverse([Franky, 9])}>
                            Franky
                        </button>
                        <button onClick={() => setChoixpersoadverse([Fujitora, 10])}>
                            Fujitora
                        </button>
                        <button onClick={() => setChoixpersoadverse([Mihawk, 12])}>
                            Mihawk
                        </button>
                        <button onClick={() => setChoixpersoadverse([hancock, 13])}>
                            hancock
                        </button>
                        <button onClick={() => setChoixpersoadverse([gorosei, 14])}>
                            gorosei
                        </button>
                        <button onClick={() => setChoixpersoadverse([kid, 15])}>
                            kid
                        </button>
                        <button onClick={() => setChoixpersoadverse([marco, 16])}>
                            marco
                        </button>
                        <button onClick={() => setChoixpersoadverse([oden, 17])}>
                            oden
                        </button>
                        <button onClick={() => setChoixpersoadverse([sanji, 18])}>
                            sanji
                        </button>
                        <button onClick={() => setChoixpersoadverse([usopp, 19])}>
                            usopp
                        </button>
                        <button onClick={() => setChoixpersoadverse([vergo, 20])}>
                            vergo
                        </button>
                        <button onClick={() => setChoixpersoadverse([yamato, 21])}>
                            yamato
                        </button>
                        <button onClick={() => setChoixpersoadverse([ym, 22])}>
                            ym
                        </button>
                    </div>
                </div>
                <button id = "start" onClick={() => (choixperso != [Logo,0] && choixpersoadverse != [Logo,0]? (setCombatStarted(1)) + (vie()) :(setCombatStarted(0)))}><h2>New Fight</h2></button>


            </div>
            </>
            ) : null}    
        
       </>
    );
}

export default Attaque;

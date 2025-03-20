import './globals.css';
import React, { useState } from 'react';
import { Modal, Button, Container, Card } from 'react-bootstrap';

const GameContainer = () => {
    const [showModal, setShowModal] = useState(false);
    const [currentGame, setCurrentGame] = useState(null);
    const [currentStep, setCurrentStep] = useState('A');
    const [gameHistory, setGameHistory] = useState([]);
  
    const textAdventureGame = {
      id: 'doctor-appointment',
      title: 'En retard au rendez-vous',
      initialStep: 'A',
      steps: {
        'A': {
          text: "Tu es perdu, et ne dois pas être en retard pour ton RDV chez ton nouveau médecin traitant. Ton téléphone n'a plus de batterie, tu ne peut donc pas utiliser de GPS",
          choices: [
            { text: "Je demande de l'aide à un inconnu", next: 'B' },
            { text: "Je continue de chercher", next: 'MORT' }
          ]
        },
        'B': {
          text: "Vous décidez de demander de l'aide à un passant. Comment souhaitez-vous l'aborder ?",
          choices: [
            { text: "\"Hé toi, où est le Docteur Hibert ?\"", next: 'D' },
            { text: "\"Bonjour, je cherche à me rendre à cette adresse, pouvez-vous m'aider s'il vous plaît ?\"", next: 'C' }
          ]
        },
        'C': {
          text: "Le passant vous indique le chemin. Que faites-vous ensuite ?",
          choices: [
            { text: "\"Et comment puis-je être sûr que vous ne me mentez pas ? J'ai vraiment besoin d'être à l'heure.\"", next: 'E' },
            { text: "\"Merci beaucoup pour votre aide, bonne journée\"", next: 'BONNE_FIN' }
          ]
        },
        'D': {
          text: "\"Nan mais comment tu me parles toi ? Dégage !\"",
          choices: [
            { text: "Le frapper", next: 'MORT_POLICE' },
            { text: "\"Pardon, je suis stressé à cause du retard, désolé pour mon comportement. Je souhaite simplement me rendre à cette adresse, pouvez-vous m'aider s'il vous plaît ?\"", next: 'C' }
          ]
        },
        'E': {
          text: "\"Hé, moi aussi je suis pressé, débrouille toi tout seul.\"",
          choices: [
            { text: "Je demande à quelqu'un d'autre jusqu'à trouver quelqu'un de confiance", next: 'MORT' },
            { text: "Tu fais quand-même confiance à la personne", next: 'FIN_MOYENNE' }
          ]
        },
        'MORT': {
          text: "Vous continuez à chercher seul et vous perdez complètement. Vous ratez votre rendez-vous et devrez attendre des semaines pour un nouveau créneau. GAME OVER.",
          choices: [
            { text: "Recommencer", next: 'A' }
          ]
        },
        'MORT_POLICE': {
          text: "Vous êtes arrêté par la police pour agression. Vous ratez votre rendez-vous et aurez d'autres problèmes à gérer. GAME OVER.",
          choices: [
            { text: "Recommencer", next: 'A' }
          ]
        },
        'BONNE_FIN': {
          text: "Grâce à votre politesse et aux indications du passant, vous arrivez à temps à votre rendez-vous. Le médecin vous reçoit avec un sourire. FÉLICITATIONS !",
          choices: [
            { text: "Recommencer", next: 'A' },
            { text: "Quitter le jeu", next: 'QUIT' }
          ]
        },
        'FIN_MOYENNE': {
          text: "Vous suivez les indications malgré vos doutes. Heureusement, le passant vous a bien indiqué le chemin - il n'avait aucune raison de vous mentir. Vous arrivez juste à temps pour votre rendez-vous, mais un peu stressé.",
          choices: [
            { text: "Recommencer", next: 'A' },
            { text: "Quitter le jeu", next: 'QUIT' }
          ]
        }
      }
    };

    const autisticTeenGame = {
      id: 'autistic-teen',
      title: 'Maxime à l\'école',
      initialStep: 'A',
      steps: {
        'A': {
          text: "Maxime, un adolescent autiste, est en pause entre deux cours. Il préfère rester seul et éviter les interactions inutiles. Lucas, un élève qui l'a déjà embêté par le passé, s'approche de lui avec un sourire moqueur.",
          choices: [
            { text: "L'ignorer et partir", next: 'B' },
            { text: "Essayer de l'affronter directement", next: 'MORT' }
          ]
        },
        'B': {
          text: "Lucas vous suit et dit :",
          choices: [
            { text: "\"Hé toi, toujours en train d'éviter les gens ?\"", next: 'D' },
            { text: "\"Salut Lucas, tu veux quelque chose ?\"", next: 'C' }
          ]
        },
        'C': {
          text: "Tu montres que tu n'as pas peur. Que fais-tu ensuite ?",
          choices: [
            { text: "\"Pourquoi tu viens toujours me parler ? Tu cherches quoi ?\"", next: 'E' },
            { text: "\"D'accord, on peut parler, mais j'ai autre chose à faire.\"", next: 'BONNE_FIN' }
          ]
        },
        'D': {
          text: "Lucas continue à te provoquer. Comment réagis-tu ?",
          choices: [
            { text: "\"T'as un problème ?!\"", next: 'FIN_NEGATIVE' },
            { text: "\"Désolé, je préfère être tranquille, passe une bonne journée.\"", next: 'BONNE_FIN_2' }
          ]
        },
        'E': {
          text: "Lucas : \"Haha, relax, t'es vraiment chelou, toi.\"",
          choices: [
            { text: "Continuer à éviter Lucas mais finir par exploser", next: 'MORT_2' },
            { text: "Rester calme et rationnel", next: 'FIN_MOYENNE' }
          ]
        },
        'MORT': {
          text: "Lucas devient plus agressif, la situation dégénère et un surveillant intervient trop tard. La confrontation directe a empiré la situation et les conséquences sont importantes.",
          choices: [
            { text: "Recommencer", next: 'A' }
          ]
        },
        'MORT_2': {
          text: "À force d'éviter le problème, Maxime accumule du stress, s'isole davantage et son anxiété grandit. Un jour, il explose et la situation devient ingérable. GAME OVER.",
          choices: [
            { text: "Recommencer", next: 'A' }
          ]
        },
        'FIN_NEGATIVE': {
          text: "Maxime s'énerve, pousse Lucas, et un surveillant intervient. Les deux élèves sont sanctionnés et la tension ne fait qu'augmenter. Maxime se retrouve dans une situation encore plus difficile.",
          choices: [
            { text: "Recommencer", next: 'A' },
            { text: "Quitter le jeu", next: 'QUIT' }
          ]
        },
        'BONNE_FIN': {
          text: "Lucas voit que Maxime ne réagit pas à la provocation et se désintéresse. Il cherchait une réaction émotionnelle et, ne l'obtenant pas, il finit par partir. Maxime peut continuer sa journée tranquillement.",
          choices: [
            { text: "Recommencer", next: 'A' },
            { text: "Quitter le jeu", next: 'QUIT' }
          ]
        },
        'BONNE_FIN_2': {
          text: "Lucas est déstabilisé par la réponse calme et mature de Maxime. Il ne s'attendait pas à cette réaction et, après un moment d'hésitation, il part. Maxime a réussi à désamorcer la situation sans conflit.",
          choices: [
            { text: "Recommencer", next: 'A' },
            { text: "Quitter le jeu", next: 'QUIT' }
          ]
        },
        'FIN_MOYENNE': {
          text: "Maxime reste calme et rationnel, il sait que Lucas ne cherche qu'une réaction. Lucas continue à provoquer parfois, mais l'impact sur Maxime diminue avec le temps. Maxime apprend progressivement à gérer ces situations difficiles.",
          choices: [
            { text: "Recommencer", next: 'A' },
            { text: "Quitter le jeu", next: 'QUIT' }
          ]
        }
      }
    };

    // Liste des jeux
    const availableGames = [
      {
        id: 'doctor-appointment',
        title: 'En retard au rendez-vous',
        description: 'Ne soyez pas en retard pour votre rendez-vous médical !',
        thumbnailUrl: 'https://via.placeholder.com/150',
        gameData: textAdventureGame
      },
      {
        id: 'autistic-teen',
        title: 'Maxime à l\'école',
        description: 'Aidez Maxime à gérer une situation difficile à l\'école',
        thumbnailUrl: 'https://via.placeholder.com/150',
        gameData: autisticTeenGame
      }
      // Autres jeux
    ];

    const handleGameSelect = (game) => {
      setCurrentGame(game);
      setCurrentStep(game.gameData.initialStep);
      setGameHistory([]);
      setShowModal(true);
    };
  
    const handleChoice = (choice) => {
      setGameHistory([...gameHistory, { step: currentStep, choice }]);

      if (choice.next === 'QUIT') {
        setShowModal(false);
        setCurrentGame(null);
        return;
      }

      setCurrentStep(choice.next);
    };
  
    return (
      <Container className="my-4">
        <h2 className="mb-4">Bibliothèque de Jeux</h2>

        <div className="d-flex flex-wrap">
          {availableGames.map(game => (
            <Card key={game.id} style={{ width: '18rem' }} className="m-2">
              <Card.Img variant="top" src={game.thumbnailUrl} />
              <Card.Body>
                <Card.Title>{game.title}</Card.Title>
                <Card.Text>{game.description}</Card.Text>
                <Button variant="primary" onClick={() => handleGameSelect(game)}>
                  Jouer
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>

        {currentGame && (
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            size="lg"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>{currentGame.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="game-container">
                <p className="game-text mb-4">
                  {currentGame.gameData.steps[currentStep].text}
                </p>

                <div className="game-choices">
                  {currentGame.gameData.steps[currentStep].choices.map((choice, index) => (
                    <Button
                      key={index}
                      variant="outline-primary"
                      className="mb-2 d-block w-100 text-left"
                      onClick={() => handleChoice(choice)}
                    >
                      {choice.text}
                    </Button>
                  ))}
                </div>

                {gameHistory.length > 0 && (
                  <div className="game-history mt-4">
                    <h5>Historique des choix</h5>
                    <ul>
                      {gameHistory.map((item, index) => (
                        <li key={index}>
                          {item.choice.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Fermer
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    );
};
  
export default GameContainer;

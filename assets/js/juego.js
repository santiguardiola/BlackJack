//FORMA DE PROTEGER EL CODIGO 
// patrón módulo, crear la funcion y autoinvocarla en el momento
//crear función anónima, autoinvocada 
/* (()=> {
            // funcion anonima autoinvocada de flecha, no tiene una referencia por nombre
})(); */   // no se puede llamar al objeto directamente
(function() {

   'use strict'

    //se inicializa con let porque eventualmente se va a borrar el arreglos o modificar
    // sino se usa const
    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];
    let puntosJugador  = 0,
        puntosComputadora = 0;
    //Referencias del HTML
    const btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo   = document.querySelector('#btnNuevo');

    const smallJugador     = document.querySelector('#puntosJugador'),
          smallComputadora = document.querySelector('#puntosComputadora');

    const divCartaJugador = document.querySelector('#jugador-carta'),
          divCartaCasino  = document.querySelector('#casino-carta');

    // Esta funcion crea un nuevo deck
    const crearDeck = () => {
         
        deck = [];     

        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);

            }
        }

        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);

            }

        }

        //console.log(deck);

        deck = _.shuffle(deck);
        return deck;
    }

    crearDeck();

    // Esta función me permite pedir una carta

    const pedirCarta = () => {

        if (deck.length === 0) {
            // throw muestra erro en consola y no deja ejecutar otros codigos
            throw 'No hay cartas en el deck'
        }
        const carta = deck.pop();

        return carta;
    }

    //pedirCarta();

    //para saber el valor de la carta extraida del deck
    //pongo como argumento la carta extraida anteriormente
    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1);
        return ( isNaN( valor) ) ?
                ( valor === 'A') ? 11 : 10
                : valor * 1;
        
               /* let puntos = 0;
         //isNan evalua si lo que hay es un numero o no

        if (isNaN(valor)) {
            if (valor === 'A') {
                puntos = 11
            } else {
                puntos = 10
            };
        } else {
            console.log('Es un numero');
            //al multiplicar por 1, se retorna el string como numero
            puntos = valor * 1;
        }

        console.log(puntos ); */
    }

    //Turno computadora
    //cuando el jugador pierde o toca el boton "detener"

    const turnoComputadora = (puntosMinimos) => {

        do {
            
            const carta = pedirCarta();

            puntosComputadora = puntosComputadora + valorCarta(carta);
            smallComputadora.innerText = puntosComputadora;
            
        
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${ carta }.png`;
        
            imgCarta.classList.add('carta')
        
            divCartaCasino.append(imgCarta);  
            
            if(puntosJugador > 21){
                break; //para salir del ciclo en caso de que el jugador supere los 21
            }

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        //funcion de JS para que ejecute lo de abajo despues de cierto tiempo
        //ejecuta el callback

        setTimeout(() => { 
        
        if (puntosComputadora === puntosMinimos ) {
            alert('Nadie gana');
        } else if (puntosMinimos > 21) {
            alert('Lo siento, perdiste.');
        } else if ( puntosComputadora > 21 ){
            alert('Ganaste');
        } else {
            alert('Computadora gana');
        }

        }, 500);

    }




    //Eventos
    //2 argumentos, 1ro, evento que yo quiero escuchar
    //funcion que se coloca como argunmento a otra funcion = 'callBack'

    btnPedir.addEventListener('click', function(){
       //cuando se haga click sobre ese boton, se ejecuta lo que pase
       //dentro de la funcion 'function()'
    
       const carta = pedirCarta();

       puntosJugador = puntosJugador + valorCarta(carta);
       smallJugador.innerText = puntosJugador;

      //<img class="carta" src="assets/cartas/3H.png" ></img>
      //creamos el elemento, pero hay que agregarle clases

      //pongo `` para poder insertar un bloque de codigo de js
      const imgCarta = document.createElement('img');
      imgCarta.src = `assets/cartas/${ carta }.png`;
      //.classList.add es de CSS
      imgCarta.classList.add('carta')
      //agrega la carta como un div
      divCartaJugador.append(imgCarta);

      //condición para controlar puntos

      if (puntosJugador > 21) {
        console.warn('Alpiste perdiste')
        //Una vez que pierde, se bloquea el boton btnPedir
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);

      } else if (puntosJugador === 21){
        console.warn('21, ganaste');
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
      }


    })


    btnDetener.addEventListener('click', function(){
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    });
    

    btnNuevo.addEventListener('click', function(){
        
      location.reload(true);
       alert('Nuevo juego');
    })

})();




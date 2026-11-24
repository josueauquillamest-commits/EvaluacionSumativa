import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const videojuegos = [
  { pregunta: 'Cuantos Far Cry hay?',
    opciones: ['6', '5', '7', '2'], correcta: 0 },
  { pregunta: '¿Cual era el apodo del creador de Minecraft?',
    opciones: ['Notch', 'Monjang', 'Creador'], correcta:0 },
  { pregunta: '¿En que juego buscas un token para conseguir la tienda gratis?',
    opciones: ['Fortnite', 'Free Fire', 'Minecraft', 'Among Us'], correcta: 0 },
  { pregunta: '¿En que juego puedes tener un duo Dinamico?',
    opciones: ['Call of Duty', 'Fornite', 'Free Fire', 'CSGO'], correcta: 2 },
  { pregunta: '¿Que significa la simbologia del Baston de Wukong en Black mind wukong?',
    opciones: ['Dominio de mente', 'Adaptailidad', 'Combate', 'Amor y Paz'], correcta: 0 },
];

const anime = [
  { pregunta: '¿Cual es el protagonista de Sword Art Online?',
    opciones: ['Kirito', 'Goku', 'Kaguya', 'Shirogane'], correcta: 0 },
  { pregunta: '¿Cuantas temporadas tiene Atack on Titan?',
    opciones: ['5', '3', '2', '4'], correcta: 3 },
  { pregunta: '¿Como se llama el anime donde obligan a casarse a dos estudiantes?',
    opciones: ['A Couple of Cuckoos', 'Love is war', 'Quintillizas', 'Tonikawa'], correcta: 0 },
  { pregunta: '¿De que color tenia el pelo la protagonista de Tonikawa?',
    opciones: ['Morado', 'Negro', 'Rosado', 'Cafe'], correcta: 2 },
  { pregunta: '¿Cuantas esposas tiene el Protagonista de mushuko Tensei Rudeos?',
    opciones: ['3', '4', '2', '1'], correcta: 0 },
];

export default function App() {
  const [pantalla, setPantalla] = useState(1);      // pantalla visible (1 a 5)
  const [tema, setTema] = useState(null);           // 'videojuegos' o 'anime'
  const [indice, setIndice] = useState(0);          // pregunta actual (0 a 4)
  const [seleccion, setSeleccion] = useState(null); // opción tocada (null = sin responder)
  const [correctas, setCorrectas] = useState(0);    // aciertos = puntaje
  const [incorrectas, setIncorrectas] = useState(0);

  // Elegimos el arreglo de preguntas según el tema (condicional)
  let preguntas = [];
  if (tema === 'videojuegos') {
    preguntas = videojuegos;
  } else if (tema === 'anime') {
    preguntas = anime;
  }
  const actual = preguntas[indice]; // pregunta que se muestra

  function elegirTema(t) {
    setTema(t);
    setIndice(0);
    setSeleccion(null);
    setCorrectas(0);
    setIncorrectas(0);
    if (t === 'videojuegos') {
      setPantalla(3);
    } else {
      setPantalla(4);
    }
  }

  function responder(i) {
    setSeleccion(i); // guardamos qué opción tocó
    if (i === actual.correcta) {
      setCorrectas(correctas + 1);
    } else {
      setIncorrectas(incorrectas + 1);
    }
  }

  function siguiente() {
    if (indice < preguntas.length - 1) {
      setIndice(indice + 1);
      setSeleccion(null);
    } else {
      setPantalla(5);
    }
  }

  function volverAJugar() {
    setTema(null);
    setIndice(0);
    setSeleccion(null);
    setCorrectas(0);
    setIncorrectas(0);
    setPantalla(2);
  }

  if (pantalla === 1) {
    return (
      <View style={styles.contenedor}>
        <Text style={styles.logo}>🎮</Text>
        <Text style={styles.titulo}>QuizZone</Text>
        <Text style={styles.subtitulo}>¡Demuestra cuánto sabes!</Text>
        <Button title="Comenzar" onPress={() => setPantalla(2)} />
      </View>
    );
  }

  if (pantalla === 2) {
    return (
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Selecciona un tema</Text>
        <View style={styles.espacio}>
          <Button title="🎮 Videojuegos" onPress={() => elegirTema('videojuegos')} />
        </View>
        <View style={styles.espacio}>
          <Button title="🌸 Anime" onPress={() => elegirTema('anime')} />
        </View>
        <View style={styles.espacio}>
          <Button title="Atrás" color="#7a869a" onPress={() => setPantalla(1)} />
        </View>
      </View>
    );
  }

  if (pantalla === 3 || pantalla === 4) {
    let mensaje = '';
    if (seleccion !== null) {
      if (seleccion === actual.correcta) {
        mensaje = '¡Correcto! 🎉';
      } else {
        mensaje = 'Incorrecto. La respuesta era: ' + actual.opciones[actual.correcta];
      }
    }

    return (
      <View style={styles.contenedor}>
        <Text style={styles.tema}>
          {tema === 'videojuegos' ? '🎮 Videojuegos' : '🌸 Anime'}
        </Text>
        <Text style={styles.contador}>
          Pregunta {indice + 1} de {preguntas.length} · Puntaje: {correctas}
        </Text>

        <View style={styles.tarjeta}>
          <Text style={styles.pregunta}>{actual.pregunta}</Text>
        </View>

        <View style={styles.espacio}>
          <Button title={'A. ' + actual.opciones[0]}
            onPress={() => responder(0)} disabled={seleccion !== null} />
        </View>
        <View style={styles.espacio}>
          <Button title={'B. ' + actual.opciones[1]}
            onPress={() => responder(1)} disabled={seleccion !== null} />
        </View>
        <View style={styles.espacio}>
          <Button title={'C. ' + actual.opciones[2]}
            onPress={() => responder(2)} disabled={seleccion !== null} />
        </View>
        <View style={styles.espacio}>
          <Button title={'D. ' + actual.opciones[3]}
            onPress={() => responder(3)} disabled={seleccion !== null} />
        </View>

        {seleccion !== null && (
          <View>
            <Text style={seleccion === actual.correcta ? styles.bien : styles.mal}>
              {mensaje}
            </Text>
            <Button
              title={indice < preguntas.length - 1 ? 'Siguiente' : 'Ver resultados'}
              color="#239455"
              onPress={siguiente}
            />
          </View>
        )}
      </View>
    );
  }

  let mensajeFinal = '';
  if (correctas >= 4) {
    mensajeFinal = '¡Excelente! Tienes grandes conocimientos 🏆';
  } else if (correctas >= 3) {
    mensajeFinal = '¡Muy bien! Casi lo logras 👏';
  } else {
    mensajeFinal = '¡Sigue practicando! 💪';
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.logo}>🏆</Text>
      <Text style={styles.titulo}>¡Juego terminado!</Text>

      <View style={styles.tarjeta}>
        <Text style={styles.etiqueta}>Tu puntaje</Text>
        <Text style={styles.puntaje}>{correctas} / {preguntas.length}</Text>
      </View>

      <View style={styles.fila}>
        <View style={styles.mini}>
          <Text style={styles.etiqueta}>Correctas</Text>
          <Text style={styles.miniValor}>{correctas}</Text>
        </View>
        <View style={styles.mini}>
          <Text style={styles.etiqueta}>Incorrectas</Text>
          <Text style={styles.miniValor}>{incorrectas}</Text>
        </View>
      </View>

      <Text style={styles.final}>{mensajeFinal}</Text>
      <Button title="Volver a jugar" onPress={volverAJugar} />
    </View>
  );
} // <--- Aquí cierra la función App()

const styles = StyleSheet.create({
  contenedor: { flex: 1, justifyContent: 'center', padding: 25, backgroundColor: '#eef4ff' },
  logo: { fontSize: 64, textAlign: 'center' },
  titulo: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#173b83', marginBottom: 10 },
  subtitulo: { fontSize: 16, textAlign: 'center', color: '#596579', marginBottom: 25 },
  espacio: { marginBottom: 12 },
  tema: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#2457c5' },
  contador: { fontSize: 14, textAlign: 'center', color: '#596579', marginVertical: 8 },
  tarjeta: { backgroundColor: '#ffffff', padding: 18, borderRadius: 12, marginBottom: 16 },
  pregunta: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#202b3c' },
  bien: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#239455', marginVertical: 10 },
  mal: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#c33c3c', marginVertical: 10 },
  etiqueta: { fontSize: 14, textAlign: 'center', color: '#596579' },
  puntaje: { fontSize: 42, fontWeight: 'bold', textAlign: 'center', color: '#2457c5' },
  fila: { flexDirection: 'row', justifyContent: 'space-between' },
  mini: { width: '48%', backgroundColor: '#ffffff', padding: 14, borderRadius: 12 },
  miniValor: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#202b3c' },
  final: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginVertical: 18 },
});



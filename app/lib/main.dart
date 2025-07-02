import 'package:flutter/material.dart';
import 'package:salaapp/screens/login_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sala do Mestres',
      theme: ThemeData(
        primarySwatch: Colors.amber, // Cor primária dourada
        visualDensity: VisualDensity.adaptivePlatformDensity,
        brightness: Brightness.dark, // Tema escuro
        scaffoldBackgroundColor: Colors.black, // Fundo padrão preto
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.black, // AppBar preta
          foregroundColor: Colors.amber, // Ícones e texto da AppBar dourados
        ),
        inputDecorationTheme: InputDecorationTheme(
          labelStyle: const TextStyle(color: Colors.amber), // Labels douradas
          hintStyle: const TextStyle(color: Colors.white70), // Hints brancos
          enabledBorder: OutlineInputBorder(
            borderSide: const BorderSide(color: Colors.amber, width: 1.0),
            borderRadius: BorderRadius.circular(8.0),
          ),
          focusedBorder: OutlineInputBorder(
            borderSide: const BorderSide(color: Colors.amberAccent, width: 2.0),
            borderRadius: BorderRadius.circular(8.0),
          ),
          errorBorder: OutlineInputBorder(
            borderSide: const BorderSide(color: Colors.red, width: 1.0),
            borderRadius: BorderRadius.circular(8.0),
          ),
          focusedErrorBorder: OutlineInputBorder(
            borderSide: const BorderSide(color: Colors.redAccent, width: 2.0),
            borderRadius: BorderRadius.circular(8.0),
          ),
          fillColor: Colors.grey[900],
          filled: true,
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.amber, // Botões elevados dourados
            foregroundColor: Colors.black, // Texto dos botões elevados preto
            padding: const EdgeInsets.symmetric(vertical: 16.0),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8.0),
            ),
            textStyle: const TextStyle(
              fontSize: 18.0,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        textButtonTheme: TextButtonThemeData(
          style: TextButton.styleFrom(
            foregroundColor: Colors.amber, // Botões de texto dourados
          ),
        ),
      ),
      home: const LoginScreen(),
    );
  }
}
import 'package:flutter/material.dart';
import 'package:salaapp/screens/main_app_screen.dart';
import 'package:salaapp/services/api_service.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final ApiService _apiService = ApiService();
  String? _errorMessage;

  Future<void> _login() async {
    setState(() {
      _errorMessage = null; // Limpa mensagens de erro anteriores
    });

    try {
      final String email = _emailController.text;
      final String password = _passwordController.text;

      await _apiService.login(email, password);

      // Se o login for bem-sucedido, navega para a tela principal
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => const MainAppScreen()),
      );
    } catch (e) {
      setState(() {
        _errorMessage = e.toString();
        // Remove "Exception: " da mensagem de erro
        if (_errorMessage!.startsWith('Exception: ')) {
          _errorMessage = _errorMessage!.substring('Exception: '.length);
        }
      });
    }
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black, // Fundo preto sólido
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              // Logo
              Image.asset(
                'assets/logo.png', // Substituir pelo caminho real do logo
                height: 150,
              ),
              const SizedBox(height: 48.0),

              // Campo de Usuário (Email)
              TextField(
                controller: _emailController,
                keyboardType: TextInputType.emailAddress,
                decoration: InputDecoration(
                  hintText: 'Seu email',
                  hintStyle: const TextStyle(color: Colors.white70),
                  filled: true,
                  fillColor: Colors.grey[900], // Fundo escuro para o campo
                  enabledBorder: OutlineInputBorder(
                    borderSide: const BorderSide(color: Colors.amber, width: 1.0), // Borda dourada
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderSide: const BorderSide(color: Colors.amberAccent, width: 2.0), // Borda dourada mais forte ao focar
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                  prefixIcon: const Icon(Icons.email, color: Colors.amber), // Ícone dourado
                ),
                style: const TextStyle(color: Colors.white), // Texto digitado em branco
              ),
              const SizedBox(height: 16.0),

              // Campo de Senha
              TextField(
                controller: _passwordController,
                obscureText: true,
                decoration: InputDecoration(
                  hintText: 'Sua senha',
                  hintStyle: const TextStyle(color: Colors.white70),
                  filled: true,
                  fillColor: Colors.grey[900], // Fundo escuro para o campo
                  enabledBorder: OutlineInputBorder(
                    borderSide: const BorderSide(color: Colors.amber, width: 1.0), // Borda dourada
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderSide: const BorderSide(color: Colors.amberAccent, width: 2.0), // Borda dourada mais forte ao focar
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                  prefixIcon: const Icon(Icons.lock, color: Colors.amber), // Ícone dourado
                ),
                style: const TextStyle(color: Colors.white), // Texto digitado em branco
              ),
              const SizedBox(height: 24.0),

              // Mensagem de Erro
              if (_errorMessage != null)
                Padding(
                  padding: const EdgeInsets.only(bottom: 16.0),
                  child: Text(
                    _errorMessage!,
                    style: const TextStyle(color: Colors.red, fontSize: 16.0),
                    textAlign: TextAlign.center,
                  ),
                ),

              // Botão Entrar
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: _login,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.amber, // Botão sólido em dourado
                    padding: const EdgeInsets.symmetric(vertical: 16.0),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8.0),
                    ),
                  ),
                  child: const Text(
                    'Entrar',
                    style: TextStyle(
                      color: Colors.black, // Texto em preto
                      fontSize: 18.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
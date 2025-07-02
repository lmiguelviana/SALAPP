import 'package:flutter/material.dart';
import 'package:salaapp/models/user.dart';
import 'package:salaapp/services/api_service.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:salaapp/screens/login_screen.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final ApiService _apiService = ApiService();
  User? _userProfile;
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _fetchUserProfile();
  }

  Future<void> _fetchUserProfile() async {
    try {
      final user = await _apiService.fetchUserProfile();
      setState(() {
        _userProfile = user;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  Future<void> _logout() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.remove('jwt_token');
    // Navegar de volta para a tela de login
    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(builder: (context) => LoginScreen()), // Assumindo que LoginScreen é a tela de login
      (Route<dynamic> route) => false,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Meu Perfil', style: TextStyle(color: Colors.amber)),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.logout, color: Colors.amber),
            onPressed: _logout,
          ),
        ],
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator(color: Colors.amber))
          : _error != null
              ? Center(child: Text('Erro: $_error', style: const TextStyle(color: Colors.red)))
              : SingleChildScrollView(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: <Widget>[
                      // Foto de Perfil
                      Center(
                        child: Container(
                          width: 120,
                          height: 120,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            border: Border.all(color: Colors.amber, width: 3.0), // Borda dourada
                            image: DecorationImage(
                              image: NetworkImage(_userProfile?.profilePictureUrl ?? 'https://via.placeholder.com/150/000000/FFFFFF?text=User'), // Imagem real ou placeholder
                              fit: BoxFit.cover,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 16.0),

                      // Nome do Usuário
                      Text(
                        _userProfile?.fullName ?? _userProfile?.username ?? 'Usuário',
                        style: Theme.of(context).textTheme.headlineMedium?.copyWith(color: Colors.white, fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 8.0),

                      // Informações Básicas
                      Text(
                        'Email: ${_userProfile?.email ?? 'N/A'}',
                        style: Theme.of(context).textTheme.bodyLarge?.copyWith(color: Colors.white70),
                      ),
                      Text(
                        'Membro desde: ${_userProfile?.createdAt ?? 'N/A'}',
                        style: Theme.of(context).textTheme.bodyLarge?.copyWith(color: Colors.white70),
                      ),
                      // Adicionar mais informações do usuário conforme o modelo User
                      const SizedBox(height: 32.0),

                      // Grid/Lista de Posts (Placeholder por enquanto, será integrado depois)
                      Align(
                        alignment: Alignment.centerLeft,
                        child: Text(
                          'Meus Posts',
                          style: Theme.of(context).textTheme.headlineSmall?.copyWith(color: Colors.amber, fontWeight: FontWeight.bold),
                        ),
                      ),
                      const SizedBox(height: 16.0),
                      GridView.builder(
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(), // Desabilita o scroll interno
                        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 3, // 3 colunas
                          crossAxisSpacing: 8.0,
                          mainAxisSpacing: 8.0,
                        ),
                        itemCount: 9, // Exemplo de 9 posts
                        itemBuilder: (context, index) {
                          return Container(
                            decoration: BoxDecoration(
                              color: Colors.grey[800],
                              borderRadius: BorderRadius.circular(8.0),
                              image: DecorationImage(
                                image: NetworkImage('https://via.placeholder.com/150/000000/FFFFFF?text=Post${index + 1}'), // Imagem placeholder
                                fit: BoxFit.cover,
                              ),
                            ),
                          );
                        },
                      ),
                    ],
                  ),
                ),
    );
  }
}